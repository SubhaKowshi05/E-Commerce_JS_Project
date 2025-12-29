import { orders } from "./orders-data.js";
import { getProduct } from "./products.js";
import { formatCurrency } from "../scripts/utils/money.js";
import { addToCart } from "./cart.js";

renderOrders();

function renderOrders() {
  const ordersGrid = document.querySelector(".js-orders-grid");

  if (orders.length === 0) {
    ordersGrid.innerHTML = "<p>You have no orders yet.</p>";
    return;
  }

  let ordersHTML = "";

  orders.forEach((order) => {
    ordersHTML += `
      <div class="order-container">
        ${renderOrderHeader(order)}
        <div class="order-details-grid">
          ${renderOrderProducts(order)}
        </div>
      </div>
    `;
  });

  ordersGrid.innerHTML = ordersHTML;
}

function renderOrderHeader(order) {
  return `
    <div class="order-header">
      <div class="order-header-left-section">
        <div class="order-date">
          <div class="order-header-label">Order Placed:</div>
          <div>${new Date(order.orderTime).toLocaleDateString()}</div>
        </div>

        <div class="order-total">
          <div class="order-header-label">Total:</div>
          <div>${formatCurrency(order.totalCostCents)}</div>
        </div>
      </div>

      <div class="order-header-right-section">
        <div class="order-header-label">Order ID:</div>
        <div>${order.id}</div>
      </div>
    </div>
  `;
}

function renderOrderProducts(order) {
  let productsHTML = "";

  order.products.forEach((orderProduct) => {
    const product = getProduct(orderProduct.productId);

    productsHTML += `
      <div class="product-image-container">
        <img src="${product.image}">
      </div>

      <div class="product-details">
        <div class="product-name">${product.name}</div>
        <div class="product-delivery-date">
          Arriving on: ${orderProduct.deliveryDate}
        </div>
        <div class="product-quantity">
          Quantity: ${orderProduct.quantity}
        </div>

        <button
          class="buy-again-button button-primary js-buy-again"
          data-product-id="${product.id}">
          <img class="buy-again-icon" src="images/icons/buy-again.png">
          <span class="buy-again-message">Buy it again</span>
        </button>
      </div>

      <div class="product-actions">
        <a href="tracking.html?orderId=${order.id}&productId=${product.id}">
          <button class="track-package-button button-secondary">
            Track package
          </button>
        </a>
      </div>
    `;
  });

  return productsHTML;
}

document.addEventListener("click", (event) => {
  const button = event.target.closest(".js-buy-again");
  if (!button) return;

  const productId = button.dataset.productId;

  addToCart(productId);

  // Optional feedback
  button.querySelector(".buy-again-message").innerText = "Added ✓";

  setTimeout(() => {
    window.location.href = "checkout.html";
  }, 500);
});


