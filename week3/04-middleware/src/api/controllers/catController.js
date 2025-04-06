import {addCat, findCatById, listAllCats} from "../models/catModel.js";

const getCat = (req, res) => {
  res.json(listAllCats());
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
  const result = await addCat(req.body);
  if (result.cat_id) {
    res.status(201);
    res.json(result);
  } else {
    res.sendStatus(400);
  }
};



const putCat = (req, res) => {
  // not implemented in this example, this is future homework
  res.json({message: 'Cat item updated.'});
  res.sendStatus(200);
};

const deleteCat = (req, res) => {
  // not implemented in this example, this is future homework
  res.json({message: 'Cat item deleted.'});
  res.sendStatus(200);
};

export {getCat, getCatById, postCat, putCat, deleteCat};