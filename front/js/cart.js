let produitDansLeLocalStorage = JSON.parse(localStorage.getItem("product"));

fetch("http://localhost:3000/api/products/")
  .then((reponse) => reponse.json())
  .then((product) => {
    afficherPanier(product);
  });

const positionElement = document.querySelector("#cart__items");

// Afficher les produits du panier
let structurePanier = [];

function afficherPanier(product) {
  if (produitDansLeLocalStorage === null) {
    const panierVide = document.querySelector("h1");
    return (panierVide.innerText = "Votre panier est vide !");
  } else {
    console.log("panier pas vide");
    for (let i = 0; i < produitDansLeLocalStorage.length; i++) {
      const imageProduit = document.createElement("img");
      imageProduit.setAttribute("src", product.imageUrl[i]);
      imageProduit.setAttribute("alt", product.altTxt[i]);
      document.querySelector(".cart__item__img").appendChild(imageProduit);

      const nomElement = document.createElement("h2");
      nomElement.innerText =
        produitDansLeLocalStorage.nom[i].appendChild(nomElement);

      const prixElement = document.createElement("span");
      prixElement.innerText = product.price[i];

      const quantite = document.createElement("p");
      quantite.innerText = produitDansLeLocalStorage.quantite[i];
      if (i == produitDansLeLocalStorage.length) {
        positionElement.innerHTML = structurePanier;
      }
    }
  }
}
