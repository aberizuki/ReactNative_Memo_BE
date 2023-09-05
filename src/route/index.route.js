const express = require("express"); //import
const router = express();

const todoRoute = require("./todo.route");

router.get("/", (req, res) => {
  return res.send("backend for CRUD");
});

router.use("/todos", todoRoute);

module.exports = router;
