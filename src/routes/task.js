const express =  require('express');
const router = express.Router();
const Task = require('../models/Task');


router.get('/', async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
});

router.post('/', async (req, res) => {
    const task = new Task(req.body);
    await task.save();
    res.json(task);
});

router.put('/:id', async (req, res) => {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body);
    res.json({
        status: 'task updated',
        task
    });
});

router.delete('/:id', async (req, res) => {
    const task = await Task.findByIdAndRemove(req.params.id);
    res.json({
        status: 'task deleted',
        task
    });
});

router.get('/:id', async (req, res) => {
    const task = await Task.findById(req.params.id);
    res.json(task);
});


module.exports = router;