import students from '../data/data.js';

export default function sortStudentsMiddleware(req, res, next) {
  const sortCriteria = req.query.sort;
  const order = req.query.order;

  if((sortCriteria !== undefined) && (order !== undefined)) {
    const sortedStudents = students.slice();
    if(sortCriteria === 'name') {
      if (order === 'asc') {
        sortedStudents.sort((a,b) => a.name.localeCompare(b.name));
        return res.status(200).json(sortedStudents);
      } else if (order === 'desc') {
        sortedStudents.sort((a,b) => b.name.localeCompare(a.name));
        return res.status(200).json(sortedStudents);
      } else {
        return res.status(400).json({message:"400 Bad request"});
      }
    } else if (sortCriteria === 'age') {
      if(order === 'asc') {
        sortedStudents.sort((a,b) => a.age - b.age);
        return res.status(200).json(sortedStudents);
      } else if(order === 'desc') {
        sortedStudents.sort((a,b) => b.age - a.age);
        return res.status(200).json(sortedStudents);
      } else {
        return res.status(400).json({message:'400 Bad request'});
      }
    } else {
      return res.status(400).json({message: "400 Bad request"});
    }
  } else if ((sortCriteria !== undefined) && (order === undefined)) {
    const sortedStudents = students.slice();
    if(sortCriteria === 'name') {
      sortedStudents.sort((a,b) => a.name.localeCompare(b.name));
      return res.status(200).json(sortedStudents);
    } else if (sortCriteria === 'age') {
      sortedStudents.sort((a,b) => a.age - b.age);
      return res.status(200).json(sortedStudents);
    } else {
      return res.status(400).json({message: "400 Bad request"});
    }
  } else {
    next();
  }
}