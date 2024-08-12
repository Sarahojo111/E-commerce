// function changeImage(imageUrl) {
//   document.getElementById("mainProductImage").src = imageUrl;
//   document.querySelectorAll(".thumbnail").forEach(function (thumbnail) {
//     thumbnail.classList.remove("active");
//   });
//   event.currentTarget.classList.add("active");
// }

function redirectToProductPage(image, title, price) {
  const url = `product.html?image=${encodeURIComponent(
    image
  )}&title=${encodeURIComponent(title)}&price=${encodeURIComponent(price)}`;
  window.location.href = url;
}
// Retrieve product details from URL parameters
function getQueryParams() {
  const params = new URLSearchParams(window.location.search);
  return {
    image: params.get("image"),
    title: params.get("title"),
    price: params.get("price"),
  };
}

// Display product details on the page
function displayProductDetails() {
  const product = getQueryParams();
  document.getElementById("productImage").src = product.image;
  document.getElementById("productTitle").textContent = product.title;
  document.getElementById("productPrice").textContent = `$${product.price}`;
}
// Add product to cart (using local storage for simplicity)
function addToCart() {
  const product = getQueryParams();
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Product added to cart!");
}

document.addEventListener("DOMContentLoaded", () => {
  // Assuming the URL has the correct parameters, e.g., ?image=image1.png&title=Product%201&price=99.99
  const params = new URLSearchParams(window.location.search);
  const product = {
    image: params.get("image"),
    title: params.get("title"),
    price: params.get("price"),
  };

  // Update DOM elements
  if (product.image) {
    document.getElementById("productImage").src = product.image;
  }
  if (product.title) {
    document.getElementById("productTitle").textContent = product.title;
  }
  if (product.price) {
    document.getElementById("productPrice").textContent = `$${product.price}`;
  }
  
});



// FOR CART PAGE

document.querySelectorAll('.cart-item-quantity').forEach(input => {
  input.addEventListener('change', updateCart);
});

document.querySelectorAll('.remove-item').forEach(button => {
  button.addEventListener('click', removeItem);
});

function updateCart() {
  let cartItems = document.querySelectorAll('.cart-item');
  let subtotal = 0;
  
  cartItems.forEach(item => {
      let price = parseFloat(item.querySelector('.cart-item-price').textContent.replace('$', ''));
      let quantity = item.querySelector('.cart-item-quantity').value;
      subtotal += price * quantity;
  });
  
  document.getElementById('cart-subtotal').textContent = `$${subtotal.toFixed(2)}`;
  document.getElementById('cart-total').textContent = `$${subtotal.toFixed(2)}`;
}

function removeItem(event) {
  let itemRow = event.target.closest('.cart-item');
  itemRow.remove();
  updateCart();
}




