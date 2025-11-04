// Formatear precios en COP
const fmt = (n) => n.toLocaleString("es-CO", { style: "currency", currency: "COP" });

let allProducts = []; // guardará todos los productos cargados

// Renderizar productos (con o sin filtro)
function renderProducts(products) {
  const list = document.getElementById("product-list");

  if (products.length === 0) {
    list.innerHTML = `<p class="text-center text-muted">No se encontraron productos que coincidan.</p>`;
    return;
  }

  list.innerHTML = products
    .map(
      (p) => `
    <div class="col-12 col-sm-6 col-lg-4">
      <div class="card h-100 shadow-sm">
        <img src="${p.image}" class="card-img-top" alt="${p.name}">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${p.name}</h5>
          <p class="text-muted mb-2">${p.description}</p>
          <p class="fw-bold">${fmt(p.price)}</p>
          <div class="mt-auto d-flex gap-2">
            <button class="btn btn-primary" data-id="${p.id}" data-qty="1">Agregar</button>
            <a href="/cart.html" class="btn btn-outline-secondary">Ver carrito</a>
          </div>
        </div>
      </div>
    </div>
  `
    )
    .join("");

  // Eventos de agregar al carrito
  list.querySelectorAll("button[data-id]").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const productId = Number(btn.dataset.id);
      const qty = Number(btn.dataset.qty);
      await fetch("/api/cart/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, qty }),
      });
      updateCartCount();
    });
  });
}

// Cargar productos del backend
async function loadProducts() {
  const res = await fetch("/api/products");
  allProducts = await res.json();
  renderProducts(allProducts);
  updateCartCount();
}

// Actualizar cantidad del carrito
async function updateCartCount() {
  const res = await fetch("/api/cart");
  const cart = await res.json();
  const count = cart.reduce((acc, i) => acc + i.qty, 0);
  document.getElementById("cart-count").textContent = String(count);
}

// 🔍 Filtro de búsqueda por nombre y rango de precios
document.getElementById("search-form").addEventListener("submit", (e) => {
  e.preventDefault();

  const nameTerm = document.getElementById("search-name").value.toLowerCase();
  const min = Number(document.getElementById("min-price").value) || 0;
  const max = Number(document.getElementById("max-price").value) || Infinity;

  const filtered = allProducts.filter((p) => {
    const matchesName = p.name.toLowerCase().includes(nameTerm);
    const matchesPrice = p.price >= min && p.price <= max;
    return matchesName && matchesPrice;
  });

  renderProducts(filtered);
});

loadProducts();
