import express, { Request, Response, NextFunction } from 'express';
import User from '../models/User.model';
import { generateToken } from '../utils/jwt';
import { logError } from '../utils/logger';
import crypto from 'crypto';
import { z } from 'zod';

const router = express.Router();

// Validation schemas
const signupSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const signinSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
});

const resetPasswordSchema = z.object({
  token: z.string().min(1, 'Token is required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

// Signup
router.post(
  '/signup',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validatedData = signupSchema.parse(req.body);
      const { name, email, password } = validatedData;

      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        res.status(400).json({ error: 'User already exists with this email' });
        return;
      }

      // Create new user
      const user = await User.create({ name, email, password });

      // Generate token
      const token = generateToken({
        userId: (user._id as any).toString(),
        email: user.email,
      });

      res.status(201).json({
        message: 'User created successfully',
        token,
        user: {
          id: (user._id as any).toString(),
          name: user.name,
          email: user.email,
        },
      });
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: error.errors[0].message });
        return;
      }
      await logError(error, '/api/auth/signup', 'POST');
      next(error);
    }
  }
);

// Signin
router.post(
  '/signin',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validatedData = signinSchema.parse(req.body);
      const { email, password } = validatedData;

      // Find user
      const user = await User.findOne({ email });
      if (!user) {
        res.status(401).json({ error: 'Invalid email or password' });
        return;
      }

      // Check password
      const isPasswordValid = await user.comparePassword(password);
      if (!isPasswordValid) {
        res.status(401).json({ error: 'Invalid email or password' });
        return;
      }

      // Generate token
      const token = generateToken({
        userId: (user._id as any).toString(),
        email: user.email,
      });

      res.json({
        message: 'Sign in successful',
        token,
        user: {
          id: (user._id as any).toString(),
          name: user.name,
          email: user.email,
        },
      });
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: error.errors[0].message });
        return;
      }
      await logError(error, '/api/auth/signin', 'POST');
      next(error);
    }
  }
);

// Forgot Password
router.post(
  '/forgot-password',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validatedData = forgotPasswordSchema.parse(req.body);
      const { email } = validatedData;

      const user = await User.findOne({ email });
      if (!user) {
        // Don't reveal if user exists for security
        res.json({
          message:
            'If an account exists with this email, a password reset link has been sent',
        });
        return;
      }

      // Generate reset token
      const resetToken = crypto.randomBytes(32).toString('hex');
      user.resetPasswordToken = resetToken;
      user.resetPasswordExpires = new Date(Date.now() + 3600000); // 1 hour
      await user.save();

      // In production, send email with reset token
      // For now, we'll return it (in production, send via email)
      res.json({
        message:
          'If an account exists with this email, a password reset link has been sent',
        resetToken, // Remove this in production and send via email
      });
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: error.errors[0].message });
        return;
      }
      await logError(error, '/api/auth/forgot-password', 'POST');
      next(error);
    }
  }
);

// Reset Password
router.post(
  '/reset-password',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validatedData = resetPasswordSchema.parse(req.body);
      const { token, password } = validatedData;

      const user = await User.findOne({
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: new Date() },
      });

      if (!user) {
        res.status(400).json({ error: 'Invalid or expired reset token' });
        return;
      }

      user.password = password;
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;
      await user.save();

      res.json({ message: 'Password reset successful' });
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: error.errors[0].message });
        return;
      }
      await logError(error, '/api/auth/reset-password', 'POST');
      next(error);
    }
  }
);

export default router;

