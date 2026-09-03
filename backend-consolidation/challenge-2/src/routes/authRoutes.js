import express from 'express';
import bcrypt from 'bcryptjs';
import crypto from 'node:crypto';
import jwt from 'jsonwebtoken';
import users from '../data/users.js';

const router = express.Router();

//Register route
router.post('/register', async(req, res) => {
  const { username, password } = req.body;
  if ((username !== undefined) && (password !== undefined)) {
    if ((typeof username === 'string') && (username.trim() !== '')) {
      if ((typeof password === 'string') && (password.trim() !== '')) {
        const existingUserIndex = users.findIndex(user => user.username === username);
        if (existingUserIndex !== -1) {
          return res.status(409).json({ message: "The user with the username already exists" });
        } else {
          const hashedPassword = await bcrypt.hash(password, 8);
          const newUser =
          {
            id: crypto.randomUUID(),
            username: username.trim(),
            password: hashedPassword
          }
          users.push(newUser);
          console.log(users);
          return res.status(201).json({ message: "User successfully created!" });
        }
      } else {
        return res.status(400).json({ message: "400 Bad request" });
      }
    } else {
      return res.status(400).json({ message: "400 Bad request" });
    }
  } else {
    return res.status(400).json({ message: "400 Bad request" });
  }
});

//Login Route
router.post('/login', async(req, res) => {
  const { username, password } = req.body;
  if ((username !== undefined) && (password !== undefined)) {
    if ((typeof username === 'string') && (username !== '')) {
      if((typeof password === 'string') && (password !== '')) {
        const index = users.findIndex(user => user.username === username);
        if(index !== -1) {
          const hashedPassword = users[index].password;
          try {
            const isMatch = await bcrypt.compare(password, hashedPassword);
            if(isMatch) {
              const token = jwt.sign(
                {userId: users[index].id, username: users[index].username},
                 process.env.JWT_SECRET_KEY,
                  {expiresIn: '30d'}
                );
                return res.status(200).json({token});
            } else {
              return res.status(400).json({message: "Invalid password"});
            }
          } catch (error) {
            console.log('error', error);
            return res.status(500).json({message: "Internal server error"});
          }
        } else {
          return res.status(404).json({message: "Sorry, user not found!"});
        }
      } else {
        return res.status(400).json({ message: "400 Bad request" });
      }
    } else {
      return res.status(400).json({message: "Invalid username"});
    }
  } else {
    return res.status(400).json({ message: "400 Bad request" });
  }
});
export default router;