import {addCat, findCatById, listAllCats, removeCat, modifyCat, findCatByOwnerId} from "../models/catModel.js";

const getCat = async (req, res) => {
  try {
    const cats = await listAllCats();
    if (cats) {
      res.json(cats);
    } else {
      res.status(404).json({ message: 'No cats found' });
    }
  } catch (error) {
    console.error('Error in getCat:', error);
    res.status(500).json({ message: error.message });
  }
};

const getCatById = (req, res) => {
  const cat = findCatById(req.params.id);
  if (cat) {
    res.json(cat);
  } else {
    res.sendStatus(404);
  }
};

const postCat = async (req, res) => {
  req.body.filename = req.file.filename;

  const result = await addCat(req.body, res.locals.user.user_id);

  if (result.cat_id) {
    res.status(201);
    res.json(result);
  } else {
    res.sendStatus(400);
  }
};
const putCat = async (req, res) => {
  try {
    console.log("waaat in cat", req.params.id)

    const cat = await findCatById(req.params.id);

    if (!cat) {
      return res.status(404).json({ message: 'Cat not found' });
    }

    if (res.locals.user?.role?.trim().toLowerCase() === 'admin') {
      const result = await modifyCat(req.body, req.params.id, res.locals.user.user_id, true);
      console.log("oon resultti", result)
      if (result.message) {
        return res.json(result);
      }
      return res.status(400).json({ message: 'Update failed' });
    }

    if (cat.owner !== res.locals.user.user_id) {
      return res.status(403).json({ message: 'Access denied: You are not the owner of this cat' });
    }

    const result = await modifyCat(req.body, req.params.id, res.locals.user.user_id);
    if (result.message) {
      res.json(result);
    } else {
      res.status(400).json({ message: 'Update failed' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteCat = async (req, res) => {
  try {
    const cat = await findCatById(req.params.id);
  
    
    if (!cat) {
      return res.status(404).json({ message: 'Cat not found' });
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
  
    return res.status(403).json({ message: 'Access denied: You are not the owner or admin' });
    
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ message: error.message });
  }
};

const getCatByOwnerId = async (req, res) => {
  const result = await findCatByOwnerId(req.params.id);
  if (result) {
    res.status(200);
    res.json(result);
  } else {
    res.sendStatus(404);
  }
};

export {getCat, getCatById, postCat, putCat, deleteCat, getCatByOwnerId };