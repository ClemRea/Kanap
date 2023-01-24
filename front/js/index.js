// Fonction pour Générer les Porduits

fetch("http://localhost:3000/api/products")
  .then((reponse) => reponse.json())
  .then((products) => {
    products.forEach((product) => {
      displayProduct(product);
    });
  });

function displayProduct(product) {
  const items = document.querySelector(".items");

  const lienProduit = document.createElement("a");
  lienProduit.href = `product.html?id=${product._id}`;

  const articles = document.createElement("article");
  lienProduit.appendChild(articles);

  const imageProduit = document.createElement("img");
  imageProduit.setAttribute("src", product.imageUrl);
  imageProduit.setAttribute("alt", product.altTxt);

  const titreProduit = document.createElement("h3");
  titreProduit.innerHTML = product.name;

  const descriptionProduit = document.createElement("p");
  descriptionProduit.innerText = product.description;

  items.appendChild(lienProduit);

  articles.appendChild(imageProduit);
  articles.appendChild(titreProduit);
  articles.appendChild(descriptionProduit);
}
