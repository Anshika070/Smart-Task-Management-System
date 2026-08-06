require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Task = require('./models/Task');

const app = express();
app.use(cors());
app.use(express.json());
app.get('/api/tasks', async (_req, res) => res.json(await Task.find().sort({ createdAt: -1 })));
app.post('/api/tasks', async (req, res) => res.status(201).json(await Task.create(req.body)));
app.patch('/api/tasks/:id', async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!task) return res.status(404).json({ message: 'Task not found' });
  res.json(task);
});
app.delete('/api/tasks/:id', async (req, res) => {
  const task = await Task.findByIdAndDelete(req.params.id);
  if (!task) return res.status(404).json({ message: 'Task not found' });
  res.status(204).end();
});
const port = process.env.PORT || 5000;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/taskflow')
  .then(() => app.listen(port, () => console.log(`Task API running on port ${port}`)))
  .catch(err => { console.error('MongoDB connection failed:', err.message); process.exit(1); });
