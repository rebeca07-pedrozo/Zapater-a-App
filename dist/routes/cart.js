import { Router } from "express";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
const router = Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataPath = path.resolve(__dirname, "../data/data.json");
const dataDir = path.dirname(dataPath);
// ✅ Asegura que el archivo data.json exista
async function ensureDataFile() {
    try {
        await fs.mkdir(dataDir, { recursive: true });
        try {
            await fs.access(dataPath);
        }
        catch {
            await fs.writeFile(dataPath, JSON.stringify({ cart: [] }, null, 2));
        }
    }
    catch (err) {
        console.error("Error asegurando data.json:", err);
    }
}
// ✅ Lee el carrito guardado
async function readData() {
    try {
        const raw = await fs.readFile(dataPath, "utf-8");
        return JSON.parse(raw);
    }
    catch {
        return { cart: [] };
    }
}
// ✅ Guarda los cambios del carrito
async function saveData(data) {
    await fs.writeFile(dataPath, JSON.stringify(data, null, 2));
}
// Catálogo de productos (como referencia para validar)
const catalog = [
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
// ✅ Obtener carrito
router.get("/", async (_req, res) => {
    await ensureDataFile();
    const data = await readData();
    res.json(data.cart || []);
});
// ✅ Agregar producto al carrito
router.post("/add", async (req, res) => {
    await ensureDataFile();
    const { productId, qty } = req.body;
    if (typeof productId !== "number" || typeof qty !== "number") {
        return res.status(400).json({ error: "Los datos deben ser numéricos (productId, qty)" });
    }
    if (qty <= 0) {
        return res.status(400).json({ error: "La cantidad debe ser mayor que cero" });
    }
    const product = catalog.find((p) => p.id === productId);
    if (!product) {
        return res.status(400).json({ error: "El producto no existe en el catálogo" });
    }
    const data = await readData();
    const cart = data.cart || [];
    const existing = cart.find((i) => i.id === productId);
    // 👇 Aquí agregamos también la imagen del producto
    if (existing) {
        existing.qty += qty;
    }
    else {
        cart.push({
            id: productId,
            name: product.name,
            price: product.price,
            image: product.image,
            qty
        });
    }
    data.cart = cart;
    await saveData(data);
    res.json({ message: "Producto agregado correctamente", cart });
});
// ✅ Eliminar producto del carrito
router.post("/remove", async (req, res) => {
    await ensureDataFile();
    const { productId, qty } = req.body;
    if (typeof productId !== "number" || typeof qty !== "number") {
        return res.status(400).json({ error: "Los datos deben ser numéricos (productId, qty)" });
    }
    if (qty <= 0) {
        return res.status(400).json({ error: "La cantidad debe ser mayor que cero" });
    }
    const data = await readData();
    const cart = data.cart || [];
    const existing = cart.find((i) => i.id === productId);
    if (!existing) {
        return res.status(400).json({ error: "El producto no se encuentra en el carrito" });
    }
    existing.qty -= qty;
    if (existing.qty <= 0) {
        const index = cart.indexOf(existing);
        cart.splice(index, 1);
    }
    data.cart = cart;
    await saveData(data);
    res.json({ message: "Producto eliminado correctamente", cart });
});
// ✅ Vaciar carrito
router.post("/clear", async (_req, res) => {
    await ensureDataFile();
    await saveData({ cart: [] });
    res.json({ ok: true });
});
// ✅ Calcular total
router.get("/total", async (_req, res) => {
    await ensureDataFile();
    const data = await readData();
    const total = (data.cart || []).reduce((acc, item) => acc + item.price * item.qty, 0);
    res.json({ total });
});
export default router;
