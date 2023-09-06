const db = require("../../helper/connection");
const { v4: uuidv4 } = require("uuid");

const todoModel = {
  get: function () {
    return new Promise((resolve, reject) => {
      db.query(`SELECT id, notes FROM todo`, (err, result) => {
        if (err) {
          return reject(err.message);
        } else {
          return resolve(result.rows);
        }
      });
    });
  },

  getId: function (id) {
    return new Promise((resolve, reject) => {
      db.query(`SELECT id, notes FROM todo WHERE id='${id}'`, (err, result) => {
        if (err) {
          return reject(err.message);
        } else {
          return resolve(result.rows);
        }
      });
    });
  },

  add: ({ notes }) => {
    // console.log(notes);
    return new Promise((resolve, reject) => {
      db.query(
        `INSERT INTO todo (id, notes) VALUES ('${uuidv4()}','${notes}')`,
        (err, result) => {
          if (err) {
            return reject(err.message);
          } else {
            return resolve({ notes });
          }
        }
      );
    });
  },

  update: function (req, id) {
    return new Promise((success, failed) => {
      const { notes } = req.body;
      db.query(`SELECT * FROM todo WHERE id='${id}'`, (error, result) => {
        if (error) {
          return failed(error.message);
        } else {
          // console.log(result);
          if (result.rows.length < 1) {
            return failed("Id not found!");
          } else {
            db.query(
              `UPDATE todo SET notes='${
                notes || result.rows[0].notes
              }' WHERE id='${id}'`,
              (error) => {
                if (error) {
                  return failed(error.message);
                } else {
                  return success(result.rows);
                }
              }
            );
          }
        }
      });
    });
  },

  remove: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`DELETE from todo WHERE id='${id}'`, (err, result) => {
        if (err) {
          return reject(err.message);
        } else {
          return resolve("Delete success");
        }
      });
    });
  },
};

module.exports = todoModel;
