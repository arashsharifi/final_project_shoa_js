export const API_USER = "http://localhost:3001/user";
export const API_SHOEA = "http://localhost:3001/shoes";
export const API_MYCART = "http://localhost:3001/mycart";
export const API_ORDER = "http://localhost:3001/order";

export async function postUser() {
  try {
    const res = await fetch(`${API_USER}`, {
      method: "POST",
      body: JSON.stringify({
        emailUser: document.getElementById("email").value,
        pass: document.querySelector('input[type="password"]').value,
        address: document.getElementById("address").value,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
  } catch (error) {
    console.log(error.message);
  }
}

//ارسال شونده آیدی فقط بش آیدی بده
