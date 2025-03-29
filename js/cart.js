// Initialize cart when page loads
document.addEventListener('DOMContentLoaded', function () {
  updateCartCount();
  createShoppingCart();
});

// Main cart display function
function createShoppingCart() {
  const cartItems = JSON.parse(localStorage.getItem('cartItem')) || [];
  const shoppingCart = document.querySelector('.shopping-cart');

  shoppingCart.innerHTML = '';
  let totalPrice = 0;

  if (cartItems.length === 0) {
    shoppingCart.innerHTML = `
      <div class="empty-cart-message">
        <p>Your shopping cart is empty</p>
      </div>
    `;
    updateOrderSummary(0);
    return;
  }

  cartItems.forEach((item, index) => {
    const price = parseFloat(item.price) || 0;
    const quantity = parseInt(item.quantity) || 1;
    const itemTotal = price * quantity;
    totalPrice += itemTotal;

    shoppingCart.innerHTML += `
      <section class="shipping-details_wrapper" data-id="${
        item.id
      }" data-index="${index}">
        <div class="product-container">
          <div class="checkout-product-image">
            <img src="${
              item.image || item.images[0]?.src || 'images/placeholder.jpg'
            }" alt="${item.name}">
          </div>
          <div class="checkout-product_size">
            <h2 class="title-margin">${item.name}</h2>
            <p class="title-color">${item.short_description || ''}</p>
            <p>Size: ${item.size || 'S'}</p>
          </div>
        </div>
        <div class="quantity">
          <div class="number-input">
            <button class="quantity-btn minus">-</button>
            <input type="number" class="cart-input" value="${quantity}" min="1">
            <button class="quantity-btn plus">+</button>
          </div>
        </div>
        <div class="checkout-product_price">
          <p class="price-bold">$${price.toFixed(2)}</p>
          <p class="item-total">$${itemTotal.toFixed(2)}</p>
          <div class="remove-cart" data-id="${item.id}">
            <i class="fa-regular fa-trash-can"></i>
            <span>Remove</span>
          </div>
        </div>
      </section>
    `;
  });

  updateOrderSummary(totalPrice);
  addCartEventListeners();
}

// Update cart count in header and icon
function updateCartCount() {
  const cartItems = JSON.parse(localStorage.getItem('cartItem')) || [];
  const totalItems = cartItems.reduce(
    (total, item) => total + (item.quantity || 1),
    0
  );

  // Update cart icon
  document.querySelectorAll('.cart-info').forEach((el) => {
    el.textContent = totalItems;
  });

  // Update cart page header
  const cartHeader = document.querySelector('.header-of-cart-page');
  if (cartHeader) {
    cartHeader.innerHTML = `Shopping Cart <span class="inCart-number">(${totalItems})</span>`;
  }
}

// Add event listeners for cart controls
function addCartEventListeners() {
  // Quantity controls
  document.querySelectorAll('.minus').forEach((btn) => {
    btn.addEventListener('click', function (e) {
      const input = e.target.nextElementSibling;
      const newValue = Math.max(1, parseInt(input.value) - 1);
      input.value = newValue;
      updateCartItem(e.target.closest('.shipping-details_wrapper'), newValue);
    });
  });

  document.querySelectorAll('.plus').forEach((btn) => {
    btn.addEventListener('click', function (e) {
      const input = e.target.previousElementSibling;
      input.value = parseInt(input.value) + 1;
      updateCartItem(
        e.target.closest('.shipping-details_wrapper'),
        parseInt(input.value)
      );
    });
  });

  document.querySelectorAll('.cart-input').forEach((input) => {
    input.addEventListener('change', function (e) {
      const value = Math.max(1, parseInt(e.target.value) || 1);
      e.target.value = value;
      updateCartItem(e.target.closest('.shipping-details_wrapper'), value);
    });
  });

  // Remove items
  document.querySelectorAll('.remove-cart').forEach((btn) => {
    btn.addEventListener('click', function (e) {
      const itemId = e.currentTarget.dataset.id;
      removeItemFromCart(itemId);
    });
  });
}

// Update individual cart item
function updateCartItem(itemElement, newQuantity) {
  const cartItems = JSON.parse(localStorage.getItem('cartItem')) || [];
  const itemIndex = parseInt(itemElement.dataset.index);

  if (itemIndex >= 0 && itemIndex < cartItems.length) {
    cartItems[itemIndex].quantity = newQuantity;
    localStorage.setItem('cartItem', JSON.stringify(cartItems));

    const price = parseFloat(cartItems[itemIndex].price);
    const itemTotal = price * newQuantity;
    itemElement.querySelector(
      '.item-total'
    ).textContent = `$${itemTotal.toFixed(2)}`;

    updateOrderSummary(calculateTotalPrice());
    updateCartCount();
  }
}

// Remove item from cart
function removeItemFromCart(itemId) {
  let cartItems = JSON.parse(localStorage.getItem('cartItem')) || [];
  cartItems = cartItems.filter((item) => item.id != itemId);
  localStorage.setItem('cartItem', JSON.stringify(cartItems));
  createShoppingCart();
  updateCartCount();
}

// Calculate total order value
function calculateTotalPrice() {
  const cartItems = JSON.parse(localStorage.getItem('cartItem')) || [];
  return cartItems.reduce((total, item) => {
    return (
      total + (parseFloat(item.price) || 0) * (parseInt(item.quantity) || 1)
    );
  }, 0);
}

// Update order summary section
function updateOrderSummary(totalPrice) {
  const subtotalElement = document.querySelector('.sub-total');
  const grandTotalElement = document.querySelector('.gran-total');

  if (subtotalElement && grandTotalElement) {
    subtotalElement.textContent = `$${totalPrice.toFixed(2)}`;
    grandTotalElement.textContent = `$${totalPrice.toFixed(2)}`;
  }
}
