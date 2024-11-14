import express from 'express';
import { createUser, getUsers, getUserById, updateUser, deleteUser, login } from '../controllers/userController.js';
import authMiddleware, { verifyToken } from '../middlewares/verifyToken.js';

const router = express.Router();

router.post("/login", login);
router.get('/users', getUsers);
router.get('/users/:id', getUserById);
router.post('/users', createUser);
router.put('/users/:id', verifyToken, updateUser);
router.delete('/users/:id', verifyToken, deleteUser);

export default router;
