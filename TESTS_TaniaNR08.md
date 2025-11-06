# Informe de pruebas y entrega — TaniaNR08

**Repositorio original:** https://github.com/rebeca07-pedrozo/Zapater-a-App  
**Mi fork / repo:** https://github.com/TaniaNR08/Zapater-a-App  
**Rama creada:** `TaniaNR08-tests`  
**Fecha:** 2025-11-05

---

## Resumen
Se clonó el proyecto, se instalaron dependencias, se levantó el servidor y se ejecutaron las 10 pruebas funcionales solicitadas sobre el sistema de carrito y los endpoints de la API.

---

## Comandos ejecutados
git checkout main  
git pull origin main  
git checkout -b TaniaNR08-tests  
npm install  
npm run dev  
curl http://localhost:3000/api/products  
curl -X POST http://localhost:3000/api/cart/add -H "Content-Type: application/json" -d "{\"productId\": 1, \"qty\": 2}"  
curl http://localhost:3000/api/cart  
curl http://localhost:3000/api/cart/total  
curl -X POST http://localhost:3000/api/cart/remove -H "Content-Type: application/json" -d "{\"productId\": 1, \"qty\": 1}"  
curl -X POST http://localhost:3000/api/cart/clear  
curl http://localhost:3000/api/cart  
curl -X POST http://localhost:3000/api/cart/add -H "Content-Type: application/json" -d "{\"productId\": 999, \"qty\": 1}"  
curl -X POST http://localhost:3000/api/cart/add -H "Content-Type: application/json" -d "{\"productId\": 2, \"qty\": 1}"  
curl -X POST http://localhost:3000/api/cart/add -H "Content-Type: application/json" -d "{\"productId\": 3, \"qty\": 2}"  
curl http://localhost:3000/api/cart/total  

---

## Resultados de las pruebas

Todo correcto:  
API responde a todos los endpoints  
Manejo de errores validado  
Carrito se actualiza correctamente  
Total calculado con precisión

---

**Firmado:**  
TaniaNR08



# Comandos usados para la parte de seguridad 