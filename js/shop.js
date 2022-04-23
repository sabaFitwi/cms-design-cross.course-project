const productsContainer = document.querySelector(".all-product");
const url = "http://lifeofsea.de/wp-json/wc/store/products";

export async function getProducts(url) {
  // productsContainer.innerHTML = `<div class="spinner"></div>`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    generateHtml(data);
  } catch (error) {
    ("Unexpected error occurred");
  }
  // productsContainer.innerHTML = displayError;
  // productsContainer.classList.add("error");
}

let cartArray = [];

function generateHtml(results) {
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
                                          <button class="cart" data-result="${result.id}" >Add to cart</button>
                                     </div>`;
    });
  } else {
    productsContainer.classList.remove("error");
  }
  const categories = document.querySelectorAll(".categories");

  categories.forEach(function (category) {
    category.onclick = function (event) {
      console.log(event);
      let newUrl;
      if (event.target.id === "all") {
        newUrl = url;
        console.log(newUrl);
      }

      const selectedCategory = event.target.value;
      newUrl = url + `?categories=${selectedCategory}`;
    };
  });
}
getProducts(url);
