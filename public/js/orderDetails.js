window.addEventListener('load', (e) => {
    
    const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    let tableBody = document.querySelector('.order-details__tbody');
    let passedOrderId = location.pathname.substring(21);

    fetch(`/api/cart/orders/details/${passedOrderId}`)
    .then(results => results.json())
    .then(data => {
        let orderDetails = data.orderDetails;
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
    .catch(err => {
        throw new Error('Something happened while processing your request');
    });

});