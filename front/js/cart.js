let produitsDansLeLocalStorage = JSON.parse(localStorage.getItem("product"));

fetch("http://localhost:3000/api/products/")
  .then((reponse) => reponse.json())
  .then((product) => {
    afficherPanier(product);
  });

const positionElement = document.querySelector("#cart__items");

// Afficher les produits du panier
function afficherPanier(product) {
  if (produitsDansLeLocalStorage === null) {
    const panierVide = document.querySelector("h1");
    return (panierVide.innerText = "Votre panier est vide !");
  } else {
    produitsDansLeLocalStorage.forEach((produitsDansLeLocalStorage) => {
      const idProduit = produitsDansLeLocalStorage.id;

      let productFromApi = product.find((produit) => produit._id === idProduit);
      const imageUrl = productFromApi.imageUrl;
      const prixProduit = productFromApi.price;
      const altTxt = productFromApi.altTxt;

      const imageProduit = document.createElement("img");
      imageProduit.setAttribute("src", imageUrl);
      imageProduit.setAttribute("alt", altTxt);
      document.getElementById("cart__items").appendChild(imageProduit);

      const nomElement = document.createElement("h2");
      // nomElement.innerText =
      //   produitsDansLeLocalStorage.nom.appendChild(nomElement);
      // document.querySelector(".cart__item__content");

      const prixElement = document.createElement("span");
      prixElement.innerText = prixProduit;

      const quantite = document.createElement("p");
      quantite.innerText = produitsDansLeLocalStorage.quantite;
    });
  }
}
