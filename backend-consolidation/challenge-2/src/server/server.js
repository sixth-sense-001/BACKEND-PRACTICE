import express from 'express';
import dotenv from 'dotenv';
import crypto from 'node:crypto';
// import tasks from '../public/data/tasks.js';
import validateTaskMiddleware from '../middleware/validateTaskMiddleware.js';
import authRoutes from '../routes/authRoutes.js';
import authenticateMiddleware from '../middleware/authenticateMiddleware.js';
import prisma from '../lib/prismaClient.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());

app.get('/tasks', async (req, res) => {
  const tasks = await prisma.task.findMany();
  return res.status(200).json(tasks);
});

app.get('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  const tasks = await prisma.task.findMany();
  const task = tasks.find(taskInstance => taskInstance.id === id);
  if (task) {
    return res.status(200).json(task);
  } else {
    return res.status(404).json({ message: "Sorry, task not found!" });
  }
});

app.post('/tasks', validateTaskMiddleware, async (req, res) => {

  const title = req.body.title;
  const description = req.body.description;
  const priority = req.body.priority;
  const userId = req.body.userId;

  const newTask = {
    title,
    description,
    priority,
    status: 'pending',
    userId
  }

  const task = await prisma.task.create({
    data: newTask
  });

  console.log(task);

  return res.status(201).json({message: "New task created!"});

});

app.put('/tasks/:id', async (req, res) => {
  const id = Number(req.params.id);
  const tasks = await prisma.task.findMany();
  const index = tasks.findIndex(task => task.id === id);
  if (index !== -1) {
    const title = req.body.title;
    const description = req.body.description;
    const priority = req.body.priority;
    const status = req.body.status;
    if(title !== undefined) {
      if((typeof title === 'string')&&(title !== '')) {
        const task = await prisma.task.update({
          where: {
            id: id
          },
          data: {
            title: title.trim()
          }
        });
        // tasks[index].title = title.trim();
      } else {
        return res.status(400).json({message: "400 Bad request"});
      }
    } 
    if(description !== undefined) {
      if((typeof description === 'string') && (description !== '')) {
        const task = await prisma.task.update({
          where: {
            id: id
          },
          data: {
            description: description.trim()
          }
        });
        // tasks[index].description = description.trim();
      } else {
        return res.status(400).json({message: "400 Bad request"});
      }
    }
    if(priority !== undefined) {
      if((typeof priority === 'string') && (priority.trim() !== '')) {
        if((priority.trim() === 'high') || (priority.trim() === 'medium') || (priority.trim() === 'low')) {
          const task = await prisma.task.update({
            where: {
              id: id
            },
            data: {
              priority: priority.trim()
            }
          });
          // tasks[index].priority = priority.trim();
        } else {
          return res.status(400).json({message: "400 Bad request"});
        }
      } else {
        return res.status(400).json({message: "400 Bad request"});
      }
    }
    if(status !== undefined) {
      if(status.trim() === tasks[index].status) {
        return res.status(400).json({message: "Please select a valid status and then try again"});
      }
      if(((status.trim() === 'in-progress')&& (tasks[index].status === 'pending')) || ((status.trim() === 'completed')&&(tasks[index].status === 'in-progress'))) {
        const task = await prisma.task.update({
          where: {
            id: id
          },
          data: {
            status: status
          }
        });
        // tasks[index].status = status.trim();
      } else if (status.trim() === 'pending') {
        return res.status(400).json({message: "Can not set the status of a property to pending after its creation!"});
      } else {
        return res.status(400).json({message: "400 Bad request"});
      }
    }
    const tasks = await prisma.task.findMany();
    if ((title !== undefined) || (description!==undefined) || (priority!== undefined) || (status!==undefined)) {
      console.log(tasks);
      return res.status(200).json({message: "Task successfully updated"});
    } else {
      console.log(tasks);
      return res.status(400).json({message: "400 Bad request"})
    }
  } else {
    return res.status(404).json({message: "Sorry, the task with the given id doesnot exist."});
  }
});

app.delete('/tasks/:id', (req, res) => {
  const { id } = req.params
  if(id) {
    const index = tasks.findIndex(task => task.id === id);
    if(index !== -1) {
      tasks.splice(index, 1);
      console.log(tasks);
      return res.status(200).json({message: "Task has been successfully deleted"});
    } else {
      return res.status(404).json({message: "Task with the given id could not be found!"});
    }
  } else {
    return res.status(400).json({message: "400 Bad request"});
  }
});

app.use('/auth',authRoutes);

app.get('/profile', authenticateMiddleware, (req,res) => {
  return res.status(200).json({message: "Hi there this is your profile."});
});

app.listen(PORT, () => {
  console.log(`Server successfully running on ${PORT}🚀✨`);
});