import { Router } from "express";
import type { Product } from "../types/index.d.js";

const router = Router();

const catalog: Product[] = [
  { id: 1, name: "Runner Azul", price: 199999, image: "/img/shoe_1.png", description: "Zapatilla ligera para correr, malla transpirable.", stock: 12 },
  { id: 2, name: "Classic Rojo", price: 149999, image: "/img/shoe_2.png", description: "Clásico urbano para uso diario.", stock: 24 },
  { id: 3, name: "Eco Verde", price: 179999, image: "/img/shoe_3.png", description: "Materiales reciclados, cómodo y resistente.", stock: 8 },
  { id: 4, name: "Urban Naranja", price: 159999, image: "/img/shoe_4.png", description: "Estilo urbano con suela de alta tracción.", stock: 16 },
  { id: 5, name: "Sport Morado", price: 189999, image: "/img/shoe_5.png", description: "Para entrenamientos de alto rendimiento.", stock: 10 },
  { id: 6, name: "Trail Gris", price: 209999, image: "/img/shoe_6.png", description: "Ideal para montaña y terrenos irregulares.", stock: 7 },
  { id: 7, name: "Aurora Blanco", price: 169999, image: "/img/shoe_7.png", description: "Diseño minimalista con suela flexible.", stock: 15 },
  { id: 8, name: "Noir Elegance", price: 229999, image: "/img/shoe_8.png", description: "Zapato formal negro con acabado premium.", stock: 9 },
  { id: 9, name: "Comet Rosa", price: 159999, image: "/img/shoe_9.png", description: "Estilo moderno con amortiguación ligera.", stock: 11 },
];

router.use((req, _res, next) => {
  if (!req.session!.cart) req.session!.cart = [];
  next();
});

router.get("/", (req, res) => {
  res.json(req.session!.cart);
});

router.post("/add", (req, res) => {
  const { productId, qty } = req.body;
  const product = catalog.find(p => p.id === productId);
  if (!product) return res.status(404).json({ error: "Producto no encontrado" });

  const cart = req.session!.cart!;
  const existing = cart.find((i: any) => i.id === productId);
  if (existing) existing.qty += qty;
  else cart.push({ id: productId, name: product.name, price: product.price, qty });

  req.session!.cart = cart;
  res.json(cart);
});

router.post("/clear", (req, res) => {
  req.session!.cart = [];
  res.json({ ok: true });
});

router.get("/total", (req, res) => {
  const cart = req.session!.cart || [];
  const total = cart.reduce((acc: number, item: any) => acc + item.price * item.qty, 0);
  res.json({ total });
});

export default router;
