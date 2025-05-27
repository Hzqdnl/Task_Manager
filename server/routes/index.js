import express from 'express';
import userRoutes from './userRoutes.js';
import taskRoutes from './taskRoutes.js';

const router = express.Router();

router.use('/user', userRoutes); //api/user/login or register
router.use('/task', userRoutes);

export default router;