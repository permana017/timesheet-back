const db = require("../../helper/connection");

const userModel = {
  findAll: () => {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM users", (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result.rows);
        }
      });
    });
  },
  add: function (body) {
    const { name, title, rate, created_at, address } = body;
    return new Promise((resolve, reject) => {
      db.query(
        `INSERT INTO users ( name, rate,title, created_at, address) 
          VALUES ('${name}','${rate}','${title}','${created_at}','${address}')`,
        (err, result) => {
          if (err) {
            return reject(err.message);
          } else {
            return resolve(body);
          }
        }
      );
    });
  },
  update: function (body, id) {
    return new Promise((resolve, reject) => {
      const { name, rate, title, address } = body;
      return db.query(`SELECT * FROM users WHERE id='${id}'`, (err, result) => {
        if (err) {
          return reject(err.message);
        }
        if (!result.rows.length) {
          return reject("id users not found");
        } else {
          db.query(
            `UPDATE users SET name='${name || result.rows[0].name}', rate='${
              rate || result.rows[0].rate
            }',title='${title || result.rows[0].title}', address='${
              address || result.rows[0].address
            }'WHERE id = ${id}`,
            (err) => {
              if (err) {
                return reject(err.message);
              } else {
                return resolve({
                  user_id: id,
                  name: name ?? result.rows[0].name,
                  rate: rate ?? result.rows[0].rate,
                  title: title ?? result.rows[0].title,
                  address: address ?? result.rows[0].address,
                });
              }
            }
          );
        }
      });
    });
  },
  remove: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`DELETE from users WHERE id='${id}'`, (err, result) => {
        if (err) {
          return reject(err.message);
        } else {
          return resolve("success delete");
        }
      });
    });
  },
};

module.exports = userModel;
