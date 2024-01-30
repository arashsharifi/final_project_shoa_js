import { API_MYCART, API_USER } from "./apli.js";

console.log(API_MYCART);

const container_product_shopping = document.querySelector(
  "#container-product-shopping"
);

const total_amount = document.querySelector("#total-amount-shopping");

const continue_btn = document.querySelector("#continue-btn");

const userContainer = document.querySelector("#address-user");

console.log(total_amount);
document.addEventListener("DOMContentLoaded", init);

async function init() {
  try {
    const res = await fetch(`${API_MYCART}`);
    const data = await res.json();
    funcinnershopping(data);
    funcTotal(data);
    getUser();
  } catch (error) {
    console.log(error.message);
  }
}

async function getUser() {
  const res = await fetch(`${API_USER}`);
  const user = await res.json();
  if (user.length !== 0) {
    userContainer.innerHTML = "";
    user.forEach((element) => {
      const { address } = element;
      const pElement = document.createElement("p");
      pElement.textContent = `${address}`;
      userContainer.appendChild(pElement);
    });
  } else {
    console.log("dont data...");
  }
}

function funcinnershopping(data) {
  container_product_shopping.innerHTML = "";
  data.forEach((product) => {
    const { picpro, sizepro, colorpro, totalpro, name, quantitypro } = product;
    container_product_shopping.insertAdjacentHTML(
      "beforeend",
      `
      <div class="product-mycart-shopping">
          <div class="img-mycart-shopping">
            <img src="${picpro}" alt="nooot" />
          </div>
          <div class="info-mycart-shooing">
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
                <span id="qua-mycart">${quantitypro}</span>
              </div>
            </div>
          </div>
        </div>
    
    `
    );
  });
}

function funcTotal(data) {
  const sum = [];
  console.log(data);
  data.forEach((productAlltotal) => {
    const { totalpro } = productAlltotal;
    const numTotal = +totalpro;
    sum.push(numTotal);
  });
  const sumo = sum.reduce(function (accumulator, currentValue) {
    return accumulator + currentValue;
  }, 0);
  total_amount.textContent = sumo;
}

continue_btn.addEventListener("click", () => {
  location.assign("./payment.html");
});
