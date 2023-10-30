import express from "express";
import * as userController from '../controllers/userController';
const userRoutes = express.Router();


// Rutas relacionadas con usuarios
userRoutes.get('/', userController.getAllUsers);
userRoutes.get('/:id', userController.getUserById);
userRoutes.post('/', userController.createUser);

export default userRoutes;
