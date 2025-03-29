import { getCartItem } from './index.js';
const productsContainer = document.querySelector('.all-product');
const url = 'http://rainydays.local/wp-json/wc/store/products';

export async function getProducts(url) {
  // productsContainer.innerHTML = `<div class="spinner"></div>`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    generateHtml(data);
  } catch (error) {
    ('Unexpected error occurred');
  }
  // productsContainer.innerHTML = displayError;
  // productsContainer.classList.add("error");
}

let cartArray = [];

function generateHtml(results) {
  if (results) {
    results.forEach(function (result) {
      let price = Number(result.prices.price.replace('$', ' ') * 0.01).toFixed(
        2
      );

      productsContainer.innerHTML += `<div class=" all products" data-category="${result.category}>
      <a href="products/hiking-jacket.html?id=${result.id}"
      ><div style= "background-image: url(${result.images[0].src})" class="image-products" alt = "${result.category}"></div></a>
                                          <h4>${result.name}</h4>
                                          <p>$ ${price}</p>
                                          <button class="cart" data-result="${result.id}" >Add to cart</button>
                                     </div>`;
    });
  } else {
    productsContainer.classList.remove('error');
  }
  const newCardBody = document.querySelectorAll(' .all ');
  filterBlog(newCardBody);
  getCartItem(results);
  // const categories = document.querySelectorAll(".categories");

  // categories.forEach(function (category) {
  //   category.onclick = function (event) {
  //     console.log(event);
  //     let newUrl;
  //     if (event.target.id === "all") {
  //       newUrl = url;
  //       console.log(newUrl);
  //     }

  //     const selectedCategory = event.target.value;
  //     newUrl = url + `?categories=${selectedCategory}`;
  //   };
  // });
}
const categoryButtons = document.querySelectorAll('.category');
function filterBlog(newCardBody) {
  categoryButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
      for (let i = 0; i < categoryButtons.length; i++) {
        categoryButtons[i].classList.remove('active');
      }
      button.classList.add('active');
      let dataFilter = event.target.dataset.tag;
      for (let k = 0; k < newCardBody.length; k++) {
        const blockCategory = newCardBody[k].getAttribute('data-category');
        if (blockCategory == dataFilter || dataFilter == 'all') {
          newCardBody[k].style.display = 'block';
        } else {
          newCardBody[k].style.display = 'none';
        }
      }
    });
  });
}

getProducts(url);
