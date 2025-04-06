import {addUser, findUserById, listAllUsers, removeUser, modifyUser} from "../models/userModel.js";
import bcrypt from 'bcrypt';

const getUser = async (req, res, next) => {
  try {
    const users = await listAllUsers();
    if (users) {
      res.json(users);
    } else {
      const error = new Error('No users found');
      error.status = 404;
      return next(error);

    }
  } catch (error) {
   next(error);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const user = await findUserById(req.params.id);
    if (user) {
      res.json(user);
    } else {
      const error = new Error('User not found');
      error.status = 404;
      return next(error);
    }
  } catch (error) {
    next(error);
  }
};




const postUser = async (req, res, next) => {

  try {

    req.body.password = bcrypt.hashSync(req.body.passwd, 10);
    const result = await addUser(req.body);
    if (result.user_id) {
      res.status(201);
      res.json(result);
    } else {
      const error = new Error('Cant post user');
      error.status = 400;
      return next(error);
    }
    } catch (error) {
      next(error)
    }
};





const putUser = async (req, res, next) => {
  try {
    const user = await findUserById(req.params.id);

    console.log("User role:", res.locals.user.role);
    console.log("Found user:", user);
    
    if (!user) {
      const error = new Error('User not found');
      error.status = 404;
      return next(error);
    }

    if (res.locals.user?.role?.trim().toLowerCase() === 'admin') {
      const result = await modifyUser(req.body, req.params.id);
      console.log("oon resultti", result)
      if (result.message) {
        return res.json(result);
      }
      const error = new Error('Update failed');
      error.status = 400;
      return next(error);
      
    }

    if (user.user_id !== res.locals.user.user_id) {
    
      const error = new Error('Access denied you are not owner of this user');
      error.status = 403;
      return next(error);
  
    }
    
    const result = await modifyUser(req.body, req.params.id);
  
    if (result.message) {
      res.json(result);
    } else {
  
      const error = new Error('Update failed');
      error.status = 400;
      return next(error);
    }
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const user = await findUserById(req.params.id);

    console.log("User role:", res.locals.user.role);
    console.log("Found user:", user);
    
    if (!user) {
    
      const error = new Error('User not found');
      error.status = 404;
      return next(error);
    }

    if (res.locals.user?.role?.trim().toLowerCase() === 'admin') {
      const result = await removeUser(req.params.id);
  
      if (result.message) {
        return res.json(result);
      }
 
      const error = new Error('Cant delete user');
      error.status = 400;
      return next(error);
    }

    // For non-admin users, check ownership
    if (user.user_id !== res.locals.user.user_id) {
     
      const error = new Error('Access denied, not owner of this user');
      error.status = 403;
      return next(error);
    }
    
    const result = await removeUser(req.params.id);
  
    if (result.message) {
      res.json(result);
    } else {
      const error = new Error('Remove failed');
      error.status = 400;
      return next(error);
    }
  } catch (error) {
    next(error);
  }
};

export {getUser, getUserById, postUser, putUser, deleteUser};