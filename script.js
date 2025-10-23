const products = [
  { id: 1, name: "T-Shirt", price: 499, img: "t-shirt.avif" },
  { id: 2, name: "Jeans", price: 999, img: "jeans.avif" },
  { id: 3, name: "Sneakers", price: 1499, img: "sneaker.avif" },
  { id: 4, name: "Cap", price: 299, img: "cap.avif" },
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const productList = document.getElementById("product-list");
const cartItems = document.getElementById("cart-items");
const cartCount = document.getElementById("cart-count");
const cartTotal = document.getElementById("cart-total");
const checkoutBtn = document.getElementById("checkout-btn");

function renderProducts() {
  productList.innerHTML = "";
  products.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${product.img}" alt="Product Image">
      <h3>${product.name}</h3>
      <p>₹${product.price}</p>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;
    productList.appendChild(card);
  });
}

function addToCart(id) {
  const product = products.find(p => p.id === id);
  const existing = cart.find(item => item.id === id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  saveAndRenderCart();
}

function removeItem(id) {
  cart = cart.filter(item => item.id !== id);
  saveAndRenderCart();
}

function saveAndRenderCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

function renderCart() {
  cartItems.innerHTML = "";
  let total = 0;
  let count = 0;

  cart.forEach(item => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${item.name} x ${item.qty} = ₹${item.price * item.qty} 
      <button onclick="removeItem(${item.id})">Remove</button>
    `;
    cartItems.appendChild(li);

    total += item.price * item.qty;
    count += item.qty;
  });

  cartCount.textContent = count;
  cartTotal.textContent = total;
}

checkoutBtn.addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Cart is empty!");
    return;
  }
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  alert(`Order Placed! Total Amount: ₹${totalPrice}`);
  cart = [];
  saveAndRenderCart();
});

renderProducts();
renderCart();
