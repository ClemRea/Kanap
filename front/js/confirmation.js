const orderNumber = getDataFromURL("orderId");
console.log(orderNumber);
document.querySelector("#orderId").innerHTML = orderNumber;
localStorage.clear();
