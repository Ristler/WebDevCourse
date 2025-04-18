import express from 'express';
import {
    getUser,
    getUserById,
    postUser,
    putUser,
    deleteUser,
  } from '../controllers/userController.js';
  

const userRouter = express();



userRouter.route('/').get(getUser).post(postUser);

userRouter.route('/:id').get(getUserById).put(putUser).delete(deleteUser);
  export default userRouter;

