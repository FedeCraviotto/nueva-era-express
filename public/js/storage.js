window.addEventListener('load', async (e) => {
    let addToCartButtons = document.querySelectorAll('.btn-addToCart');
    let cartItemCounter = document.querySelector('.cart-item-counter');

    function refreshCounter() {
        cartItemCounter.innerText = sessionStorage.cart
            ? JSON.parse(sessionStorage.cart).length
            : 0;
    }
    
    addToCartButtons.forEach((button) => {
        button.addEventListener('click', (e) => {
            e.preventDefault()
            if (sessionStorage.cart) {
                let cart = JSON.parse(sessionStorage.cart);
                let productIndex = cart.findIndex(
                    (product) => product.id == e.target.dataset.id
                );
                if (productIndex != -1) {
                    cart[productIndex].q++;
                    cartToast.fire({
                        icon: 'info',
                        title: `Actual item quantity: ${cart[productIndex].q}`,
                    });
                } else {
                    cart.push({ id: e.target.dataset.id, q: 1 });
                    cartToast.fire({
                        icon: 'success',
                        title: `Item added to cart`,
                    });
                }
                sessionStorage.setItem('cart', JSON.stringify(cart));
                navigator.sendBeacon(
                    'https://nueva-era-express-fnc.onrender.com/api/cart/update_cart',
                    sessionStorage.getItem('cart')
                    );
            } else {
                sessionStorage.setItem(
                    'cart',
                    JSON.stringify([{ id: e.target.dataset.id, q: 1 }])
                );
                navigator.sendBeacon(
                    'https://nueva-era-express-fnc.onrender.com/api/cart/update_cart',
                    sessionStorage.getItem('cart')
                    );
                cartToast.fire({
                    icon: 'success',
                    title: `Item added to cart`,
                });
            }
            cartItemCounter.innerText =
                JSON.parse(sessionStorage.cart).length || 0;
        });
    });

    const cartToast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
    });

    refreshCounter();

    if (!sessionStorage.getItem('cart')) {
        await fetch('https://nueva-era-express-fnc.onrender.com/api/users/cart')
            .then((userJson) => userJson.json())
            .then((userData) => {
                if (!userData.error) {
                    userData = JSON.parse(userData);
                    if (userData.length != 0) {                        
                        sessionStorage.setItem('cart', JSON.stringify(userData));
                        refreshCounter();
                    }
                } else if (userData.error) {
                    throw new Error('No user logged yet');
                }
            }).catch(err => {
                throw new Error('Something happened while processing your request');
            });
    } 

    addEventListener('visibilitychange', (event) => {
        if (document.visibilityState === 'hidden') {
            if (sessionStorage && sessionStorage.getItem('cart')!== null) {
                navigator.sendBeacon(
                    'https://nueva-era-express-fnc.onrender.com/api/cart/update_cart',
                    sessionStorage.getItem('cart')
                );
            }
        }
    });
});
