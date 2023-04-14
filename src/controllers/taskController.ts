import { Request as ExpressRequest, Response } from 'express';
import {Task} from '../models/Task';
import { validationResult } from 'express-validator';

interface Request extends ExpressRequest {
  user?: { id: number };
}

export const getTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await Task.findAll({ where: { user_id: req.user?.id } });
    res.json(tasks);
  } catch (err : any ) {
    console.error(err.message);
    res.status(500).send(err.message);
  }
};

export const createTask = async (req: Request, res: Response) => {
  console.log(req.body);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const { title, description,completed } = req.body;

  try {
    const newTask = new Task({
      title,
      description,
      completed
    });

    await newTask.save();

    res.json(newTask);
  } catch (err : any ) {
    console.error(err.message);
    res.status(500).send(err.message);
  }
};

export const updateTask = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const taskId = req.params.id;
  const { title, description } = req.body;

  try {
    const task = await Task.findOne({ where: { id: taskId, user_id: req.user?.id } });
    if (!task) {
      return res.status(404).json({ errors: [{ msg: 'Task not found' }] });
    }

    task.title = title || task.title;
    task.description = description || task.description;

    await task.save();

    res.json(task);
  } catch (err : any ) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const task = await Task.findOne({ where: { id, user_id: req.user?.id } });

    if (!task) {
      return res.status(404).json({ msg: 'Task not found' });
    }

    await task.destroy();

    res.json({ msg: 'Task deleted' });
  } catch (err : any ) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
