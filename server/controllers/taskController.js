const Task = require('../models/Task');

exports.getTasks = async (_req, res, next) => {
  try { res.json(await Task.find().sort({ createdAt: -1 })); } catch (error) { next(error); }
};
exports.createTask = async (req, res, next) => {
  try { res.status(201).json(await Task.create(req.body)); } catch (error) { next(error); }
};
exports.updateTask = async (req, res, next) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  } catch (error) { next(error); }
};
exports.deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.status(204).end();
  } catch (error) { next(error); }
};
