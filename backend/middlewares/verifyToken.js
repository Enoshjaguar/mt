const jwt = require('jsonwebtoken');
const User = require('../Models/UserModel')
const dotenv = require('dotenv');


dotenv.config()
const secretkey = process.env.SECRET_KEY
const verifyToken = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).send({ error: 'Token missing or invalid' });
  }
  try {
    const decoded = jwt.verify(token, secretkey);
    console.log("this is decoded ",decoded)
    const user = await User.findById(decoded.userid);
    console.log("this is user from database",user)
    if (!user) {
      return res.status(404).send({ error: 'User not found. Please register or log in.' });
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(401).send({ error: 'Token invalid or expired' });
  }
};
module.exports = verifyToken