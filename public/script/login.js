import { generatTost } from "./General.js";
import { API_USER, postUser } from "./apli.js";

const form = document.querySelector("#form");

const email = document.querySelector("#email");
const passwordInput = document.querySelector('input[type="password"]');

const checkBtn = document.querySelector("#checkBox");

form.addEventListener("submit", init);
function init(e) {
  e.preventDefault();
  const emailValue = email.value;
  const passValue = passwordInput.value;

  if (
    emailValue.length > 10 &&
    emailValue.includes("@") &&
    passValue.length > 7
  ) {
    if (checkBtn.checked === true) {
      postUser();
      generatTost(
        " 🧞‍♂️ all details set in data",
        1000,
        "linear-gradient(to right,#2ecc71,#9b59b6)",
        () => location.assign(`./home.html`)
      );

      form.reset();
    } else {
      generatTost(
        " 🧞‍♂️ all details set",
        1000,
        "linear-gradient(to right,#2ecc71,#16a085)",
        () => location.assign(`./home.html`)
      );
      form.reset();
    }
  } else {
    generatTost(
      " 🧞‍♂️ Please fill in the details",
      2000,
      "linear-gradient(to right,#e74c3c,#c0392b)"
    );
  }
}
