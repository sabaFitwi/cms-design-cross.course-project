function createShoppingCart() {
  const cartItems = JSON.parse(localStorage.getItem("cartItem"));
  console.log(cartItems);

  const shoppingCart = document.querySelector(".shopping-cart");
  const orderSummary = document.querySelector(".order-summary-wrapper");
  const headerOfCartPage = document.querySelector(".header-of-cart-page");
  const cart = document.querySelector(".cart-info");

  let totalUnitPrice = 0;
  cartItems.forEach(function (item) {
    let price = Number(item.prices.price.replace("$", " ") * 0.01);
    totalUnitPrice += price;

    shoppingCart.innerHTML += `<section class="shipping-details_wrapper">
            <div class="shopping-cart_checkbox">
              <input type="checkbox" />
            </div>
            <div class="checkout-product-image">
              <h3 class="title">product</h3>
              <div><img src="${item.images[0].src}"
                          alt = "${item.name}"/></div>
                    </div>
            </div>
            <div class="checkout-product_size">
              <h3 class="title">detail</h3>
              <h2 class="title-margin">${item.name}</h2>
              <p  class="title-color">${item.short_description}</p>
              <p>Size : S</p>
            </div>
            <div class="quantity">
              <h3 class="title">quantity</h3>
            <div class="number-input">
                <div class="minus">-</div>
                <input class="cart-input" type="text" value="1"/>
                <div class="plus">+</div>
            </div>
            </div>
            <div class="checkout-product_price">
              <h3 class="title">price</h3>
              <a href="#"><i class="fa-regular fa-trash-can"></i></a>
              <p class="title-margin price-bold">$ ${price.toFixed(2)} </p>
              <div class="remove-cart" data-result="${item.id}">Remove</div>
            </div>
          </section>

    `;
    headerOfCartPage.innerHTML = `<h1 class="header-of-cart-page">Shopping Cart <span class="inCart-number">(${cartItems.length})</span></h1>`;
    cart.innerHTML = `${cartItems.length}`;
  });

  orderSummary.innerHTML = `   <div class="total">
                                  <p>Shipping</p>
                                  <p>US $0.00</p>
                              </div>
                              <div class="total">
                                  <p>Total</p>
                                  <p class="gran-total">US $${totalUnitPrice}</p>
                            </div>

                        `;
}
createShoppingCart();

// const removeCart = document.querySelector(".remove-cart");

// for (var i = 0; i < removeCart.length; i++) {
//   let button = removeCart[i];
//   button.addEventListener("click", removeCartItem);
// }
// function removeCartItem(event) {
//   let buttonOnclick = event.target;
//   buttonOnclick.parentElement.remove();
//   console.log("hi");
// }
