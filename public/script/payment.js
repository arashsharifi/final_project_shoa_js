import { API_MYCART, API_ORDER } from "./apli.js";

const submitDataOrder = document.querySelector("#submitDataOrder");
const container = document.querySelector(".wrapper-shiping-page1-peyment");
console.log(container);
const modal_pyemane = document.querySelector("#modal-pyemane");
document.addEventListener("DOMContentLoaded", init);
const getData = [];
async function init() {
  try {
    const res = await fetch(`${API_MYCART}`);
    const data = await res.json();
    getData.push(data);
    return data;
  } catch (error) {
    console.log(error.message);
  }
}

submitDataOrder.addEventListener("click", (e) => {
  e.preventDefault();
  container.classList.add("overlay");
  modal_pyemane.classList.remove("d-none");
  const [postData] = getData;
  async function postDataFun() {
    const red = await fetch(`${API_ORDER}`, {
      method: "POST",
      body: JSON.stringify(postData),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
  }
  postData.forEach((element) => {
    deletMyData(element.id);
  });
  async function deletMyData(id) {
    try {
      const rest = await fetch(`${API_MYCART}/${id}`, {
        method: "DELETE",

        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  postDataFun();
});

// overlay
