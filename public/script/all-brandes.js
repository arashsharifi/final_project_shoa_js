import { API_SHOEA } from "./apli.js";

console.log(window.location.href);

const hrefData = window.location.href;

const cutData = hrefData.split("?").splice(1).join("?");

const txt_brands = document.querySelector("#txt-brands");

const brands_container = document.querySelector("#brands-container");

async function getNameBrand() {
  try {
    const res = await fetch(cutData);
    const dataN = await res.json();

    nameData(dataN);
    function nameData(dataN) {
      // console.log(dataN[0]);
      const first = dataN[0];
      const { brand } = first;

      const pElement = document.createElement("p");
      pElement.textContent = `${brand}`;
      txt_brands.appendChild(pElement);
    }
  } catch (error) {
    console.log(error.message);
  }
}

getNameBrand();
async function getData() {
  try {
    const res = await fetch(cutData);
    const data = await res.json();
    inner(data);
  } catch (error) {
    console.log(error.message);
  }
}
getData();

function inner(data) {
  brands_container.innerHTML = "";
  data.forEach((dataa) => {
    const { imag, description, price, id } = dataa;
    brands_container.insertAdjacentHTML(
      "beforeend",
      `<div data-set="${id}" class="brand-shows-all">
    <div class="img-all">
      <img
        src="${imag}"
        alt="nooot"
      />
    </div>
    <h3 class="name-all">${description}</h3>
    <p class="price-all"><span>$</span>${price}</p>
  </div>`
    );
  });
}

brands_container.addEventListener("click", submitId);
function submitId(e) {
  const classes = e.target.classList;
  if (classes.contains("name-all")) {
    const set = e.target.parentElement.dataset.set;
    console.log(set);
    window.location.assign(`./customBrand.html?id=${set}`);
  } else {
    console.log("noooo");
  }
}

// brands_container.addEventListener("click", (e) => {
//   e.preventDefault();
//   if (e.target.classList.contains("name-all")) {
//     console.log("yesss");
//   }
// });

// const url = new URL(location.href);
// console.log(url);
// const result = document.querySelector("#result");
// const brand = url.searchParams.get("brand");
// console.log(brand);
// console.log(cutData);
// async function getww() {
//   const rest = await fetch();
//   const data = await rest.json();
//   console.log(data);
// }
// getww();

// const getBackEndProduct = async function (
//   BASE_URL,
//   search,
//   firstParam,
//   hasA,
//   secondParam
// ) {
//   try {
//     const backEndGetData = hasA
//       ? await fetch(
//           `${BASE_URL}?${search}=${firstParam}&&${hasA}=${secondParam}`
//         )
//       : await fetch(`${BASE_URL}?${search}=${firstParam}`);
//     const backendData = await backEndGetData.json();
//     return backendData;
//   } catch {
//     console.log("getBackEndProduct error");
//   }
// };

// async function gett() {
//   const data = await getBackEndProduct(
//     API_SHOEA,
//     "brand",
//     brand,
//     "most-papula",
//     false
//   );
//   data.forEach((element) => {
//     const div = document.createElement("div");
//     div.innerHTML += `
//        <img src=${element.imag[0]} alt="nooot">
//        <img src=${element.imag[1]} alt="nooot">

//        ${element.imag.forEach((imgg) => {
//          const div = document.createElement("div");
//        })}

//      `;
//     result.appendChild(div);
//   });
// }

// gett();
