const shosw_spinner = document.querySelector("#shosw_spinner");

document.addEventListener("DOMContentLoaded", removeSpinner);
function removeSpinner() {
  setTimeout(() => {
    shosw_spinner.classList.add("d-none");
  }, 3000);
}
document.addEventListener("DOMContentLoaded", locationTost);

function generatTost(text, duration, background, callback) {
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
// "linear-gradient(to right,#eccc68,#2f3542)"

function locationTost() {
  setTimeout(() => {
    generatTost(
      "wellcome",
      3000,
      "linear-gradient(to right,#eccc68,#2f3542)",
      () => location.assign(`./caruselshoes.html`)
    );
  }, 5000);
}
