import express from 'express';
import { body } from 'express-validator';
import {
  register,
  login,
  logout,
} from './controllers/authController';
import {forgotPassword} from './controllers/forgotPasswordController';
import { resetPassword } from './controllers/resetPasswordController';
import { createTask, getTasks, updateTask, deleteTask } from './controllers/taskController';
import authenticate from './middlewares/authenticate';

const router = express.Router();

router.get('/', (req: express.Request, res: express.Response) => {
  res.send('Hello, World!');
});

// Authentication routes
router.post('/register',
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),
  register);

router.post('/login', login);
router.post('/logout', authenticate, logout);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

// Task routes
router.post('/tasks', authenticate, createTask);
router.get('/tasks', authenticate, getTasks);
router.patch('/tasks/:id', authenticate, updateTask);
router.delete('/tasks/:id', authenticate, deleteTask);

export { router };
