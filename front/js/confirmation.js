const orderNumber = getDataFromURL("orderId");
document.querySelector("#orderId").innerHTML = orderNumber;
localStorage.clear();
