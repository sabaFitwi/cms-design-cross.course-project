import { url } from "./index.js";

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const productId = params.get("id");
const products = url;
const findProducts = products.find(({ id }) => id == productId);
console.log(productId);

`  <!-- <div class="product-detail_image">
<div class="product_small-image">
  <img
    src="../images/M15.jpg"
    alt="Hiking Jackets for Men's"
    id="mainImage"
  />
</div>
<div class="single-product">
  <img
    src="../images/M16.jpg"
    alt="Hiking Jacket"
    class="product_small-image smallImage"
  />
  <img
    src="../images/M15.jpg"
    alt="Hiking Jacket"
    class="product_small-image smallImage"
  />
  <img
    src="../images/M15.jpg"
    alt="Hiking Jacket"
    class="product_small-image smallImage"
  />
</div>
</div>
<div class="product-specific_detail quantity">
<div>
  <h1>Men's Hiking Jacket Blue Color</h1>
  <p>jacket 101 #213465</p>
</div>
<p class="product-specific_price">$500</p>
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
</div>-->`;
