import { Request, Response } from 'express';
import { User, NonSensitiveInfoUser } from '../types';
import userService from '../services/userService';

async function getAllUsers(_req: Request, res: Response) {
  try {
    const users: NonSensitiveInfoUser[] = await userService.getAllUsers();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los usuarios.' });
  }
}

async function getUserById(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const user: NonSensitiveInfoUser | null = await userService.getUserById(id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'Usuario no encontrado.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener el usuario.' });
  }
}

async function createUser(req: Request, res: Response) {
  const { name, email, password } = req.body;
  try {
    const newUser: User = await userService.createUser(name, email, password);
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear el usuario.' });
  }
}

export { getAllUsers, getUserById, createUser };
