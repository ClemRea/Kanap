// Fonction pour Générer les Porduits
function genererCanap() {
  fetch("http://localhost:3000/api/products")
    .then((reponse) => reponse.json())
    .then((data) => {
      for (produits in data) {
        const listeProduits = data;
        console.log(listeProduits);

        const items = document.querySelector(".items");

        const lienProduit = document.createElement("a");
        lienProduit.href = `product.html?id=${listeProduits[produits]._id}`;

        const articles = document.createElement("article");
        lienProduit.appendChild(articles);

        const imageProduit = document.createElement("img");
        imageProduit.setAttribute("src", listeProduits[produits].imageUrl);
        imageProduit.setAttribute("alt", listeProduits[produits].altTxt);

        const titreProduit = document.createElement("h3");
        titreProduit.innerHTML = listeProduits[produits].name;

        const descriptionProduit = document.createElement("p");
        descriptionProduit.innerText = listeProduits[produits].description;

        items.appendChild(lienProduit);

        articles.appendChild(imageProduit);
        articles.appendChild(titreProduit);
        articles.appendChild(descriptionProduit);
      }
    });
}
genererCanap();
