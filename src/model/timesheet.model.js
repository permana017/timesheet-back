const db = require("../../helper/connection");
const dayjs = require("dayjs");

const timesheetModel = {
  findAll: (userId) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT users.id as user_id, users.name as user_name, users.rate as user_rate, SUM(timesheet.duration) as total_duration,
        COALESCE(
          (
            SELECT jsonb_agg(jsonb_build_object('id', timesheet.id, 'start_date', timesheet.start_date, 'end_date', timesheet.end_date, 'time_start', timesheet.time_start, 'time_end', timesheet.time_end, 'title', timesheet.title, 'project_name', timesheet.project_name, 'user_id', timesheet.user_id, 'duration', timesheet.duration))
            FROM timesheet
            WHERE timesheet.user_id = users.id
          ), '[]'::jsonb
        ) as timesheet
        FROM
          users
        LEFT JOIN
          timesheet ON users.id = timesheet.user_id
        ${userId ? "WHERE users.id =" + userId : ""}
        GROUP BY
        users.id, users.name`,
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result.rows);
          }
        }
      );
    });
  },
  findById: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM timesheet WHERE id = ${id}`, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result.rows);
        }
      });
    });
  },
  add: ({
    start_date,
    end_date,
    time_start,
    time_end,
    title,
    project_name,
    user_id,
  }) => {
    // dayjs.extend(relativeTime);
    const duration = dayjs(`${end_date} ${time_end}`).diff(
      `${start_date} ${time_start}`
    );
    console.log("duration", duration);
    console.log("duration", start_date);
    console.log("duration", end_date);
    console.log("duration", time_start);
    console.log("duration", time_end);
    return new Promise((resolve, reject) => {
      db.query(
        `INSERT INTO timesheet ( start_date, end_date,time_start, time_end, title, project_name, user_id, duration)
        VALUES ('${start_date}','${end_date}','${time_start}','${time_end}','${title}', '${project_name}', '${user_id}', '${duration}')`,
        (err, result) => {
          if (err) {
            return reject(err.message);
          } else {
            return resolve({
              start_date,
              end_date,
              time_start,
              time_end,
              title,
              project_name,
              user_id,
            });
          }
        }
      );
    });
  },
  update: function (body, id) {
    console.log(id);
    console.log(body);
    return new Promise((resolve, reject) => {
      const {
        start_date,
        end_date,
        time_start,
        time_end,
        title,
        project_name,
        user_id,
      } = body;
      return db.query(
        `SELECT * FROM timesheet WHERE id='${id}'`,
        (err, result) => {
          if (err) {
            return reject(err.message);
          }
          if (!result.rows.length) {
            return reject("id timesheet not found");
          } else {
            db.query(
              `UPDATE timesheet SET start_date='${
                start_date || result.rows[0].start_date
              }', end_date='${
                end_date || result.rows[0].end_date
              }',time_start='${
                time_start || result.rows[0].time_start
              }', time_end='${time_end || result.rows[0].time_end}', title='${
                title || result.rows[0].title
              }', project_name='${
                project_name || result.rows[0].project_name
              }' WHERE id = ${id}`,
              (err) => {
                if (err) {
                  return reject(err.message);
                } else {
                  return resolve(result.rows);
                }
              }
            );
          }
        }
      );
    });
  },
  remove: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`DELETE from timesheet WHERE id='${id}'`, (err, result) => {
        if (err) {
          return reject(err.message);
        } else {
          return resolve("success delete");
        }
      });
    });
  },
};

module.exports = timesheetModel;
