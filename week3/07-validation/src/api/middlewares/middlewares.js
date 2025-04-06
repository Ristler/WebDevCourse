import sharp from 'sharp';
import {validationResult} from 'express-validator';
import multer from 'multer';
const createThumbnail = async (req, res, next) => {
  console.log('todo: tee kuvakäsittely', req.file);
  if (!req.file) {
    next();
    // next('Oh no, kuvaa ei löydy 🧐');
    return;
  }

  let extension = 'jpg';
  if (req.file.mimetype === 'image/png') {
    // if (req.file.mimetype.includes('/png')) {
    extension = 'png';
  }

  await sharp(req.file.path)
    .resize(100, 100)
    .toFile(`${req.file.path}_thumb.${extension}`);

  next();
};

const validationErrors = async (req, res, next) => {
  // validation errors can be retrieved from the request object (added by express-validator middleware)
  const errors = validationResult(req);
  // check if any validation errors
  if (!errors.isEmpty()) {
    const messages = errors
       .array()
       .map((error) => `${error.path}: ${error.msg}`)
       .join(', ');
    const error = new Error(messages);
    error.status = 400;
    next(error);
    return;
  }
  next();
};

const upload = multer({
  dest: 'uploads/',
  limits: {
    fileSize: 10 * 1024 * 1024, // max 10 MB
  },
  fileFilter: (req, file, cb) => {
    // allow only images and videos
    if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/')) {
      // accept file
      cb(null, true);
    } else {
      // reject file
      cb(null, false);
    }
  },
});


export {createThumbnail, validationErrors, upload} ;