import {addUser, findUserById, listAllUsers, removeUser, modifyUser} from "../models/userModel.js";
import bcrypt from 'bcrypt';

const getUser = async (req, res) => {
  try {
    const users = await listAllUsers();
    if (users) {
      res.json(users);
    } else {
      res.status(404).json({ message: 'No users found' });
    }
  } catch (error) {
    console.error('Error in getUser:', error);
    res.status(500).json({ message: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await findUserById(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error in getUserById:', error);
    res.status(500).json({ message: error.message });
  }
};




const postUser = async (req, res) => {


  req.body.password = bcrypt.hashSync(req.body.passwd, 10);
  const result = await addUser(req.body);
  if (result.user_id) {
    res.status(201);
    res.json(result);
  } else {
    res.sendStatus(400);
  }
};





const putUser = async (req, res) => {
  try {
    const user = await findUserById(req.params.id);

    console.log("User role:", res.locals.user.role);
    console.log("Found user:", user);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (res.locals.user?.role?.trim().toLowerCase() === 'admin') {
      const result = await modifyUser(req.body, req.params.id);
      console.log("oon resultti", result)
      if (result.message) {
        return res.json(result);
      }
      return res.status(400).json({ message: 'Update failed' });
    }

    // For non-admin users, check ownership
    if (user.user_id !== res.locals.user.user_id) {
      return res.status(403).json({ message: 'Access denied: You are not the owner of this user' });
    }
    
    const result = await modifyUser(req.body, req.params.id);
    console.log("oon oikee käyttäjä", result)
    if (result.message) {
      res.json(result);
    } else {
      res.status(400).json({ message: 'Update failed' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await findUserById(req.params.id);

    console.log("User role:", res.locals.user.role);
    console.log("Found user:", user);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (res.locals.user?.role?.trim().toLowerCase() === 'admin') {
      const result = await removeUser(req.params.id);
      console.log("oon resultti", result)
      if (result.message) {
        return res.json(result);
      }
      return res.status(400).json({ message: 'Update failed' });
    }

    // For non-admin users, check ownership
    if (user.user_id !== res.locals.user.user_id) {
      return res.status(403).json({ message: 'Access denied: You are not the owner of this user' });
    }
    
    const result = await removeUser(req.params.id);
    console.log("oon oikee käyttäjä", result)
    if (result.message) {
      res.json(result);
    } else {
      res.status(400).json({ message: 'Update failed' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: error.message });
  }
};

export {getUser, getUserById, postUser, putUser, deleteUser};