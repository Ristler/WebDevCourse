import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {login} from '../models/userModel.js';

const authUser = async (req, res, next) => {
  try {

    if (!req.body.username || !req.body.password) {
      const error = new Error('Username and password are required');
      error.status = 400;
      return next(error);
    }

    const result = await login(req.body.username);
    
    if (!result) {
      const error = new Error('Invalid credentials');
      error.status = 401;
      return next(error);
    }

    const passwordValid = await bcrypt.compare(req.body.password, result.password);
    
    // Check if password is valid
    if (!passwordValid) {
      const error = new Error('Invalid credentials');
      error.status = 401;
      return next(error);
    }

    const userWithNoPassword = {
      user_id: result.user_id,
      name: result.name,
      username: result.username,
      email: result.email,
      role: result.role,
    };

    const token = jwt.sign(userWithNoPassword, process.env.JWT_SECRET, {
      expiresIn: '24h',
    });

    res.json({user: userWithNoPassword, token});
  } catch (error) {
  
    next(error);
  }
};



const getMe = async (req, res, next) => {
  try {
    console.log('getMe', res.locals.user);
    if (!res.locals.user) {
      const error = new Error('Auth required.');
      error.status = 401;
      return next(error);
      
    } 
    res.json({message: 'token ok', user:  res.locals.user});
    
    } catch (error) {
      next(error);
    }
  };


const logout = async (req, res, next) => {
  try {

    if (!res.locals.user) {
   
      const error = new Error('Logout failed.');
      error.statys = 401;
      return next(error);
    }

    console.log('User logging out:', res.locals.user.user_id);


    res.locals.user = null;

    res.status(200).json({ 
      message: 'Logged out successfully',
      user: null,
      token: null
    });
  } catch (error) {
    next(error);
  }
};

export {authUser, getMe, logout};