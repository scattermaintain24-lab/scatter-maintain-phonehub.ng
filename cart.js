// cart.js

// Initialize cart from localStorage or empty array
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// -------------------------------
// UPDATE CART COUNT (TOP ICON)
// -------------------------------
function updateCartCount() {
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartCount = document.getElementById('cart-count');
  if (cartCount) {
    cartCount.textContent = count;
  }
}

// -------------------------------
// ADD TO CART
// -------------------------------
function addToCart(name, price, image) {
  const existing = cart.find(item => item.name === name);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ name, price, quantity: 1, image });
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();   // ✅ VERY IMPORTANT
  alert(`${name} added to cart!`);
}

// -------------------------------
// DISPLAY CART ITEMS (cart.html)
// -------------------------------
function displayCart() {
  const cartTable = document.getElementById('cart-table-body');
  if (!cartTable) return;

  cartTable.innerHTML = '';
  let totalPrice = 0;

  cart.forEach(item => {
    const itemTotal = item.price * item.quantity;
    totalPrice += itemTotal;

    const row = document.createElement('tr');
    row.innerHTML = `
      <td>
        <img src="${item.image}" alt="${item.name}" width="60"><br>
        ${item.name}
      </td>
      <td>₦${item.price.toLocaleString()}</td>
      <td>
        <input type="number" min="1" value="${item.quantity}"
        onchange="updateQuantity('${item.name}', this.value)">
      </td>
      <td>₦${itemTotal.toLocaleString()}</td>
    `;
    cartTable.appendChild(row);
  });

  document.getElementById('cart-total').innerText =
    `₦${totalPrice.toLocaleString()}`;

  updateCartCount(); // ✅ keep count correct
}

// -------------------------------
// UPDATE QUANTITY
// -------------------------------
function updateQuantity(name, qty) {
  const product = cart.find(item => item.name === name);
  product.quantity = parseInt(qty);
  localStorage.setItem('cart', JSON.stringify(cart));
  displayCart();
}

// -------------------------------
// CLEAR CART
// -------------------------------
function clearCart() {
  cart = [];
  localStorage.setItem('cart', JSON.stringify(cart));
  displayCart();
  updateCartCount();
}

// -------------------------------
// RUN ON PAGE LOAD
// -------------------------------
window.onload = function () {
  displayCart();
  updateCartCount();
};




<script>
function searchProducts() {
  const input = document.getElementById("searchInput");
  const filter = input.value.toLowerCase();
  const products = document.getElementsByClassName("product-card");

  for (let i = 0; i < products.length; i++) {
    const name = products[i].getElementsByTagName("h3")[0];
    const text = name.textContent || name.innerText;

    if (text.toLowerCase().includes(filter)) {
      products[i].style.display = "";
    } else {
      products[i].style.display = "none";
    }
  }
}
</script>
