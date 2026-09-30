export default function validateTaskMiddleware(req, res, next) {
  const title = req.body.title;
  const description = req.body.description;
  const priority = req.body.priority;

  if ((typeof title === "string") && (typeof description === "string")) {
    if ((title.trim() !== "") && (description.trim() !== "")) {
      if (typeof priority === "string") {
        if ((priority.trim() === 'low') || (priority.trim() === 'medium') || (priority.trim() === 'high')) {
          next();
        } else {
          return res.status(400).json({ message: "400 Bad request" });
        }
      } else {
        return res.status(400).json({ message: "400 Bad request" });
      }
    } else {
      return res.status(400).json({message:"400 Bad request"});
    }
  } else {
    return res.status(400).json({ message: "400 Bad request" });
  }

}