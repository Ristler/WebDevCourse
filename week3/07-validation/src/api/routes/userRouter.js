import express from 'express';
import {body} from 'express-validator';
import { validationErrors } from '../middlewares/middlewares.js';
import {
    getUser,
    getUserById,
    postUser,
    putUser,
    deleteUser,
  } from '../controllers/userController.js';
  import authenticateToken from '../middlewares/authentication.js';
  

const userRouter = express();



userRouter.route('/')
.get(getUser)
.post(
  body('email').trim().isEmail(),
  body('username').trim().isLength({min: 3, max: 20}).isAlphanumeric(),
  body('password').trim().isLength({min: 8}),
  validationErrors,
  postUser
);

userRouter.route('/:id')
.get(getUserById)
.put(authenticateToken, putUser)
.delete(authenticateToken, deleteUser);
  export default userRouter;

