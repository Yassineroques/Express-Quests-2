const database = require("../../database");
const { post } = require("../app");

const getUsers = (req, res) => {
  let sql = "select * from users";
  const sqlValues = [];

  const parameters = {};



  if (req.query.language != null) {
    parameters.language = req.query.language;
  }

  if (req.query.city != null) {
    parameters.city = req.query.city;
  }

  if (Object.keys(parameters).length != 0 ) {
    sql += " where " ;

    let i = 0;

    for (key of Object.keys(parameters)){
        if ( i != 0){
           sql += " and ";
        }
        sql += key + " = ? ";
        sqlValues.push(parameters[key])
        i++;
    }
     
     }

   

  console.log(sql, sqlValues);


  database
    .query(sql, sqlValues)
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


const postUser = (req, res) => {
  const {firstname, lastname, email, city, language} = req.body;
  const sql = `INSERT INTO users (firstname, lastname, email, city, language) VALUES (?, ?, ?, ?, ?)`

  database.query(sql, [firstname, lastname, email, city, language])
  .then(([result]) => {
    res.status(201).send({id: result.insertId})
  })
  .catch((err) => res.status(500).send(err))
};


const deleteUser = (req, res) => {
  const id = parseInt(req.params.id);

  database
    .query("delete from users where id = ?", [id])
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};



module.exports = {
  getUsers,
  getUsersById,
  postUser,
  deleteUser
};
