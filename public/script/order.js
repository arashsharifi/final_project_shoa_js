import { API_ORDER } from "./apli.js";
const container_order = document.querySelector(
  "#container-product-shopping-order"
);
document.addEventListener("DOMContentLoaded", init);

async function init() {
  try {
    const res = await fetch(`${API_ORDER}`);
    const data = await res.json();
    const [data1] = data;
    console.log(data1);
    console.log(data1);
    if (data1.length !== 0) {
      console.log("yes it is");
      funcInnerOrder(data1);
    }
  } catch (error) {
    console.log(error.message);
    location.assign("./notproduct-order.html");
  }
}

function funcInnerOrder(data) {
  container_order.innerHTML = "";
  data.forEach((product) => {
    const { picpro, sizepro, colorpro, totalpro, name } = product;
    container_order.insertAdjacentHTML(
      "beforeend",
      `
      <div class="product-mycart-shopping">
      <div class="img-mycart-shopping">
        <img src="${picpro}" alt="nooot" />
      </div>
      <div class="info-mycart-shooing-order">
        <div class="name-info-mycart">
          <h3 class="name">${name}</h3>
        </div>
        <div class="box-color-size-shopping">
          <span style="background: ${colorpro}" class="colorshow-shopping"></span>
          <p class="txt-color">${colorpro}</p>
          <p>siz=<span>${sizepro}</span></p>
        </div>
        <div class="total-quntity-mycart-shopping">
          <p>
            <i class="bi bi-currency-dollar"></i
            ><span id="total-amount">${totalpro}</span>.00<span></span>
          </p>

          <div class="total-price-mycart-shopping">
            <div class="order-str">Track Order</div>
          </div>
        </div>
      </div>
    </div>
     `
    );
  });
}
