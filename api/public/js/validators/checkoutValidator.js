// window.addEventListener("load", function () {
//     let form = document.querySelector(".contact__form");
//     let paymentMethod = document.querySelector("#paymentMethod");
//     let paymentMethodError = document.querySelector("#paymentMethodError");
//     let city = document.querySelector("#city");
//     let cityError = document.querySelector("#cityError");
//     let street = document.querySelector("#street");
//     let streetError = document.querySelector("#streetError");
//     let phone = document.querySelector("#phone");
//     let phoneError = document.querySelector("#phoneError");
    
//     let button = document.querySelector("#submitContactBtn");
//     button.addEventListener("click", function (event) {
//       event.preventDefault();
//       let errores = {};
      
//       if (city.value == "") {
//         errores.city = "Debes elegir una localidad";
//       } else if (street.value.length < 1) {
//         errores.street = "Debes ingresar una direccion de envio";
//       } else if (paymentMethod.value == "") {
//         errores.paymentMethod = "Debes elegir un metodo de pago";
//       } else if (phone.value.length < 8 || isNaN(parseInt(phone.value) || phone.value.length > 14)) {
//         errores.phone = "Ingresa un telefono de contacto. Entre 8 numeros y 14";
//       }

//       if (Object.keys(errores).length >= 1) {
//         paymentMethodError.innerText = errores.paymentMethod ? errores.paymentMethod : "";
//         cityError.innerText = errores.city ? errores.city : "";
//         streetError.innerText = errores.street ? errores.street : "";
//         phoneError.innerText = errores.phone ? errores.phone : "";
//       } else {
//         form.submit();
//       }
//     });
//   });