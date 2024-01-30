import { API_SHOEA } from "./apli.js";

console.log(API_SHOEA);

const search = document.querySelector("#search");

const no_value_search_container = document.querySelector(
  "#no-value-search-container"
);
const container_brands_search = document.querySelector(
  "#container-brands-search"
);
console.log(container_brands_search);

document.addEventListener("DOMContentLoaded", init);
function init() {
  if (search.value.length === 0) {
    console.log("yeee");
    no_value_search_container.classList.remove("d-none");
  } else {
    console.log("nooo");
  }
}

search.addEventListener("input", searchQueryBrands);

function searchQueryBrands(e) {
  e.preventDefault();
  if (search.value.length !== 0) {
    no_value_search_container.classList.add("d-none");
    console.log("yeeeit");
  } else {
    console.log("nooo");
  }
  async function mydebunc() {
    try {
      const res = await fetch(`${API_SHOEA}?brand=${search.value}`);
      const deta = await res.json();
      innerSearch(deta);
    } catch (error) {
      console.log(error.message);
    }
  }
  const debounce = _.debounce(mydebunc, 3000);
  debounce();
}

function innerSearch(data) {
  container_brands_search.innerHTML = "";
  data.forEach((dataa) => {
    const { imag, description, price, id } = dataa;
    container_brands_search.insertAdjacentHTML(
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

container_brands_search.addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target.classList.contains("name-all")) {
    const set = e.target.parentElement.dataset.set;
    window.location.assign(`./customBrand.html?id=${set}`);
  }
});
