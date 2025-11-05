# Aurora Shoes

Proyecto desarrollado como práctica de **Programación Web**.  
Simula una tienda de calzado con frontend en **Bootstrap + JavaScript** y backend en **Node.js con Express**, incluyendo un carrito de compras funcional con persistencia de datos.

---

## Integrantes

| Nombre completo | Rol |
|------------------|-----|
| **Tania Reyes** | Desarrollo de pruebas |
| **Sara Bernal** | Desarrollo de pruebas |
| **Rebeca Pedrozo** | Desarrollo backend e integración |

---

## Dependencias utilizadas

Las principales dependencias del proyecto son:

```bash
"dependencies": {
  "express": "^4.18.2",
  "cors": "^2.8.5"
},
"devDependencies": {
  "typescript": "^5.3.3",
  "ts-node": "^10.9.1"
}
```


El proyecto se ejecuta en modo desarrollo con:

npm run dev
Rutas principales
Ruta	Método	Descripción
/api/products	GET	Devuelve el catálogo completo de productos.
/api/cart	GET	Devuelve el contenido actual del carrito guardado en data.json.
/api/cart/add	POST	Agrega un producto al carrito (requiere productId y qty).
/api/cart/remove	POST	Elimina o disminuye la cantidad de un producto del carrito.
/api/cart/clear	POST	Vacía completamente el carrito.
/api/cart/total	GET	Calcula y devuelve el total a pagar del carrito.

Todos los datos se guardan temporalmente en src/data/data.json usando el módulo fs.promises para simular persistencia.

**Funcionamiento del carrito e integración front-back**
El frontend (HTML + Bootstrap + JS) muestra el catálogo de productos consumiendo /api/products.
Cada producto tiene un botón “Agregar al carrito”, que envía una petición POST a /api/cart/add.

El backend valida los datos, guarda el carrito en data.json y responde con el estado actualizado.
El carrito de compras (cart.html) carga la información desde /api/cart, mostrando:

- Nombre del producto

- Cantidad

- Precio unitario y subtotal

- Total general del pedido

Al vaciar el carrito o eliminar productos, el frontend vuelve a comunicar los cambios al backend.

Se incluye un Toast visual de Bootstrap que muestra un mensaje “🛒 Producto agregado al carrito”.

**Tecnologías principales**
Frontend: HTML5, Bootstrap 5.3, JavaScript (fetch API, módulos ES)

- Backend: Node.js + Express

- Lenguaje: TypeScript

- Persistencia temporal: JSON (fs.promises)

Diseño: Responsive y minimalista, con colores personalizados

**Ejecución del proyecto**

```
npm install
npm run dev
```
Luego abrir en el navegador:

👉 http://localhost:3000

