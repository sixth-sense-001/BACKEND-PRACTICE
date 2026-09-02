export default function addStudentMiddleware(req, res, next) {
  const name = req.body.name;
  const age = req.body.age;

  if ((name === undefined) || (age === undefined)) {
    return res.status(400).json({ message: '400 Bad request' });
  } else {
    if ((typeof name !== "string") || (typeof age !== "number")) {
      return res.status(400).json({ message: '400 Bad request' });
    }
    else if ((typeof name === "string") && (typeof age === "number")) {
      if ((name.trim() === '') || (age > 120)) {
        return res.status(400).json({ message: '400 Bad request' });
      } else if ((name.trim() !== '') && (age <= 120)) {
        next();
      }
      else {
        return res.status(400).json({ message: "400 Bad request." });
      }
    } else {
      return res.status(400).json({ message: "400 Bad request." });
    }
  }
}