const express = require("express");
const cors = require("cors");
const middleware = require("./middleware");

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
    Credentials: true,
  })
);

app.use(middleware);

const user = require("./controller/users");
app.use("/api/user", user);

// app.get("/getTodo", async (req, res) => {
//   const todos = [
//     { id: 1, todo: "Make a coffee" },
//     { id: 2, todo: "Buy a book" },
//     { id: 3, todo: "play a game" },
//     { id: 4, todo: "watch a movie" },
//   ];
//   res.send(todos);
// });

module.exports = app;
