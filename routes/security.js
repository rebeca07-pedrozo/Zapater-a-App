import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import verifyToken from "../middlewares/verifyToken.js";

const router = express.Router();
const users = [];

// 1️⃣ Registro de usuario
router.post("/register", async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ email, password: hashedPassword });
  console.log(`Usuario registrado: ${email}, hash: ${hashedPassword}`);
  res.json({ message: "Usuario registrado exitosamente" });
});

// 2️⃣ Login y generación de token JWT
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = users.find((u) => u.email === email);
  if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) return res.status(401).json({ message: "Contraseña incorrecta" });

  const token = jwt.sign({ email }, "secreto123", { expiresIn: "1h" });
  res.json({ message: "Login exitoso", token });
});

// 3️⃣ Ruta protegida con middleware
router.get("/profile", verifyToken, (req, res) => {
  res.json({
    message: "Acceso permitido al perfil protegido",
    user: req.user,
  });
});

// 4️⃣ Logout (simulado)
router.post("/logout", (req, res) => {
  res.json({ message: "Sesión cerrada correctamente (token invalidado en cliente)" });
});

export default router;

