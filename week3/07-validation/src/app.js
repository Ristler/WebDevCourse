import express from 'express';
import cors from 'cors';
import api from './api/index.js'
import { notFoundHandler, errorHandler } from './api/middlewares/errorHandling.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/public', express.static('public'));

app.get('/', (req, res) => {
  res.send('Nothing here.');
});

app.use('/api/v1', api);
app.use(notFoundHandler);
app.use(errorHandler);

export default app;