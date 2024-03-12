const db = require("../../helper/connection");

const projectModel = {
  findAll: () => {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM project", (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result.rows);
        }
      });
    });
  },
  add: function (body) {
    const { name } = body;
    return new Promise((resolve, reject) => {
      db.query(
        `INSERT INTO project ( name)
            VALUES ('${name}')`,
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
};

module.exports = projectModel;
