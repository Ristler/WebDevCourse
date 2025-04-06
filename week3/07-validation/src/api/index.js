import express from 'express';
import catRouter from '../api/routes/catRouter.js';
import userRouter from '../api/routes/userRouter.js';
import authRouter from '../api/routes/authRouter.js';

const router = express.Router();

router.use('/cats', catRouter);
router.use('/users', userRouter);
router.use('/auth', authRouter);


export default router;