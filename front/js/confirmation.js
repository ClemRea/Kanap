// Fonction pour générer le numéro de la commande
function generateOrderID() {
  let orderNumber = "";
  const characters = "0123456789";
  const charactersLength = characters.length;

  for (i = 0; i < 10; i++) {
    orderNumber += characters.charAt(
      Math.floor(Math.random() * charactersLength)
    );
  }
  return orderNumber;
}

// Fonction Pour afficher le numéro de la commande
function displayOrderID(orderNumber) {
  orderNumber = generateOrderID();
  document.querySelector("#orderId").innerHTML = orderNumber;
}
displayOrderID();
