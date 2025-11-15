import express, { Request, Response, NextFunction } from 'express';
import Todo from '../models/Todo.model';
import { authenticate, AuthRequest } from '../middleware/auth.middleware';
import { logError } from '../utils/logger';
import { z } from 'zod';

const router = express.Router();

// All routes require authentication
router.use(authenticate);

// Validation schemas
const createTodoSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
});

const updateTodoSchema = z.object({
  title: z.string().min(1, 'Title is required').optional(),
  description: z.string().optional(),
  completed: z.boolean().optional(),
});

// Create Todo
router.post(
  '/',
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const validatedData = createTodoSchema.parse(req.body);
      const { title, description } = validatedData;

      const todo = await Todo.create({
        title,
        description,
        userId: req.userId,
        completed: false,
      });

      res.status(201).json({
        message: 'Todo created successfully',
        todo,
      });
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: error.errors[0].message });
        return;
      }
      await logError(error, '/api/todos', 'POST', req.userId);
      next(error);
    }
  }
);

// List Todos
router.get(
  '/',
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const todos = await Todo.find({ userId: req.userId }).sort({
        createdAt: -1,
      });

      res.json({
        message: 'Todos retrieved successfully',
        todos,
      });
    } catch (error: any) {
      await logError(error, '/api/todos', 'GET', req.userId);
      next(error);
    }
  }
);

// Get Single Todo
router.get(
  '/:id',
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const todo = await Todo.findOne({
        _id: req.params.id,
        userId: req.userId,
      });

      if (!todo) {
        res.status(404).json({ error: 'Todo not found' });
        return;
      }

      res.json({
        message: 'Todo retrieved successfully',
        todo,
      });
    } catch (error: any) {
      await logError(error, `/api/todos/${req.params.id}`, 'GET', req.userId);
      next(error);
    }
  }
);

// Update Todo
router.put(
  '/:id',
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const validatedData = updateTodoSchema.parse(req.body);

      const todo = await Todo.findOneAndUpdate(
        { _id: req.params.id, userId: req.userId },
        { $set: validatedData },
        { new: true, runValidators: true }
      );

      if (!todo) {
        res.status(404).json({ error: 'Todo not found' });
        return;
      }

      res.json({
        message: 'Todo updated successfully',
        todo,
      });
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: error.errors[0].message });
        return;
      }
      await logError(error, `/api/todos/${req.params.id}`, 'PUT', req.userId);
      next(error);
    }
  }
);

// Delete Todo
router.delete(
  '/:id',
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const todo = await Todo.findOneAndDelete({
        _id: req.params.id,
        userId: req.userId,
      });

      if (!todo) {
        res.status(404).json({ error: 'Todo not found' });
        return;
      }

      res.json({
        message: 'Todo deleted successfully',
      });
    } catch (error: any) {
      await logError(
        error,
        `/api/todos/${req.params.id}`,
        'DELETE',
        req.userId
      );
      next(error);
    }
  }
);

// Toggle Todo Completion
router.patch(
  '/:id/toggle',
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const todo = await Todo.findOne({
        _id: req.params.id,
        userId: req.userId,
      });

      if (!todo) {
        res.status(404).json({ error: 'Todo not found' });
        return;
      }

      todo.completed = !todo.completed;
      await todo.save();

      res.json({
        message: 'Todo status updated successfully',
        todo,
      });
    } catch (error: any) {
      await logError(
        error,
        `/api/todos/${req.params.id}/toggle`,
        'PATCH',
        req.userId
      );
      next(error);
    }
  }
);

export default router;

