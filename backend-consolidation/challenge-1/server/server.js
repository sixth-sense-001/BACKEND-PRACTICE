import express from 'express';
import dotenv from 'dotenv';
import { randomUUID } from 'node:crypto';
import students from '../data/data.js';
import addStudentMiddleware from '../middleware/addStudentMiddleware.js';
import filterStudentsMiddleware from '../middleware/filterStudentsMiddleware.js';
import paginationMiddleware from '../middleware/paginationMiddleware.js';
import sortStudentsMiddleware from '../middleware/sortStudentsMiddleware.js';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5001;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to my API');
});

app.get('/about', (req, res) => {
  res.send('This is a simple backend api using nodejs and express.')
});

app.get('/students', paginationMiddleware, sortStudentsMiddleware, filterStudentsMiddleware, (req, res) => {
  const age = Number(req.query.age);
  const name = req.query.name;

  let filteredStudents = []
  filteredStudents = students.filter(student => ((student.age === age) && (student.name === name)));
  console.log(filteredStudents)

  if (filteredStudents.length === 0) {
    return res.status(404).json({ message: `Student with the name and age of ${name} and ${age} respectively could not be found.` });
  } else {
    return res.status(200).json(filteredStudents);
  }
});

app.get('/students/:id', (req, res) => {
  const { id } = req.params;
  const student = students.find(student => {
    return student.id === id;
  });

  if (student) {
    res.json(student);
    console.log(student);
  } else {
    res.status(404).send(`Student with the id ${id} could not be found`);
    console.log('Error! student not found');
  }
});

app.post('/students', addStudentMiddleware, (req, res) => {
  const name = req.body.name;
  const age = Number(req.body.age);
  const id = randomUUID();
  students.push({
    id,
    name,
    age
  });
  console.log(students);
  res.status(201).send('Student successfully registered');
});

app.put('/students/:id', addStudentMiddleware, (req, res) => {
  const { id } = req.params;
  const name = req.body.name;
  const age = Number(req.body.age);

  const index = students.findIndex(student => student.id === id);
  console.log(index);
  if (index === -1) {
    return res.status(404).send({ message: "Student not found." });
  } else {
    console.log(students[index]);
    students[index].name = name;
    students[index].age = age;
    console.log(students);
    res.status(200).send('Student successfully updated!');
  }
});

app.delete('/students/:id', (req, res) => {
  const { id } = req.params;
  const index = students.findIndex(student => student.id === id);
  if (index === -1) {
    return res.status(404).send('Student not found.');
  }
  students.splice(index, 1);
  console.log(students);
  res.status(200).json({ message: 'Student successfully deleted.' });
});

app.listen(PORT, () => {
  console.log(`Server is successfully running on ${PORT}✨🚀`);
});