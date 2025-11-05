import express from "express";
import cors from "cors";
import cookieSession from "cookie-session";
import path from "path";
import productsRouter from "./routes/products.js";
import cartRouter from "./routes/cart.js";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(cookieSession({
  name: "session",
  keys: ["supersecret"],
  maxAge: 24 * 60 * 60 * 1000,
}));

// 👇 ESTA LÍNEA ES CLAVE
app.use(express.static(path.join(process.cwd(), "public")));

// Rutas de API
app.use("/api/products", productsRouter);
app.use("/api/cart", cartRouter);

// 👇 Para cargar index.html al entrar a "/"
app.get("/", (_req, res) => {
  res.sendFile(path.join(process.cwd(), "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`);
});
