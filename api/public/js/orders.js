window.addEventListener('load', (e) => {
    
    const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    let tableBody = document.querySelector('.cart-orders__tbody');
    fetch('/api/cart/orders')
    .then(results => results.json())
    .then(orders => {
        let allOrders = orders.orders;
        // Si vienen ordenes renderizamos c/u en 1 <tr>...
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
            // Sino limpiamos el HTML
            emptyOrders()
        }
    })

    function emptyOrders() {
        tableBody.innerHTML =
        `
        <p>No cuentas con ordenes cargadas por el momento!</p>
        `
    }

    // Aprovechamos el createdAt, nos quedamos solo con el DATE, descartamos el TIME.
    // En cada <tr> para cada orden, vamos a crear un <a> que lleve al listado de order-details
    function renderOrders(orders) {
        orders.forEach((order, i) => {
            let orderRow = document.createElement('tr');
            orderRow.setAttribute('class', 'cart-orders__row');
            orderRow.classList.add(`cart-orders__row-${i}`)
            let creationTime = new Date();

            // let creationTime2 = order.created_at;
            // <td>${creationTime2.substring(0,10)}</td>
            orderRow.innerHTML= 
            `
                <td>${creationTime.toLocaleDateString('es-ES')}</td>
                <td>${order.shippingAddress}</td>
                <td>${order.paymentMethod}</td>
                <td>$${toThousand(order.amount)}</td>
                <td><a href="/cart/orders/details/${order.id}"">Ver</a></td>
            `
            tableBody.append(orderRow)
        
        })
    }

})