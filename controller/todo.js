const express = require("express");
const router = express.Router();
const admin = require("../firebase");
const User = require("../model/user");
const Todo = require("../model/todo");

// create todo
router.post("/create", async (req, res) => {
  try {
    const email = req?.user_email;
    let user = await User.findOne({ email_id: email });
    if (user) {
      const { todoName, todoDesc } = req.body;
      console.log("todo", todoName, todoDesc);
      let todo = await Todo.create({
        todo_name: todoName,
        todo_desc: todoDesc,
        user_id: user?._id,
      });
      return res.send("Todo added Successfully.");
    } else {
      res.send("User not Found");
    }
  } catch (error) {
    return res.json({
      message: "internal Error",
    });
  }
});

// get All Todos

router.get("/all-todos", async (req, res) => {
  try {
    const email = req?.user_email;
    let user = await User.findOne({ email_id: email });
    if (user) {
      let all_todos = await Todo.find({
        user_id: user?._id,
      });
      const filterdList = all_todos.map((each) => ({
        todo_name: each?.todo_name,
        todo_desc: each?.todo_desc,
        todo_id: each?._id,
        created_at: each?.createdAt,
      }));
      return res.send({
        total_count: filterdList.length,
        records: filterdList,
      });
    } else {
      res.send("User not Found");
    }
    console.log("create api", user);
  } catch (error) {
    return res.json({
      message: "internal Error",
    });
  }
});

// Todo Update

router.put("/update-todo/:todo_id", async (req, res) => {
  try {
    const email = req?.user_email;
    let user = await User.findOne({ email_id: email });
    if (user) {
      let { todo_id } = req?.params;
      const { todoName, todoDesc } = req?.body;
      let is_todo = await Todo.findOne({ _id: todo_id });
      if (is_todo) {
        let update_todos = await Todo.updateOne(
          { _id: todo_id },
          {
            $set: {
              todo_name: todoName,
              todo_desc: todoDesc,
            },
          }
        );
        return res.send("updated Sucessfully.");
      } else {
        return res.send("Invalid Todo Id");
      }
    } else {
      res.send("User not Found");
    }
    console.log("create api", user);
  } catch (error) {
    return res.json({
      message: "internal Error",
    });
  }
});

// delete Todo

router.delete("/delete-todo/:todo_id", async (req, res) => {
  try {
    const email = req?.user_email;
    let user = await User.findOne({ email_id: email });
    if (user) {
      let { todo_id } = req?.params;
      const { todoName, todoDesc } = req?.body;
      let is_todo = await Todo.findOne({ _id: todo_id });
      if (is_todo) {
        let delete_todos = await Todo.deleteOne({ _id: todo_id });
        return res.send("Deleted Sucessfully.");
      } else {
        return res.send("Invalid Todo Id.");
      }
    } else {
      res.send("User not Found");
    }
    console.log("create api", user);
  } catch (error) {
    return res.json({
      message: "internal Error",
    });
  }
});

module.exports = router;
