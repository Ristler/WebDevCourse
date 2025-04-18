import jwt from 'jsonwebtoken';
import 'dotenv/config';


const authenticateToken = (req, res, next) => {
    console.log('authenticateToken', req.headers);
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    console.log('token', token);
    if (token == null) {
      return res.sendStatus(401);
    }
    try {
      res.locals.user = jwt.verify(token, process.env.JWT_SECRET);
      next();
    } catch (err) {
      console.error('Token verification error:', err);
      res.status(403).send({message: 'invalid token'});
    }
  };
export default authenticateToken;  