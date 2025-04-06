import express from 'express';
import {body} from 'express-validator';
import {createThumbnail, upload, validationErrors} from '../middlewares/middlewares.js';
import authenticateToken from '../middlewares/authentication.js';

import {
    getCat,
    getCatById,
    postCat,
    putCat,
    deleteCat,
    getCatByOwnerId
  } from '../controllers/catController.js';
  

const catRouter = express();

//const upload = multer({ dest: 'uploads/' });

catRouter
.route('/')
.get(getCat)
.post(
  authenticateToken,
  upload.single('file'),
  body('cat_name').trim().isLength({min: 3, max: 20}).isAlphanumeric(),
  body('weight').isFloat({min: 0.1, max: 25}),
  validationErrors, 
  createThumbnail, 
  postCat
);

catRouter.route('/:id')
.get(getCatById)
.put(authenticateToken, putCat).
delete(authenticateToken, deleteCat);


catRouter.route('/owner/:id').
get(getCatByOwnerId); 

export default catRouter;

