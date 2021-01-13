const Task = require("./../models/task.js");
const auth = require("./../middlewares/auth");
const router = require("express").Router();
//tasks endpoints
router.post("/tasks", auth, async (req, res) => {
  const newTask = new Task({ ...req.body, owner: req.user._id });
  try {
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.send(error);
  }
});

router.get("/tasks/:id", auth, async (req, res) => {
  const _id = req.params.id;
  try {
    const task = await Task.findOne({ _id, owner: req.user._id });
    if (!task) {
      return res.status(500).send();
    }
    res.send(task);
  } catch (error) {
    res.status(404).send(error);
  }
});

router.get("/tasks", auth, async (req, res) => {
  try {
    // const newTask = new Task({ ...req.body, owner: req.user._id });
    const tasks = await req.user.populate("tasks").execPopulate();
    res.send(tasks);
  } catch (error) {
    res.send(error);
  }
});

router.patch("/tasks/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const requiredFields = ["description", "completed"];
  const isValid = updates.every((update) => requiredFields.includes(update));
  if (!isValid) {
    return res.status(400).send({ error: "Invalid Updation Fields" });
  }
  try {
    const task = await Task.findById(req.params.id);
    updates.forEach((update) => (task[update] = req.body[update]));
    await task.save();
    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (error) {
    res.send(error);
  }
});

router.delete("/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
