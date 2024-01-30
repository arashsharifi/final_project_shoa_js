import { API_MYCART, API_SHOEA } from "./apli.js";

function generatTost22(text, duration, background, callback) {
  Toastify({
    text: text,
    duration: duration,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true,
    callback,
    style: {
      background: background,
    },
  }).showToast();
}

console.log(window.location.href);
const hrefData = window.location.href;

const cutData = hrefData.split("?").splice(1).join("?");

const carousel_container = document.querySelector("#carousel-container");
const name_title_costum = document.querySelector("#name-custom-brand-title");

const sold_custom = document.querySelector("#sold");
const rate_custom = document.querySelector("#rate");

const dec_custom = document.querySelector("#dic");

const low_offBtn = document.querySelector("#low-off");
const IncreaseBtn = document.querySelector("#Increase");

const sizes_custom = document.querySelector(".sizes-custom");
const colors_custom = document.querySelector(".colors-custom");
const firstSize = document.querySelector("#firstSize");
const seconsSize = document.querySelector("#seconsSize");
const therdSize = document.querySelector("#therdSize");

const itemColor = document.querySelector("#item-1");
const itemColor2 = document.querySelector("#item-2");
const itemColor3 = document.querySelector("#item-3");

const quaBtn = document.querySelector("#qua");
const total = document.querySelector("#total");

const fetchDat = `${API_SHOEA}?${cutData}`;
const numberProductsso = [];
async function get() {
  try {
    const res = await fetch(fetchDat);
    const data = await res.json();
    funcCrusel(data);
    funcInformation(data);
    data.forEach((numberPro) => {
      const { numberProducts, price } = numberPro;
      numberProductsso.push(numberProducts);
      plusCount(numberProducts, price);
      minusCount(numberProducts, price);
    });
  } catch (error) {
    console.log(error.message);
  }
}
get();
//for send e nother end point
const pic = [];

function funcCrusel(data) {
  carousel_container.innerHTML = "";
  data.forEach((prudoct) => {
    const { imag } = prudoct;
    pic.push(imag);
    carousel_container.insertAdjacentHTML(
      "beforeend",
      ` <div
    id="carouselExampleFade"
    class="carousel slide carousel-fade h-75"
  >
    <div class="carousel-inner">
      <div class="carousel-item active">
        <img
          src="${imag}"
          class="info-custom d-block w-100"
          alt="..."
        />
      </div>
      <div class="carousel-item">
        <img
          src="../image/testemage/adzero-orange.jpg"
          class="info-custom d-block w-100"
          alt="..."
        />
      </div>
      <div class="carousel-item">
        <img
          src="../image/testemage/ultra-green.jpg"
          class="info-custom d-block w-100"
          alt="..."
        />
      </div>
    </div>
    <button
      class="carousel-control-prev"
      type="button"
      data-bs-target="#carouselExampleFade"
      data-bs-slide="prev"
    >
      <span
        class="carousel-control-prev-icon"
        aria-hidden="true"
      ></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button
      class="carousel-control-next"
      type="button"
      data-bs-target="#carouselExampleFade"
      data-bs-slide="next"
    >
      <span
        class="carousel-control-next-icon"
        aria-hidden="true"
      ></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>
</div>`
    );
  });
}

// console.log(numberProducts_my);
// const checkPrice = priceProduct[0];
// const checkProduct = numberProducts_my[0];
// console.log(checkPrice);
// console.log(checkProduct);

function funcInformation(data) {
  const colorsItem = [];
  data.forEach((element) => {
    const { name, sold, rate, description, size, price, color } = element;
    colorsItem.push(color);
    name_title_costum.textContent = `${name}`;
    sold_custom.textContent = `${sold}`;
    rate_custom.textContent = `${rate}`;
    dec_custom.textContent = `${description}`;
    firstSize.textContent = `${size[0]}`;
    seconsSize.textContent = `${size[1]}`;
    therdSize.textContent = `${size[2]}`;
  });
  const stringColor1 = colorsItem[0][0];
  const stringColor2 = colorsItem[0][1];
  const stringColor3 = colorsItem[0][2];

  if (stringColor1 === stringColor1) {
    itemColor.style.backgroundColor = stringColor1;
    // itemColor.textContent = stringColor1;
    itemColor.dataset.color = stringColor1;
    itemColor.textContent = "";
  }
  if (stringColor2 === stringColor2) {
    itemColor2.style.backgroundColor = stringColor2;
    // itemColor2.textContent = stringColor2;
    itemColor2.dataset.color = stringColor2;
    itemColor2.textContent = "";
  }
  if (stringColor3 === stringColor3) {
    itemColor3.style.backgroundColor = stringColor3;
    itemColor3.dataset.color = stringColor3;
    itemColor3.textContent = "";
  }
}

let count = 0;
function plusCount(numberProducts, price) {
  IncreaseBtn.addEventListener("click", () => {
    const nuPro = numberProducts;
    const pri = price;
    total.innerHTML = " ";
    count++;

    quaBtn.textContent = count;
    let sum = Number(pri * Number(count));
    total.textContent = sum;
    if (count == nuPro) {
      IncreaseBtn.classList.add("disabled");
    }
    // console.log(total.textContent);
  });
}

function minusCount(numberProducts, price) {
  low_offBtn.addEventListener("click", () => {
    quaBtn.textContent = count;
    const nuPro = numberProducts;
    const pri = price;
    const totalNum = +total.textContent;

    const minus = totalNum - pri;
    total.textContent = minus;

    if (count <= 0) {
      count == 0;
      total.textContent = "000";
    } else {
      count--;
    }
    // console.log(total.textContent);
  });
}

let sizeTarget = [];
sizes_custom.addEventListener("click", funcSize);
function funcSize(e) {
  e.preventDefault();
  sizeTarget.push(e.target.textContent);
}
// console.log(sizeTarget);

let colorTarget = [];
colors_custom.addEventListener("click", (e) => {
  e.preventDefault();
  colorTarget.push(e.target.dataset.color);
});

const subtoCart = document.querySelector("#subtoCart");
subtoCart.addEventListener("click", subtomyCartEndPoint);

async function subtomyCartEndPoint() {
  generatTost22(
    "myCart👌",
    2000,
    "linear-gradient(to right,#3498db,#2980b9)",
    () => location.assign(`./mycart.html`)
  );
  try {
    const [size] = sizeTarget;
    const [color] = colorTarget;
    const quantity = quaBtn.textContent;
    const totalPrice = total.textContent;
    const [picProduct] = pic;
    const [numberProductssoIsThis] = numberProductsso;
    const nameProduct = name_title_costum.textContent;
    const transfermycart = await fetch(`${API_MYCART}`, {
      method: "POST",
      body: JSON.stringify({
        picpro: picProduct,
        sizepro: size,
        colorpro: color,
        totalpro: totalPrice,
        name: nameProduct,
        quantitypro: quantity,
        numberOfpro: numberProductssoIsThis,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
  } catch (error) {
    console.log(error.message);
  }
}
