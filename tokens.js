import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const header = req.headers["authorization"];
  if (!header) return res.status(403).json({ message: "Token no proporcionado" });

  const token = header.split(" ")[1];
  jwt.verify(token, "secreto123", (err, decoded) => {
    if (err) return res.status(401).json({ message: "Token inválido o expirado" });
    req.user = decoded;
    next();
  });
};
export default verifyToken;

