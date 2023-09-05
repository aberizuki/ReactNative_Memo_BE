const todoModel = require("../model/todo.model");

const todoController = {
  get: (req, res) => {
    return todoModel
      .get(req.query)
      .then((result) => {
        return res
          .status(200)
          .send({ message: "success", data: result, status: 200 });
      })
      .catch((error) => {
        return res.status(500).send({ message: error });
      });
  },

  add: (req, res) => {
    console.log(req.body);
    const request = {
      ...req.body,
    };
    // console.log(request, "ini data");
    return todoModel
      .add(request)
      .then((result) => {
        return res.status(201).send({ message: "succes", data: result });
      })
      .catch((error) => {
        return res.status(500).send({ message: error });
      });
  },

  update: (req, res) => {
    const id = req.params.id;

    return (
      todoModel
        .update(req, id)
        .then((result) => {
          return res.status(200).send({ message: `Successfully updated` });
        })
        // Error handling
        .catch((error) => {
          return res.status(400).send({
            Status: 400,
            Message: `${error}`,
          });
        })
    );
  },

  remove: (req, res) => {
    return todoModel
      .remove(req.params.id)
      .then((result) => {
        return res.status(200).send({ message: "success", data: result });
      })
      .catch((error) => {
        return res.status(500).send({ message: error });
      });
  },
};

module.exports = todoController;
