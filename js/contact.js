const nameInput = document.querySelector("#name");
const subject = document.querySelector("#subject");
const email = document.querySelector("#email");
const message = document.querySelector("#message");
const submitBtn = document.querySelector(".submit-btn");
const form = document.querySelector("#form");

const nameError = document.querySelector("#name-error");
const subjectError = document.querySelector("#subject-error");
const emailError = document.querySelector("#email-error");
const messageError = document.querySelector("#message-error");

document.title = "Contact";

form.addEventListener("submit", (event) => {
  nameValidation(event);
  emailValidation(event);
  subjectValidation(event);
  messageValidation(event);
});

function nameValidation(event) {
  if (nameInput.value.length > 5) {
    nameError.style.display = "none";
    return true;
  }
  event.preventDefault();
  nameError.style.display = "block";
  return false;
}

function emailValidation(event) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value)) {
    emailError.style.display = "none";
    return true;
  }
  emailError.style.display = "block";
  event.preventDefault();
  return false;
}

function subjectValidation(event) {
  if (subject.value.length > 15) {
    subjectError.style.display = "none";
    return true;
  }
  event.preventDefault();
  subjectError.style.display = "block";
  return false;
}

function messageValidation(event) {
  if (message.value.length > 25) {
    messageError.style.display = "none";
    return true;
  }
  event.preventDefault();
  messageError.style.display = "block";
  return false;
}
