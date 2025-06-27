const products = [
  {
    id: 1,
    name: "PE T-Shirt - Small",
    stock: 2,
    threshold: 5,
    supplierEmail: "supplier@example.com"
  },
  {
    id: 2,
    name: "PE Shorts - Medium",
    stock: 7,
    threshold: 5,
    supplierEmail: "supplier@example.com"
  },
  {
    id: 3,
    name: "School Polo - Large",
    stock: 1,
    threshold: 5,
    supplierEmail: "supplier@example.com"
  }
];

const container = document.getElementById("product-container");

function renderProducts() {
  container.innerHTML = "";

  products.forEach((product, index) => {
    const card = document.createElement("div");
    card.className = "product-card";

    const info = document.createElement("div");
    info.className = "product-info";
    info.innerHTML = `
      <h2>${product.name}</h2>
      <p>Stock: ${product.stock}</p>
      ${product.stock < product.threshold ? `<p class="low-stock">Low Stock!</p>` : ""}
    `;

    const btns = document.createElement("div");

    if (product.stock < product.threshold) {
      const emailBtn = document.createElement("button");
      emailBtn.className = "notify-btn";
      emailBtn.innerText = "Notify Supplier";
      emailBtn.onclick = () => {
        const subject = encodeURIComponent(`Restock Needed: ${product.name}`);
        const body = encodeURIComponent(`Hello Supplier,\n\nPlease deliver more stock for:\n\nProduct: ${product.name}\nCurrent Stock: ${product.stock}\n\nThank you.`);
        window.location.href = `mailto:${product.supplierEmail}?subject=${subject}&body=${body}`;
      };
      btns.appendChild(emailBtn);
    }

    const restockBtn = document.createElement("button");
    restockBtn.className = "restock-btn";
    restockBtn.innerText = "Receive Stock";
    restockBtn.onclick = () => {
      product.stock += 10; // Simulate receiving 10 new items
      renderProducts();
    };
    btns.appendChild(restockBtn);

    card.appendChild(info);
    card.appendChild(btns);
    container.appendChild(card);
  });
}

window.onload = renderProducts;
