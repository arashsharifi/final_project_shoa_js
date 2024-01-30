import { API_SHOEA, API_USER } from "./apli.js";

const userContainer = document.querySelector("#userContainer");

const whatDate = document.querySelector("#whatDate");

const button_container = document.querySelectorAll(".brands-button button");
const icon_container = document.querySelectorAll(".icon-footer div");

//nav top
const adidasBtnNavT = document.querySelector(".addidass");
const nikeBtnNavt = document.querySelector(".nike");
const conversBtnNavt = document.querySelector(".convers");
const pumaBtnNavt = document.querySelector(".puma");
const rebookBtnNavt = document.querySelector(".reebok");
const newBaBtnNavt = document.querySelector(".newba");
const asicsBtnNavt = document.querySelector(".asics");

//nav popular
const mostAllpopular = document.querySelector("#all");

const nikePopular = document.querySelector("#nike");

const adidasPopular = document.querySelector("#adidas");

const pumaPopular = document.querySelector("#puma");

const asicsPopular = document.querySelector("#asics");

const reebokPopular = document.querySelector("#reebok");

const newbaBtnPopular = document.querySelector("#newba");

const conversBtnPopular = document.querySelector("#convers");

const Products_shoa = document.querySelector("#Products-shoa");

const searchData = document.querySelector("#searchData");

document.addEventListener("DOMContentLoaded", initt);

function initt(e) {
  e.preventDefault();
  try {
    async function getUser() {
      const res = await fetch(`${API_USER}`);
      const user = await res.json();
      if (user.length !== 0) {
        userContainer.innerHTML = "";
        user.forEach((element) => {
          const { emailUser } = element;
          const h3Element = document.createElement("h3");
          h3Element.textContent = `${emailUser}`;
          userContainer.appendChild(h3Element);
        });
      } else {
        console.log("dont data...");
      }
    }
    getUser();
    checkTimee();
    async function getAllPopular() {
      try {
        const res = await fetch(`${API_SHOEA}?add=true`);
        const data = await res.json();

        innerPopular(data);
      } catch (error) {
        console.log(error.message);
      }
    }
    getAllPopular();
  } catch (error) {
    console.log(error.message);
  }
}

function checkTimee() {
  //date
  const now = new Date();
  const currentHour = now.getHours();
  const pElement = document.createElement("p");

  if (currentHour >= 5 && currentHour < 12) {
    pElement.textContent = "Good morning!🤚";
    whatDate.appendChild(pElement);
  } else if (currentHour >= 12 && currentHour < 18) {
    pElement.textContent = "Good afternoon!🤚";
    whatDate.appendChild(pElement);
  } else if (currentHour >= 18 || currentHour < 5) {
    pElement.textContent = "Good evening!🤚";
    whatDate.appendChild(pElement);
  }
}

let tag = "All";
// tags.forEach((tag) => (tag.classList = ""));
button_container.forEach((buttonEvent) => {
  buttonEvent.addEventListener("click", change);
});
function change() {
  button_container.forEach((tag) => (tag.classList = ""));
  this.classList = "active";
  tag = this.innerHTML;
}
// this.classList = "active";
// tag = this.innerHTML;

let tageIcon = "home";

icon_container.forEach((iconEvent) => {
  iconEvent.addEventListener("click", () => {
    icon_container.forEach((icon) => (icon.classList = ""));
    const divId = Array.from(icon_container);
    console.log(divId);
  });
});

async function getDataShoe() {
  const res = await fetch(`${API_SHOEA}?most-papula=false&brand=adidas`);
  const data = await res.json();
  console.log(data);
}
getDataShoe();

//nav click event all prudoct
adidasBtnNavT.addEventListener("click", () => {
  window.location.assign(`./all-brands.html?${API_SHOEA}?brand=adidas`);
  // window.location.assign(`./all-brands.html?brand=adidas&&most-papula=false`);
});
nikeBtnNavt.addEventListener("click", () => {
  console.log("yess");
  window.location.assign(`./all-brands.html?${API_SHOEA}?brand=nike`);
});
conversBtnNavt.addEventListener("click", () => {
  console.log("yess");
  window.location.assign(`./all-brands.html?${API_SHOEA}?brand=convers`);
});
pumaBtnNavt.addEventListener("click", () => {
  console.log("yess");
  window.location.assign(`./all-brands.html?${API_SHOEA}?brand=puma`);
});
rebookBtnNavt.addEventListener("click", () => {
  console.log("yess");
  window.location.assign(`./all-brands.html?${API_SHOEA}?brand=reebook`);
});
newBaBtnNavt.addEventListener("click", () => {
  console.log("yess");
  window.location.assign(`./all-brands.html?${API_SHOEA}?brand=newba`);
});
asicsBtnNavt.addEventListener("click", () => {
  console.log("yess");
  window.location.assign(`./all-brands.html?${API_SHOEA}?brand=asics`);
});

function innerPopular(data) {
  Products_shoa.innerHTML = "";
  data.forEach((product) => {
    const { imag, name, price, id } = product;
    Products_shoa.insertAdjacentHTML(
      "beforeend",
      `
      <div data-set="${id}"  class="product-show">
          <div class="img-show">
            <img
              src="${imag}"
              alt="nooot"
            />
          </div>
          <h3 class="name-show">${name}</h3>
          <p class="price-show"><span>$</span>${price}</p>
        </div>
    `
    );
  });
}

//++++++++++++++++++++++++++++++//

//for nav most popular
async function queryPramMypopular(brandPart, popular) {
  Products_shoa.innerHTML = "";
  try {
    const res = await fetch(`${API_SHOEA}?${brandPart}&${popular}`);
    const data = await res.json();
    console.log(data);
    showInnerMyPopular(data);
  } catch (error) {
    console.log(error.message);
  }
}

function showInnerMyPopular(data) {
  Products_shoa.innerHTML = "";
  data.forEach((product) => {
    const { imag, name, price, id } = product;
    Products_shoa.insertAdjacentHTML(
      "beforeend",
      `
      <div data-set="${id}"class="product-show">
          <div class="img-show">
            <img
              src="${imag}"
              alt="nooot"
            />
          </div>
          <h3 class="name-show">${name}</h3>
          <p class="price-show"><span>$</span>${price}</p>
        </div>
    `
    );
  });
}

// add event delegation =============================
Products_shoa.addEventListener("click", submitId);
function submitId(e) {
  const classes = e.target.classList;
  if (classes.contains("name-show")) {
    const set = e.target.parentElement.dataset.set;
    // console.log(set);
    // const idset = [];

    // for (const key in set) {
    //   idset.push(set[key]);
    // }
    // const idproduct = set;
    function subId() {
      try {
        // window.location.assign(`./customBrand.html?${API_SHOEA}?id=${set}`);
        window.location.assign(`./customBrand.html?id=${set}`);
      } catch (error) {
        console.log(error.message);
      }
    }
    subId();
  } else {
    console.log("noooo");
  }
}

//=====================================
mostAllpopular.addEventListener("click", () => {
  queryPramMypopular("all=true", "most-papula=true");
});
nikePopular.addEventListener("click", () => {
  queryPramMypopular("brand=nike", "most-papula=true");
});
adidasPopular.addEventListener("click", () => {
  queryPramMypopular("brand=adidas", "most-papula=true");
});
pumaPopular.addEventListener("click", () => {
  queryPramMypopular("brand=puma", "most-papula=true");
});
pumaPopular.addEventListener("click", () => {
  queryPramMypopular("brand=puma", "most-papula=true");
});
asicsPopular.addEventListener("click", () => {
  queryPramMypopular("brand=asics", "most-papula=true");
});
reebokPopular.addEventListener("click", () => {
  queryPramMypopular("brand=reebook", "most-papula=true");
});
newbaBtnPopular.addEventListener("click", () => {
  queryPramMypopular("brand=newba", "most-papula=true");
});
conversBtnPopular.addEventListener("click", () => {
  queryPramMypopular("brand=convers", "most-papula=true");
});

//**************************************** */

searchData.addEventListener('click',()=>{
  location.assign('./search.html')
})
