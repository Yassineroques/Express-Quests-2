const database = require("../../database");

const getUsers = (req, res) => {
    database
      .query("select * from users")
      .then(([users]) => {
        res.json(users); // use res.json instead of console.log
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(200);
      });
  };


  const getUsersById = (req, res) => {
    const id = parseInt(req.params.id);
  
    database
      .query("select * from movies where id = ?", [id])
      .then(([users]) => {
        if (users[0] != null) {
          res.json(users[0]);
        } else {
          res.sendStatus(200);
        }
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(404);
      });
  };


  module.exports = {
    getUsers, getUsersById
    
  };


