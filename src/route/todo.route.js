const express = require("express");
const router = express();

const todoController = require("../controller/todo.controller");

router.get("/", todoController.get);
router.get("/:id", todoController.getId);
router.post("/", todoController.add);
router.patch("/:id", todoController.update);
router.delete("/:id", todoController.remove);

module.exports = router;
