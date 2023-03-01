window.addEventListener('load', (e) => {
    
    const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    // Tabla a la cual van a inyectarse los tableRows, 1 por cada order-detail
    let tableBody = document.querySelector('.order-details__tbody');
    // Extraigo lo que hay después del root de la URL, y el ID va a estar siempre luego de los 21 carateres
    let passedOrderId = location.pathname.substring(21);

    fetch(`/api/cart/orders/details/${passedOrderId}`)
    .then(results => results.json())
    .then(data => {
        let orderDetails = data.orderDetails; // Cuestión de comodidad
        // Toda las ordenes, si o si, tienen que tener al menos 1 order detail
        // Por cada order detail, renderizamos un <tr/>
        if (orderDetails) {
            orderDetails.forEach((detail, i) => {

                let detailRow = document.createElement('tr');
                detailRow.setAttribute('class', 'order-details__row');
                detailRow.innerHTML= 
                `
                <td>${detail.id}</td>
                <td>${detail.Product.name}</td>
                <td>${detail.quantity}</td>
                <td>$ ${toThousand((detail.Product.price))}</td>            
                `
                tableBody.append(detailRow)
            })
        }
    })

})