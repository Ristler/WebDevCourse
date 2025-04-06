import {addCat, findCatById, listAllCats, removeCat, modifyCat, findCatByOwnerId} from "../models/catModel.js";

const getCat = async (req, res, next) => {
  try {
    const cats = await listAllCats();
    if (cats) {
      res.json(cats);
    } else {
      //res.status(404).json({ message: 'No cats found' });
      const error = new Error('Failed to get cats.');
      error.status = 404;
      return next(error);

    }
  } catch (error) {
    //console.error('Error in getCat:', error);
    //res.status(500).json({ message: error.message });
    next(error);
  }
};

const getCatById = (req, res, next) => {
  try {
  const cat = findCatById(req.params.id);
  if (cat) {
    res.json(cat);
  } else {
  
    //res.sendStatus(404);
    const error = new Error('Cant get cat by id');
    error.status = 404;
    return next(error);
  }
    } catch (error) {
      next(error);
    }
};

const postCat = async (req, res, next) => {

  try {
  req.body.filename = req.file.filename;
  const result = await addCat(req.body, res.locals.user.user_id);

  if (result.cat_id) {
    res.status(201);
    res.json(result);
  } else {
    const error = new Error('Cant post cat');
    error.status = 400;
    return next(error);
  }
    //res.sendStatus(400);
  } catch (error) {
    next(error);
  }
};



const putCat = async (req, res, next) => {
  try {
   
    const cat = await findCatById(req.params.id);

    if (!cat) {
      const error = new Error("Cat not found");
      error.status = 404;
      return next(error);
    }

    if (res.locals.user?.role?.trim().toLowerCase() === 'admin') {
      const result = await modifyCat(req.body, req.params.id, res.locals.user.user_id, true);
  
      if (result.message) {
        return res.json(result);
      }
  
      const error = new Error("Update failed");
      error.status = 400;
      return next(error);
    }

    if (cat.owner !== res.locals.user.user_id) {
   
      const error = new Error("You are not the owner of this cat");
      error.status = 403;
      return next(error);
    }

    const result = await modifyCat(req.body, req.params.id, res.locals.user.user_id);
    if (result.message) {
      res.json(result);
    } else {

      const error = new Error("Update failed");
      error.status = 400;
      return next(error);

    }
  } catch (error) {
    next(error);
  }
};

const deleteCat = async (req, res, next) => {
  try {
    const cat = await findCatById(req.params.id);
  
    
    if (!cat) {
      //return res.status(404).json({ message: 'Cat not found' });
      const error = new Error('Cat not found');
      error.status = 404;
      return next(error);

    }
    

    const catOwnerId = Number(cat.owner);
    const userId = Number(res.locals.user.user_id);
    const isAdmin = res.locals.user.role === 'admin';
    
  
    if (isAdmin) {
      const result = await removeCat(req.params.id, userId, true);
      console.log('Admin delete result:', result);
      return res.json(result);
    }
    
    if (catOwnerId === userId) {
      const result = await removeCat(req.params.id, userId, false);
      console.log('Owner delete result:', result);
      return res.json(result);
    }
  
    const error = new Error('Access denied, you are not the owner or admin.');
    error.status = 403;
    return next(error);
   
    
  } catch (error) {
    next(error);
  }
};


const getCatByOwnerId = async (req, res, next) => {

  try {
    const result = await findCatByOwnerId(req.params.id);
    if (result) {
      res.status(200);
      res.json(result);
    } else {
     
      const error = new Error('Cant get cat by owner id');
      error.status = 404;
      return next(error);
    }
    } catch (error) {
      next(error);
    }
};

export {getCat, getCatById, postCat, putCat, deleteCat, getCatByOwnerId };