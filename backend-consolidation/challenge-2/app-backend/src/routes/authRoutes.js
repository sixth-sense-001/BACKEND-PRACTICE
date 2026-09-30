import express from 'express';
import bcrypt from 'bcryptjs';
import crypto from 'node:crypto';
import jwt from 'jsonwebtoken';
import prisma from '../lib/prismaClient.js';
// import users from '../data/users.js';

const router = express.Router();
const users = await prisma.user.findMany();

//Register route
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  if ((username !== undefined) && (password !== undefined)) {
    if ((typeof username === 'string') && (username.trim() !== '')) {
      if ((typeof password === 'string') && (password.trim() !== '')) {
        try {
          const user = await prisma.user.findUnique({
            where: {
              username: username.trim()
            }
          });
          if (user !== null) {
            return res.status(409).json({ message: "The user with the username already exists" });
          } else {
            const hashedPassword = await bcrypt.hash(password, 8);
            const newUser =
            {
              username: username.trim(),
              password: hashedPassword
            };
            const user = await prisma.user.create({
              data: newUser
            });
            return res.status(201).json({ message: "User successfully created!" });
          }
        } catch (error) {
          console.log(`Database operation failed \n ${error}`);
          return res.status(500).json({ message: "Internal Server error" });
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
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  if ((username !== undefined) && (password !== undefined)) {
    if ((typeof username === 'string') && (username !== '')) {
      if ((typeof password === 'string') && (password !== '')) {
        let user;
        try {
          user = await prisma.user.findUnique({
            where: {
              username: username
            }
          });
          if (user !== null) {
            const hashedPassword = user.password;
            try {
              const isMatch = await bcrypt.compare(password ,hashedPassword);
              if (isMatch) {
                const token = jwt.sign(
                  { userId: user.id, username: user.name, },
                  process.env.JWT_SECRET_KEY,
                  {
                    expiresIn: '30d'
                  }
                );
                return res.status(200).json({token});
              } else {
                return res.status(400).json({ message: "Invalid password" });
              }
            } catch (error) {
              console.log('error \n', error);
              return res.status(500).json({ message: "Internal server error" });
            }
          } else {
            return res.status(400).json({message: "Sorry, user not found!"});
          }
        } catch (error) {
          console.log(`Database operation failed \n ${error}`);
          return res.status(500).json({ message: "Database operation failed" });
        }
      } else {
        return res.status(400).json({ message: "400 Bad request" });
      }
    } else {
      return res.status(400).json({ message: "Invalid username" });
    }
  } else {
    return res.status(400).json({ message: "400 Bad request" });
  }
});
export default router;