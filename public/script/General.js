export function generatTost(text, duration, background, callback) {
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