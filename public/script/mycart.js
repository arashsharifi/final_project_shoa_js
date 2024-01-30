import { API_MYCART } from "./apli.js";

const product_mycart_container = document.querySelector(
  "#product-mycart-container"
);

const modal = document.querySelector("#modal-container");

const prodoct_modale = document.querySelector("#prodoct-container-modal");

const checkout_btn = document.querySelector("#checkout-btn");

const cansel_btn_mycart = document.querySelector("#cansel-btn-mycart");

const remove_prodict_mycart = document.querySelector("#remove-prodict-mycart");

const totalpirce_my = document.querySelector("#totalpirce-my");

document.addEventListener("DOMContentLoaded", init);
function init() {
  try {
    getMycartData();
  } catch (error) {
    console.log(error.message);
  }
}

async function getMycartData() {
  try {
    const res = await fetch(`${API_MYCART}`);
    const data = await res.json();
    if (data.length == 0) {
      location.assign("./notproduct.html");
    } else {
      ineerColor(data);
      innerMyCartPro(data);
      funcTotalAllMyCart(data);
    }
  } catch (error) {
    console.log(error.message);
  }
}

function innerMyCartPro(data) {
  product_mycart_container.innerHTML = "";
  data.forEach((products) => {
    const { picpro, sizepro, colorpro, totalpro, name, quantitypro, id } =
      products;
    product_mycart_container.insertAdjacentHTML(
      "beforeend",
      `
      <div data-set="${id}" class="product-mycart">
          <div class="img-mycart">
            <img
              class="img-info-mycart"
              src="${picpro}"
              alt="nooot"
            />
          </div>
          <div class="info-mycart">
            <div class="name-info-mycart">
              <h3 class="name">${name}</h3>
              <i class="bi bi-trash3"></i>
            </div>
            <div class="box-color-size">
              <span style="background: ${colorpro}" class="colorshow"></span>
              <p class="txt-color">${colorpro}</p>
              <p>siz=<span>${sizepro}</span></p>
            </div>
            <div class="total-quntity-mycart">
            <p>
            <i class="bi bi-currency-dollar"></i
            ><span id="total-amount">${totalpro}</span>.00<span></span>
          </p>

              <div class="total-price-mycart">
                <button class="btn low-off-mycart" id="low-off-mycart">-</button>
                <span class="qua-mycart">${quantitypro}</span>
                <button class="btn Increase-mycart" id="Increase-mycart">+</button>
              </div>
            </div>
          </div>
        </div>
      `
    );
  });
}

product_mycart_container.addEventListener("click", (e) => {
  if (e.target.classList.contains("Increase-mycart")) {
    console.log(e.target.closest(".product-mycart"));
    // IncreaseFunc(e.target.parentElement.children[2]);
  }
  if (e.target.classList.contains("bi-trash3")) {
    modal.classList.remove("d-none");
    modal.classList.add("show-modal-mycart");
    //////////////////////////////////////پیشنهاد میشه
    ///////////////////////////////////👇
    console.log(e.target.closest(".product-mycart").dataset.set);
    deleteProdoct(
      e.target.parentElement.parentElement.parentElement.dataset.set
    );
  }
});

function IncreaseFunc(element) {
  console.log(element);
}

async function deleteProdoct(id) {
  prodoct_modale.innerHTML = "";
  try {
    const res = await fetch(`${API_MYCART}?id=${id}`);
    const data = await res.json();
    console.log(data);
    data.forEach((product) => {
      // prodoct_modale
      const { picpro, sizepro, colorpro, totalpro, name, quantitypro, id } =
        product;
      prodoct_modale.insertAdjacentHTML(
        "beforeend",
        `
        <div data-set="${id}" class="product-mycart">
        <div class="img-mycart">
          <img
            class="img-info-mycart"
            src="${picpro}"
            alt="nooot"
          />
        </div>
        <div class="info-mycart">
          <div class="name-info-mycart">
            <h3 class="name">${name}</h3>
            <i class="bi bi-trash3"></i>
          </div>
          <div class="box-color-size">
            <span style="background: ${colorpro}" class="colorshow"></span>
            <p class="txt-color">${colorpro}</p>
            <p>siz=<span>${sizepro}</span></p>
          </div>
          <div class="total-quntity-mycart">
          <p>
          <i class="bi bi-currency-dollar"></i
          ><span id="total-amount">${totalpro}</span>.00<span></span>
        </p>

            <div class="total-price-mycart">
              <button class="btn low-off-mycart" id="low-off-mycart">-</button>
              <span class="qua-mycart">${quantitypro}</span>
              <button class="btn Increase-mycart" id="Increase-mycart">+</button>
            </div>
          </div>
        </div>
      </div>
        `
      );
    });
  } catch (error) {
    console.log(error.message);
  }
}

cansel_btn_mycart.addEventListener("click", () => {
  modal.classList.add("d-none");
});

remove_prodict_mycart.addEventListener("click", (e) => {
  modal.classList.add("d-none");

  funcdeletData(
    e.target.parentElement.parentElement.children[1].children[0].dataset.set
  );
});

function ineerColor(data) {
  const getSetColor = [];
  console.log(data);
  data.forEach((product) => {
    const { colorpro } = product;
    getSetColor.push(colorpro);
  });
  console.log(getSetColor);
}

checkout_btn.addEventListener("click", () => {
  location.assign("./shoppingAddress.html");
});

function funcdeletData(id) {
  console.log(`${API_MYCART}?id=${id}`);
  async function deleteee() {
    try {
      const res = await fetch(`${API_MYCART}/${id}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  deleteee();
  getMycartData();
}

function funcTotalAllMyCart(data) {
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
  totalpirce_my.textContent = sumo;
}

// product_mycart_container.addEventListener()

// let count = 0;
// function plusCount(numberProducts, price) {
//   IncreaseBtn.addEventListener("click", () => {
//     const nuPro = numberProducts;
//     const pri = price;
//     total.innerHTML = " ";
//     count++;

//     quaBtn.textContent = count;
//     let sum = Number(pri * Number(count));
//     total.textContent = sum;
//     if (count == nuPro) {
//       IncreaseBtn.classList.add("disabled");
//     }
//     // console.log(total.textContent);
//   });
// }

// function minusCount(numberProducts, price) {
//   low_offBtn.addEventListener("click", () => {
//     quaBtn.textContent = count;
//     const nuPro = numberProducts;
//     const pri = price;
//     const totalNum = +total.textContent;

//     const minus = totalNum - pri;
//     total.textContent = minus;

//     if (count <= 0) {
//       count == 0;
//       total.textContent = "000";
//     } else {
//       count--;
//     }
//     // console.log(total.textContent);
//   });
// }
