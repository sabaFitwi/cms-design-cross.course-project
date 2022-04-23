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

const productImageSlide = document.querySelector(".product-image-slider");
const productImages = document.querySelectorAll(".product-small-images img");
const productDetail = document.querySelector("main");

let activeImage = 0;

function getProductsDetail(productUrl) {
  productUrl.forEach(function () {
    const queryString = document.location.search;
    const params = new URLSearchParams(queryString);
    const productId = params.get("id");
    const product = productUrl.find(({ id }) => id == productId);

    productDetail.innerHTML = `  <section class="product-details">
    <div class="product-image-slider image-products"
       style= "background-image: url(${product.images[0].src})"
                                 alt = "${product.name}">
    
      <div class="product-small-images">
        <img src="../images/M16.jpg" alt="Hiking Jacket" class="active" />
        <img src="../images/M15.jpg" alt="Hiking Jacket" />
        <img src="../images/M15.jpg" alt="Hiking Jacket" />
        <img src="../images/M15.jpg" alt="Hiking Jacket" />
      </div>
    </div>
    <div class="detail">
      <h2 class="detail-title">${product.name}</h2>
      <p class="product-short-descrip">${product.short_description}</p>
      <p class="product-price">$500</p>
      <label for="size">Select size:</label>
      <select name="size" id="size">
        <option value="small">S</option>
        <option value="medium">M</option>
        <option value="large">L</option>
        <option value="x-large">XL</option>
      </select>
      <label for="quantity">Qty:</label>
      <input id="quantity" type="number" value="1" />
      <a href="../checkout.html" class="cart">Add to cart</a>
    </div>
  </section>
  <section class="detail-desc">
    <h2 class="desc-heading">description</h2>
    <p class="desc">${product.description}</p>
  </section> 
                        
                      `;
  });
}
getProducts();

productImages.forEach((item, i) => {
  item.addEventListener("click", () => {
    productImages[activeImage].classList.remove("active");
    item.classList.add("active");
    productImageSlide.style.backgroundImage = `url("${item.src}")`;
    activeImage = i;
  });
});
