import express from 'express';
import {
    getCat,
    getCatById,
    postCat,
    putCat,
    deleteCat,
  } from '../controllers/catController.js';
  

const catRouter = express();



catRouter.route('/').get(getCat).post(postCat);

catRouter.route('/:id').get(getCatById).put(putCat).delete(deleteCat);
  export default catRouter;

