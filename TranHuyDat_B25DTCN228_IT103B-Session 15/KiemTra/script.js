const emailElement = document.querySelector("#email-id");
const passwordElement = document.querySelector("#password-id");
const formElement = document.querySelector("#form-id");

let user = [];

formElement.addEventListener("submit", (event) => {
  event.preventDefault();

  let newUser = {
    email: emailElement.value,
    password: passwordElement.value,
  };

  user.push(newUser);
  console.log(user);
});
