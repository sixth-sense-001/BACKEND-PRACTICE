import jwt from 'jsonwebtoken';

export default function authenticateMiddleware(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (authHeader) {
    if (authHeader.length > 7) {
      const authHeaderContent = authHeader.split(' ');
      const BEARER = authHeaderContent[0];
      const token = authHeaderContent[1];

      if (BEARER === 'Bearer') {
        console.log(token);
        try {
          const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
          req.user = decoded;
          console.log(decoded);
          next();
        } catch (error) {
          return res.status(400).json({ message: "Your token is invalid or expired" });
        }
      } else {
        return res.status(400).json({message: "400 Bad request"});
      }
    } else {
      return res.status(401).json({ message: "401 Unauthorized" });
    }
  }
  else {
    return res.status(401).json({ message: "401 Unauthorized." });
  }
}