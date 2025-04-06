import express from 'express';
import catRouter from '../api/routes/catRouter.js';
import userRouter from '../api/routes/userRouter.js';

const router = express.Router();

router.use('/cat', catRouter);
router.use('/user', userRouter);
//router.use('/auth', authRouter);


export default router;