const INFOS_CONTAINER = document.querySelector('#infosContainer');
const order = getOrderContact();
const totalPrice = getOrderPrice();

// Displays order's infos after small delay
setTimeout(function(){
    const TEMPLATE = `<span class="d-flex flex-column align-items-center text-center border shadow-sm px-3">
                        <p class="m-0 py-3">N° de commande : ${order.orderId}</p>
                        <p class="m-0 pb-3">Prix total : ${totalPrice} €</p>
                        </span>`;
    INFOS_CONTAINER.insertAdjacentHTML('afterbegin',TEMPLATE);
    document.querySelector('#spinner').classList.add('visibility');
    localStorage.clear();
}, 1000);