import { raw, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../models/index';
import { SECRET_KEY } from '../config/config';

export const registerEmployee = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, password, techStack, experience } =
      req.body;

    // Check if the email is already registered
    const existingEmployee = await db.Employee.findOne({ where: { email } });
    if (existingEmployee) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create the new employee
    const newEmployee = await db.Employee.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      techStack,
      experience,
    });

    return res
      .status(201)
      .json({ message: 'Registration successful', employee: newEmployee });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const loginEmployee = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Find the employee by email
    const employee = await db.Employee.findOne({ where: { email }, raw: true });

    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, employee.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: employee.uId }, SECRET_KEY, {
      expiresIn: '1h',
    });

    return res.json({ message: 'Login successful', token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
