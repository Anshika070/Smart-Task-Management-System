const Task = require('../models/Task');

exports.getTasks = async (_req, res, next) => {
  try { res.json(await Task.find({ user: req.user._id }).sort({ createdAt: -1 })); } catch (error) { next(error); }
};
exports.createTask = async (req, res, next) => {
  try { res.status(201).json(await Task.create({ ...req.body, user: req.user._id })); } catch (error) { next(error); }
};
exports.updateTask = async (req, res, next) => {
  try {
    const task = await Task.findOneAndUpdate({ _id: req.params.id, user: req.user._id }, req.body, { new: true, runValidators: true });
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  } catch (error) { next(error); }
};
exports.deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.status(204).end();
  } catch (error) { next(error); }
};
