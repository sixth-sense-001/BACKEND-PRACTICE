import express from 'express';

const router = express.Router();

router.post('/login', (req, res) => {
  return res.status(200).json({message: "The /auth/login route works"});
});

router.post('/register', (req, res) => {
  return res.status(200).json({message: "The /auth/register route works"});
});

export default router;;