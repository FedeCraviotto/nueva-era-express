window.addEventListener('load', (e) => {
    
    const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    let tableBody = document.querySelector('.cart-orders__tbody');
    fetch('/api/cart/orders')
    .then(results => results.json())
    .then(orders => {
        let allOrders = orders.orders;

        if (allOrders && allOrders.length > 0) {
            tableBody.innerHTML =
            `
            <tr class="cart-orders__row">
                <th>Fecha</th>
                <th>Domicilio</th>
                <th>Método de pago</th>
                <th>Total</th>
                <th>Detalles</th>
            </tr>
            `;
            renderOrders(allOrders)
        } else {

            emptyOrders()
        }
    }).catch(err => {
        res.status(500).json({
            message: 'Something happened while processing your request',
            error: err
        });
    });

    function emptyOrders() {
        tableBody.innerHTML =
        `
        <p>No cuentas con ordenes cargadas por el momento!</p>
        `
    }

    function renderOrders(orders) {
        orders.forEach((order, i) => {
            let orderRow = document.createElement('tr');
            orderRow.setAttribute('class', 'cart-orders__row');
            orderRow.classList.add(`cart-orders__row-${i}`)
            let creationTime = new Date();

            orderRow.innerHTML= 
            `
                <td>${creationTime.toLocaleDateString('es-ES')}</td>
                <td>${order.shippingAddress}</td>
                <td>${order.paymentMethod}</td>
                <td>$${toThousand(order.amount)}</td>
                <td><a href="/cart/orders/details/${order.id}"">Ver</a></td>
            `
            tableBody.append(orderRow)
        });
    };

})