import students from '../data/data.js';

export default function filterStudentsMiddleware(req, res, next) {
  let { age, name } = req.query;
  if ((age===undefined) &&  (name===undefined)) {
    return res.status(200).json(students);
  } else if((age!==undefined) && (name===undefined)) {
    age = Number(age);
    if(Number.isNaN(age)) {
      return res.status(400).json({message: "400 Bad request"});
    } else {
      if(age>0) {
        const filteredStudents = students.filter(student => student.age === age);
        if(filteredStudents.length===0) {
          return res.status(404).json({message:`Students with the age of ${age} are not found.`});
        } else {
          return res.status(200).json(filteredStudents);
        }
      } else {
        return res.status(400).json({message: "400 Bad request."});
      }
    }
  } else if((age === undefined) && (name !== undefined)) {
    const nameCopy = Number(name);
    if(!Number.isNaN(nameCopy)) {
      return res.status(400).json({message: "400 Bad Request"});
    } else {
      const filteredStudents = students.filter(student => student.name === name);
      if(filteredStudents.length === 0) {
        return res.status(404).json({message: `Student with the name ${name} is not found.`});
      } else {
        return res.status(200).json(filteredStudents);
      }
    }
  } else {
    age = Number(age);
    let nameCopy = Number(name);

    if((!Number.isNaN(age)) && (Number.isNaN(nameCopy))) {
      if(age<0) {
        return res.status(400).json({message: "400 Bad request."});
      } else {
        next();
      }
    } else {
      return res.status(400).json({message: "400 Bad request"});
    }

  }

}