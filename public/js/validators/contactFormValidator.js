window.addEventListener("load", function () {
    let form = document.querySelector(".contact__form");
    let name = document.querySelector("#name");
    let nameError = document.querySelector("#nameError");
    let email = document.querySelector("#email");
    let emailError = document.querySelector("#emailError");
    let message = document.querySelector("#message");
    let messageError = document.querySelector("#messageError");
    // let allInputs = document.querySelectorAll('.contactForm-input');
    // let allErrorPs = document.querySelectorAll('.form-messageError');
    // console.log(allInputs);
    // console.log(allErrorPs);
    let button = document.querySelector("#submitContactBtn");
    button.addEventListener("click", function (event) {
      event.preventDefault();
      let errores = {};
      if (name.value.length < 1) {
        errores.name = "Debes ingresar un nombre";
      } else if (email.value.length < 1) {
        errores.email = "Debes llenar este campo";
      } else if (email.value.length >= 1 && !email.value.includes('@')) {
          errores.email = "Debes ingresar un correo valido";
      } else if (message.value.length < 20) {
        errores.message = "Debes ingresar un mensaje de al menos 20 caracteres";
      }
      if (Object.keys(errores).length >= 1) {
        nameError.innerText = errores.name ? errores.name : "";
        emailError.innerText = errores.email ? errores.email : "";
        messageError.innerText = errores.message ? errores.message : "";
      } else {
        form.submit();
      }
    });
  });