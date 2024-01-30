const ARL_POSTES = "http://localhost:3001/postCard";

const track = document.querySelector(".carousel__track");

const textComtiner = document.querySelector(".text-continer");

const slidesText = Array.from(textComtiner.children);

const slides = Array.from(track.children);

const dotsNav = document.querySelector(".carousel__nav");

const dots = Array.from(dotsNav.children);

const nextButton = document.querySelector(".carousel__button--rigth");

const slideWidth = slides[0].getBoundingClientRect().width;

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

const setSlidePosition = (slide, index) => {
  slide.style.left = slideWidth * index + "px";
};

const moveToSlide = (track, currentSlide, targetSlide) => {
  track.style.transform = `translateX(-${targetSlide.style.left})`;
  currentSlide.classList.remove("current-slide");
  targetSlide.classList.add("current-slide");
};

slides.forEach(setSlidePosition);

//backe to move

//next to move
let flag = 0;
nextButton.addEventListener("click", (e) => {
  const currentSlide = track.querySelector(".current-slide");
  const nextSlide = currentSlide.nextElementSibling;
  moveToSlide(track, currentSlide, nextSlide);
  flag++;
  console.log(flag);
  if (flag === 2) {
    nextButton.textContent = "get started";
    setTimeout(() => {
      generatTost(
        "go to login page",
        1000,
        "linear-gradient(to right,#eccc68,#2f3542)",
        () => location.assign(`./login.html`)
      );
    }, 2000);
  }
});

dotsNav.addEventListener("click", (e) => {
  const targetDot = e.target.closest("button");
  if (!targetDot) return;
  const currentSlide = track.querySelector(".current-slide");
  const currentDot = dotsNav.querySelector(".current-slide");
  const targetIndex = dots.findIndex((dot) => dot === targetDot);

  if (targetIndex === 2) {
    nextButton.textContent = "get strated";
  } else {
    nextButton.textContent = "next";
  }
  const targetSlide = slides[targetIndex];

  moveToSlide(track, currentSlide, targetSlide);
  currentDot.classList.remove("current-slide");
  targetDot.classList.add("current-slide");
});
