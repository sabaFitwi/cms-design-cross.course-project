import { url } from "./index.js";

// import { getProducts } from "./index.js";

async function getProducts() {
  try {
    const response = await fetch(url);
    const data = await response.json();

    getProductsDetail(data);
    console.log(data);
  } catch (error) {
    ("Unexpected error occurred");
  }
}

const productDetail = document.querySelector("main");

// let activeImage = 0;
let cartArray = [];

function getProductsDetail(productUrl) {
  productUrl.forEach(function () {
    const queryString = document.location.search;
    const params = new URLSearchParams(queryString);
    const productId = params.get("id");
    const product = productUrl.find(({ id }) => id == productId);
    let price = Number(product.prices.price.replace("$", " ") * 0.01).toFixed(
      2
    );

    productDetail.innerHTML = `  <section class="product-details">
    <div class="product-image-slider image-products"
       style= "background-image: url(${product.images[0].src})"
                                 alt = "${product.name}">
    
      <div class="product-small-images">
        <img src="${product.images[0].src}" alt="Hiking Jacket" data-image=${product.id} class="active small-image" />
        <img src="${product.images[1].src}" alt="Hiking Jacket" class=" small-image" />
        <img src="${product.images[2].src}" alt="Hiking Jacket" class="small-image" />
        <img src="${product.images[3].src}" alt="Hiking Jacket" class=" small-image" />
      </div>
    </div>
    <div class="detail">
      <h2 class="detail-title">${product.name}</h2>
      <p class="product-short-descrip">${product.short_description}</p>
      <p class="product-price">$ ${price}</p>
      <label for="size">Select ${product.variations[0].attributes[0].name}:</label>
      <select name="size" id="size">
        <option value="small">${product.variations[0].attributes[0].value}</option>
        <option value="medium">${product.variations[1].attributes[0].value}</option>
        <option value="large">${product.variations[2].attributes[0].value}</option>
        <option value="x-large">${product.variations[3].attributes[0].value}</option>
      </select>
      <label for="quantity">Qty:</label>
      <input id="quantity" type="number" value="1" />
      <a href="../shopping-cart.html" class="cart" data-result="${product.id}">Add to cart</a>
    </div>
  </section>
  <section class="detail-desc">
    <h2 class="desc-heading">description</h2>
    <p class="desc">${product.description}</p>
  </section> 
                        
                      `;
  });

  const addToCart = document.querySelector(".cart");
  const cartInfo = document.querySelector(".cart-info");
  addToCart.addEventListener("click", (event) => {
    if (cartArray.length >= 1) {
      alert("product is already in the cart");
    } else {
      const itemToAdd = productUrl.find(
        (product) => product.id == event.target.dataset.result
      );
      cartArray.push(itemToAdd);

      cartInfo.innerHTML = cartArray.length;
      console.log(cartArray);

      localStorage.setItem("cartItem", JSON.stringify(cartArray));
    }
  });
}

getProducts();
