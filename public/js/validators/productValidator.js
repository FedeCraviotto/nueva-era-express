window.addEventListener("load", function () {
  let form = document.querySelector("#product-create__form");
  let name = document.querySelector("#name");
  let nameError = document.querySelector("#nameError");
  let category = document.querySelector("#category");
  let categoryError = document.querySelector("#categoryError");
  let brand = document.querySelector("#brand");
  let brandError = document.querySelector("#brandError");
  let shortDesc = document.querySelector("#shortDesc");
  let shortDescError = document.querySelector("#shortDescError");
  let longDesc = document.querySelector("#longDesc");
  let longDescError = document.querySelector("#longDescError");
  let color = document.querySelector("#color");
  let colorError = document.querySelector("#colorError");
  let price = document.querySelector("#price");
  let priceError = document.querySelector("#priceError");
  let image = document.querySelector("#image");
  let imageError = document.querySelector("#imageError");
  let dispatch = document.querySelectorAll('[name="dispatch"]');
  let dispatchError = document.querySelector("#dispatchError");
  let discount = document.querySelector("#discount");
  let discountError = document.querySelector("#discountError");
  let stock = document.querySelector("#stock");
  let stockError = document.querySelector("#stockError");
  let button = document.querySelector("#createProductBtn");
  button.addEventListener("click", function (event) {
    event.preventDefault();
    let errores = {};

    if (name.value.length < 1) {
      errores.name = "Debes completar el nombre del producto";
    } else if (category.value == "") {
      errores.category = "Debes elegir una categoria";
    } else if (brand.value == "") {
      errores.brand = "Debes elegir una marca";
    } else if (shortDesc.value.length < 1) {
      errores.shortDesc = "Debes ingresar una descripción corta";
    } else if (longDesc.value.length < 1) {
      errores.longDesc = "Debes ingresar una descripción larga";
    } else if (color.value == "") {
      errores.color = "Debes elegir un color";
    } else if (price.value.length < 1 || isNaN(parseInt(price.value))) {
      errores.price = "Debes completar el precio. Ingresa solo numeros";
    } else if (!image.value) {
      errores.image =
        "Debes subir una imagen";
    } else if (
      image.value &&
      !image.value.slice(-4).includes(".jpg" || ".png") &&
      !image.value.slice(-5).includes(".jpeg")
    ) {
      errores.image =
        "La imágen debe tener un formato válido (.jgp, .png .jpeg)";
    } else if (dispatch[0].checked === false && dispatch[1].checked === false) {
      errores.dispatch = "Debes elegir una opción";
    } else if (discount.value.length < 1) {
      errores.discount =
        "Debes indicar el descuento a aplicar. Ingresa un número entre 0 y 100";
    } else if (isNaN(discount.value) || (parseInt(discount.value) < 0) || (parseInt(discount.value) >= 100)) {

      errores.discount =
        "Debes ingresar un numero entre 0 y 99";
    } else if (stock.value.length < 1) {
      errores.stock = "Debes completar el stock inicial";
    } else if (isNaN(stock.value)) {
      "Ingresa solo números";
    }
    if (Object.keys(errores).length >= 1) {
      nameError.innerText = errores.name ? errores.name : "";
      categoryError.innerText = errores.category ? errores.category : "";
      brandError.innerText = errores.brand ? errores.brand : "";
      shortDescError.innerText = errores.shortDesc ? errores.shortDesc : "";
      longDescError.innerText = errores.longDesc ? errores.longDesc : "";
      colorError.innerText = errores.color ? errores.color : "";
      priceError.innerText = errores.price ? errores.price : "";
      imageError.innerText = errores.image ? errores.image : "";
      discountError.innerText = errores.discount ? errores.discount : "";
      dispatchError.innerText = errores.dispatch ? errores.dispatch : "";
      stockError.innerText = errores.stock ? errores.stock : "";
      dispatchError.innerText = errores.dispatch ? errores.dispatch : "";
    } else {
      form.submit();
    }
  });
});
