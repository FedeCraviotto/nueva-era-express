window.addEventListener('load', (e) => {
    const toThousand = (n) =>
        n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    let cart;
    let createdOrderId;
    let cartContainer = document.querySelector('.cart');
    let cartBody = document.querySelector('.cart__body');
    let totalAmountOutput = document.querySelector(
        '.cart-subtotal__total-amount'
    );
    let fetchedProducts = [];

    let cartItemCounter = document.querySelector('.cart-item-counter');

    if (sessionStorage.cart && sessionStorage.cart.length > 2) {
        cart = JSON.parse(sessionStorage.cart) || [];
        cart.forEach((item, i) => {
            fetch(`/api/products/${item.id}`)
                .then((result) => result.json())
                .then((data) => {
                    if (data) {
                        product = data.product;
                        cartBody.innerHTML +=
                            `
                <article class='cart-item cart-item${item.id} '>
                <div class="cart-item__img-container">
                <img src="../images/products/${product.image}" alt="${
                                product.name
                            }">
                </div>
                
                <div class="cart-item__desc">

                    <div class="cart-item__upper-desc">
                    <p class="cart-item__name">${product.name}</p>
                    <div>
                    <p class="cart-item__color"> ${
                        product.name
                    }</p> <a class="cart-item__color-picklist">${
                                product.color
                            }</a>
                    <span class="cart-item__dispatch">${
                        product.dispatch == 1 ? 'Envío Gratis' : ''
                    }</span>
                    </div>
                    </div>
                    
                    <div class="cart-item__lower-desc">
                    <div class="cart-item__quantity-and-trash">
                    <i class="fa-solid fa-arrow-up" data-pid="${item.id}"></i>
                    <span class="cart-item__quantity">Q. <span class="cart-item__quantity${
                        item.id
                    }"> ${item.q}</span></span>
                    <i class="fa-solid fa-arrow-down" data-pid="${item.id}"></i>
                    <a class='item--cursor-pointer'><i class="fa-solid fa-trash-can" data-pid="${
                        item.id
                    }"></i></a>
                    <p class="cart-item--green"> <span class="cart-item__price">$ ${toThousand(
                        parseInt((product.price * (100 - product.discount))/100)
                    )}</span></p>
                    </div>
                    <p class="cart-item__total-price">$ <span class="cart-item__total-price${item.id}">${toThousand(parseInt(((product.price * (100 - product.discount))/100) * item.q))}</span></p>
                    </div>
                    
                </div>
                </article>
                `;

                        fetchedProducts.push({
                            id: product.id,
                            price: product.price,
                            discount: product.discount,
                            q: item.q,
                        });
                    } else {
 
                        cart.splice(i, 1);

                        sessionStorage.setItem('cart', JSON.stringify(cart));
                    }
                })

                .then((r) => {
                    updateTotal();

                    let btnTrash = document.querySelectorAll('.fa-trash-can');
                    btnTrash.forEach((button, i) => {
                        button.addEventListener('click', (e) => {
                            let idProd = e.target.dataset.pid;
                            removeItemFromCart(idProd, cart);
                        });
                    });

                    let btnRaiseQuantity =
                        document.querySelectorAll('.fa-arrow-up');
                    btnRaiseQuantity.forEach((button) => {
                        button.addEventListener('click', (e) => {
                            let idProd = e.target.dataset.pid;
                            raiseQuantity(idProd, cart);
                        });
                    });

                    let btnLowerQuantity =
                        document.querySelectorAll('.fa-arrow-down');
                    btnLowerQuantity.forEach((button) => {
                        button.addEventListener('click', (e) => {
                            let idProd = e.target.dataset.pid;
                            lowerQuantity(idProd, cart);
                        });
                    });
                })
                .catch(err => {
                    throw new Error('Something happened while processing your request');
                });
        });

        cartContainer.addEventListener('submit', (e) => {
            e.preventDefault();
            let paymentMethod = document.querySelector("#paymentMethod");
            let paymentMethodError = document.querySelector("#paymentMethodError");
            let city = document.querySelector("#city");
            let cityError = document.querySelector("#cityError");
            let street = document.querySelector("#street");
            let streetError = document.querySelector("#streetError");
            let phone = document.querySelector("#phone");
            let phoneError = document.querySelector("#phoneError");

            let errores = {};


            if (city.value == "") {
                errores.city = "Debes elegir una localidad";
            } else if (street.value.length < 1) {
                errores.street = "Debes ingresar una direccion de envio";
            } else if (paymentMethod.value == "") {
                errores.paymentMethod = "Debes elegir un metodo de pago";
            } else if ((phone.value.length < 8) || isNaN(parseInt(phone.value))) {
                errores.phone = "Ingresa un telefono de contacto. Entre 8 numeros y 14";
            } else if (phone.value.length > 14) {
                errores.phone = "Ingresa un telefono de contacto. Entre 8 numeros y 14";
            }
            

            if (Object.keys(errores).length >= 1) {
                paymentMethodError.innerText = errores.paymentMethod ? errores.paymentMethod : "";
                cityError.innerText = errores.city ? errores.city : "";
                streetError.innerText = errores.street ? errores.street : "";
                phoneError.innerText = errores.phone ? errores.phone : "";
            } else {
                
            let fullShippingAddress = street.value + ', ' + city.value;
            let formData = {
                amount: parseFloat(getSubtotal(fetchedProducts)),
                shippingAddress: fullShippingAddress,
                phone: phone.value,
                paymentMethod: paymentMethod.value,
            };
            let config = {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                body: JSON.stringify(formData),
            };

            createOrderAndOrderDetails(config);
        }
        });

    } else {
        renderEmptyCart();
    }

    async function createOrderAndOrderDetails(config) {
        let orderRawResponse = await fetch(`/api/cart/orders/create`, config);
        let parsedOrderResponse = await orderRawResponse.json();
        createdOrderId = parsedOrderResponse.order.id;

        vaciarStorage();

        fetchedProducts.forEach((product) => {
            let config2 = {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                body: JSON.stringify({
                    order_id: createdOrderId,
                    product_id: product.id,
                    quantity: product.q,
                }),
            };
            fetch(`/api/cart/orders/createDetails`, config2)
                .then((response) => response.json())
                .then((parsedResponse) => {
                    cartToast.fire({
                        toast: false,
                        icon: 'success',
                        title: `Order submitted`,
                        text: 'Redirecting...',
                        position: 'center',
                        backdrop: true,
                        didClose: () => {
                            Swal.showLoading();
                            window.location.href = `/cart/orders/details/${createdOrderId}`;
                        },
                    });
                }).catch(err => {
                    throw new Error('Something happened while processing your request');
                });
        });
    }

    function getSubtotal(products) {
        return products.reduce((acum, elem) => {
            return (acum += parseInt(((elem.price * (100 - elem.discount))/100) * elem.q));
        }, 0);
    }

    function vaciarStorage() {
        sessionStorage.setItem('cart', JSON.stringify([]));
        navigator.sendBeacon(
            'https://localhost:3000/api/cart/update_cart',
            '[]'
        );
        renderEmptyCart();
    }

    function removeItemFromCart(pId, cart) {
        if (cart.length > 1) {
            let productIndex = cart.findIndex((product) => product.id == pId);
            let productIndexInFetched = fetchedProducts.findIndex((product) => product.id == pId);

            cart.splice(productIndex, 1);
            fetchedProducts.splice(productIndexInFetched, 1);
            sessionStorage.setItem('cart', JSON.stringify(cart));

            navigator.sendBeacon(
                'https://localhost:3000/api/cart/update_cart',
                sessionStorage.getItem('cart')
                );
            let itemInCart = document.querySelector(`.cart-item${pId}`);
            itemInCart.remove();

            refreshCounter();
            cartToast.fire({
                icon: 'warning',
                title: `Item removed from the cart`,
            });
        } else {

            sessionStorage.setItem('cart', '[]');
            navigator.sendBeacon(
                'https://localhost:3000/api/cart/update_cart',
                JSON.stringify([])
                );
            fetchedProducts = [];

            vaciarStorage();
            cartToast.fire({
                icon: 'info',
                title: 'You have emptied your cart',
            });
        }
        updateTotal();
    }

    function renderEmptyCart() {
        cartContainer.innerHTML = `
        <div>
            <p class="cart-subtotal__text">No tienes agregado ningún producto al carrito de compras</p>
            <a href="/products" class="btn btn-product-edit btn-anchor">Buscar productos</a>
        </div>
        `;
        refreshCounter();
    }

    function refreshCounter() {
        cartItemCounter.innerText = sessionStorage.cart
            ? JSON.parse(sessionStorage.cart).length
            : 0;
    }

    function checkCart() {
        cart = sessionStorage.cart ? JSON.parse(sessionStorage.cart) : [];
    }
    function updateTotal() {
        totalAmountOutput.innerText = `$${toThousand(
            parseInt(getSubtotal(fetchedProducts))
        )}`;
    }

    function updateItemSubtotal(pId, pIndex) {
        let itemSubtotal = document.querySelector(
            `.cart-item__total-price${pId}`
        );
        itemSubtotal.innerText = toThousand(parseInt(((fetchedProducts[pIndex].price * (100 - fetchedProducts[pIndex].discount))/100) * fetchedProducts[pIndex].q))
        
    }

    const cartToast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
    });

    function lowerQuantity(pId, cart) {
        let productIndex = cart.findIndex((product) => product.id == pId);
        let productIndexInFetched = fetchedProducts.findIndex((product) => product.id == pId);
        if (cart[productIndex].q == 1) {
            cart.splice(productIndex, 1);
            fetchedProducts.splice(productIndexInFetched, 1);
            sessionStorage.setItem('cart', JSON.stringify(cart));
            navigator.sendBeacon(
                'https://localhost:3000/api/cart/update_cart',
                sessionStorage.getItem('cart')
                );
            let itemInCart = document.querySelector(`.cart-item${pId}`);
            itemInCart.remove();
            refreshCounter();
            cartToast.fire({
                icon: 'warning',
                title: `Item removed from the cart`,
            });
            if (cart.length == 0) {
                sessionStorage.setItem('cart', JSON.stringify([]));
                navigator.sendBeacon('https://localhost:3000/api/cart/update_cart', sessionStorage.getItem('cart'));
                fetchedProducts = [];

                renderEmptyCart();
                cartToast.fire({
                    icon: 'info',
                    title: 'You have emptied your cart',
                });
            }
        } else {
            --cart[productIndex].q;
            --fetchedProducts[productIndexInFetched].q;
            updateQuantities(pId, 'lower');
            sessionStorage.setItem('cart', JSON.stringify(cart));
            navigator.sendBeacon(
                'https://localhost:3000/api/cart/update_cart',
                sessionStorage.getItem('cart')
                );
            refreshCounter();

            cartToast.fire({
                icon: 'info',
                title: 'Quantity decreased',
            });
            updateItemSubtotal(pId, productIndexInFetched);
        }
        updateTotal();
    }
    function raiseQuantity(pId, cart) {
        let productIndex = cart.findIndex((product) => product.id == pId);
        let productIndexInFetched = fetchedProducts.findIndex((product) => product.id == pId);
        ++cart[productIndex].q;
        ++fetchedProducts[productIndexInFetched].q;
        sessionStorage.setItem('cart', JSON.stringify(cart));
        navigator.sendBeacon(
            'https://localhost:3000/api/cart/update_cart',
            sessionStorage.getItem('cart')
            );
        updateQuantities(pId, 'raise');
        refreshCounter();
        updateItemSubtotal(pId, productIndexInFetched);
        updateTotal();
        cartToast.fire({
            icon: 'info',
            title: 'Quantity increased!',
        });
    }
    function updateQuantities(pId, action) {
        let itemQ = document.querySelector(`.cart-item__quantity${pId}`);
        let qNumber = Number(itemQ.innerText);
        if (action == 'raise') {
            itemQ.innerText = ++qNumber;
        } else if (action == 'lower') {
            itemQ.innerText = --qNumber;
        }
    }

    checkCart();    
});
