const INFOS_CONTAINER = document.querySelector('#infosContainer');

const order = getOrderContact();
const totalPrice = getOrderPrice();

console.log(order.orderId);
console.log(totalPrice);

// function displayOrderInfos(contact, price) {
//     const TEMPLATE = `<span class="d-flex flex-column align-items-center border px-3">
//                         <p class="m-0 py-3">N° de commande : ${contact.orderId}</p>
//                         <p class="m-0 pb-3">Prix total : ${price}</p>
//                         </span>`;
//     INFOS_CONTAINER.insertAdjacentHTML('afterbegin',TEMPLATE);
// }

setTimeout( function(){
    const TEMPLATE = `<span class="d-flex flex-column align-items-center border px-3">
                        <p class="m-0 py-3">N° de commande : ${order.orderId}</p>
                        <p class="m-0 pb-3">Prix total : ${totalPrice}</p>
                        </span>`;
    INFOS_CONTAINER.insertAdjacentHTML('afterbegin',TEMPLATE);
    document.querySelector('#spinner').classList.add('visibility');
}, 2000);