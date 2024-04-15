const tasksRouter = require("express").Router();
const Task = require("../schemas/Task");

tasksRouter.get("/", async (req, res) => {
  res.send(await Task.find({}));
});

tasksRouter.post("/", async (req, res) => {
  const newTask = await Task.create({ ...req.body });
  await newTask.save();
  res.send(newTask);
});

tasksRouter.delete("/deleteTask", async (req, res) => {
  const { id } = req.body;

  const deletedTask = await Task.findById(id);
  if (deletedTask) {
    await deletedTask.deleteOne();
  } else {
    console.log("duplicate delete request for: ", id);
  }
  res.send(await Task.find({}));
});

tasksRouter.get("/clearCompleted", async (req, res) => {
  console.log(await Task.deleteMany({ active: false }));
  res.send(await Task.find({}));
});

tasksRouter.put("/toggleActive", async (req, res) => {
  const { id } = req.body;
  const updatedTask = await Task.findById(id);
  if (updatedTask) {
    updatedTask.active = !updatedTask.active;
    await updatedTask.save();
  }
  res.send(await Task.find({}));
});

module.exports = tasksRouter;
