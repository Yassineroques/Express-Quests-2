const express = require("express");
const validateMovie = require("../middlewares/validateMovie");
const validateUsers = require("../middlewares/validateUsers")

const movieControllers = require("./controllers/movieControllers");
const usersControllers = require("./controllers/usersControllers")

const app = express();

app.use(express.json());




app.get("/api/movies", movieControllers.getMovies);
app.get("/api/movies/:id", movieControllers.getMovieById);
app.post("/api/movies", movieControllers.postMovie)
app.post("/api/movies", validateMovie, movieControllers.postMovie);
app.delete("/api/movies/:id", movieControllers.deleteMovie);

app.get("/api/users", usersControllers.getUsers);
app.get("/api/users/:id", usersControllers.getUsersById )
app.post("/api/users", usersControllers.postUser)
app.post("/api/users", validateUsers, usersControllers.postUser);
app.delete("/api/users/:id", usersControllers.deleteUser);






module.exports = app;