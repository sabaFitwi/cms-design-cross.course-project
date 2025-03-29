const url = 'http://rainydays.local/wp-json/wc/store/products';
const productDetail = document.querySelector('main');
let cartArray = JSON.parse(localStorage.getItem('cartItem')) || [];

// Update cart count on page load
updateCartCount();

async function getProducts() {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    const data = await response.json();
    getProductsDetail(data);
  } catch (error) {
    productDetail.innerHTML = `
      <div class="error-message">
        <h2>Error loading product</h2>
        <p>${error.message}</p>
        <a href="../menProduct.html" class="button">Back to Shop</a>
      </div>
    `;
    console.error('Error:', error);
  }
}

function getProductsDetail(products) {
  const queryString = document.location.search;
  const params = new URLSearchParams(queryString);
  const productId = params.get('id');

  if (!productId) {
    productDetail.innerHTML = `
      <div class="error-message">
        <h2>Product not found</h2>
        <p>No product ID was specified in the URL.</p>
        <a href="../menProduct.html" class="button">Back to Shop</a>
      </div>
    `;
    return;
  }

  const product = products.find(({ id }) => id == productId);

  if (!product) {
    productDetail.innerHTML = `
      <div class="error-message">
        <h2>Product not found</h2>
        <p>No product exists with ID ${productId}.</p>
        <a href="../menProduct.html" class="button">Back to Shop</a>
      </div>
    `;
    return;
  }

  let price = (Number(product.prices.price) * 0.01).toFixed(2);

  // Generate HTML for product images
  let imagesHTML = '';
  if (product.images && product.images.length > 0) {
    imagesHTML = product.images
      .map(
        (img, index) => `
      <img src="${img.src}" alt="${product.name}" 
           class="small-image ${index === 0 ? 'active' : ''}" 
           data-image="${index}" />
    `
      )
      .join('');
  }

  // Generate HTML for size options
  let sizeOptionsHTML = '';
  if (product.variations && product.variations.length > 0) {
    sizeOptionsHTML = product.variations
      .map(
        (variation) => `
      <option value="${variation.attributes[0].value}">
        ${variation.attributes[0].value}
      </option>
    `
      )
      .join('');
  } else {
    // Fallback sizes if no variations exist
    sizeOptionsHTML = `
      <option value="small">Small</option>
      <option value="medium">Medium</option>
      <option value="large">Large</option>
      <option value="x-large">X-Large</option>
    `;
  }

  productDetail.innerHTML = `
    <section class="product-details">
      <div class="product-image-slider image-products"
           style="background-image: url(${
             product.images[0]?.src || '../images/placeholder-jacket.jpg'
           })"
           alt="${product.name}">
        <div class="product-small-images">
          ${imagesHTML}
        </div>
      </div>
      <div class="detail">
        <h2 class="detail-title">${product.name}</h2>
        <p class="product-short-descrip">${
          product.short_description || 'No description available'
        }</p>
        <p class="product-price">$${price}</p>
        <label for="size">Select size:</label>
        <select name="size" id="size">
          ${sizeOptionsHTML}
        </select>
        <label for="quantity">Qty:</label>
        <input id="quantity" type="number" value="1" min="1" />
        <button class="cart" data-result="${product.id}">Add to cart</button>
      </div>
    </section>
    <section class="detail-desc">
      <h2 class="desc-heading">description</h2>
      <p class="desc">${
        product.description || 'No detailed description available'
      }</p>
    </section>
  `;

  // Add event listeners for image thumbnails
  const smallImages = document.querySelectorAll('.small-image');
  const mainImage = document.querySelector('.product-image-slider');

  smallImages.forEach((img) => {
    img.addEventListener('click', () => {
      // Remove active class from all images
      smallImages.forEach((i) => i.classList.remove('active'));
      // Add active class to clicked image
      img.classList.add('active');
      // Update main image
      mainImage.style.backgroundImage = `url(${img.src})`;
    });
  });

  // Add to cart functionality
  const addToCart = document.querySelector('.cart');
  addToCart.addEventListener('click', (event) => {
    const quantity = parseInt(document.getElementById('quantity').value);
    const size = document.getElementById('size').value;

    // Check if product already exists in cart with same size
    const existingItemIndex = cartArray.findIndex(
      (item) => item.id == productId && item.size === size
    );

    if (existingItemIndex >= 0) {
      // Update quantity if already in cart
      cartArray[existingItemIndex].quantity += quantity;
      alert(`Updated quantity for ${product.name} (${size}) in cart`);
    } else {
      // Add new item to cart
      const itemToAdd = {
        id: product.id,
        name: product.name,
        price: price,
        image: product.images[0]?.src || '../images/placeholder-jacket.jpg',
        size: size,
        quantity: quantity,
      };
      cartArray.push(itemToAdd);
      alert(`${quantity} ${product.name} (${size}) added to cart`);
    }

    // Update cart in localStorage and UI
    localStorage.setItem('cartItem', JSON.stringify(cartArray));
    updateCartCount();
  });
}

function updateCartCount() {
  const cartInfoElements = document.querySelectorAll('.cart-info');
  const totalItems = cartArray.reduce((sum, item) => sum + item.quantity, 0);

  cartInfoElements.forEach((element) => {
    element.textContent = totalItems;
  });
}

getProducts();
