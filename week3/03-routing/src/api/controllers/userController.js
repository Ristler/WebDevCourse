import {addUser, findUserById, listAllUsers} from "../models/userModel.js";

const getUser = (req, res) => {
  res.json(listAllUsers());
};

const getUserById = (req, res) => {
  const user = findUserById(req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.sendStatus(404);
  }
};

const postUser = (req, res) => {
    
  const result = addUser(req.body);

  if (result.user_id) {
    res.status(201);
    res.json({message: 'New user added.', result});
  } else {
    res.sendStatus(400);
  }
};

const putUser = (req, res) => {
  // not implemented in this example, this is future homework
  res.json({message: 'User item updated.'});
  res.sendStatus(200);
};

const deleteUser = (req, res) => {
  // not implemented in this example, this is future homework
  res.json({message: 'User item deleted.'});
  res.sendStatus(200);
};

export {getUser, getUserById, postUser, putUser, deleteUser};