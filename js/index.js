const productsContainer = document.querySelector(".all-product");
const cartInfo = document.querySelector(".cart-info");
export const url = "https://lifeofsea.de/wp-json/wc/store/products";

export async function getProducts() {
  productsContainer.innerHTML = `<div class="spinner"></div>`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    const dataJson = data;
    generateHtml(dataJson);
  } catch (error) {
    ("Unexpected error occurred");
  }
  productsContainer.innerHTML = displayError;
  productsContainer.classList.add("error");
}

let cartArray = [];

function generateHtml(results) {
  productsContainer.innerHTML = "";

  if (results) {
    results.forEach(function (result) {
      let price = Number(result.prices.price.replace("$", " ") * 0.01).toFixed(
        2
      );
      productsContainer.innerHTML += `<div class = "products">
      <a href="products/hiking-jacket.html?id=${result.id}"
      ><div style= "background-image: url(${result.images[0].src})" class="image-products" alt = "${result.category}"></div></a>
                                          <h4>${result.name}</h4>
                                          <p>$ ${price}</p>
                                          <button class="cart cart-index" data-result="${result.id}" >Add to cart</button>
                                     </div>`;
    });
  } else {
    productsContainer.classList.remove("error");
  }
  getCartItem(results);
}

export function getCartItem(results) {
  const addToCart = document.querySelectorAll(".cart");
  for (let i = 0; i < addToCart.length; i++) {
    addToCart[i].addEventListener("click", (event) => {
      if (
        cartArray.some((result) => result.id == event.target.dataset.result)
      ) {
        alert("product is already in the cart");
      } else {
        const itemToAdd = results.find(
          (product) => product.id == event.target.dataset.result
        );
        cartArray.push(itemToAdd);
        cartInfo.innerHTML = cartArray.length;

        localStorage.setItem("cartItem", JSON.stringify(cartArray));
      }
    });
  }
}
getProducts();
