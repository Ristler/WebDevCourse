import {authUser, getMe, logout} from '../controllers/authController.js';
import { postUser } from '../controllers/userController.js';


//
import authenticateToken from '../middlewares/authentication.js';

import express from 'express';

const authRouter = express.Router();

authRouter.route('/login').post(authUser);
authRouter.route('/register').post(postUser);

authRouter.route('/logout').get(authenticateToken, logout);


authRouter.route('/me').get(authenticateToken, getMe);

export default authRouter;