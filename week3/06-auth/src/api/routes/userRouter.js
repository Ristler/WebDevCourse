import express from 'express';
import {
    getUser,
    getUserById,
    postUser,
    putUser,
    deleteUser,
  } from '../controllers/userController.js';
  import authenticateToken from '../middlewares/authentication.js';
  

const userRouter = express();



userRouter.route('/').get(getUser).post(postUser);

userRouter.route('/:id')
.get(getUserById)
.put(authenticateToken, putUser)
.delete(authenticateToken, deleteUser);
  export default userRouter;

