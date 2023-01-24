// Récupérer l'id de l'article à partir de l'url
const id = getIdFromULR();

// On récupère les données de l'API
fetch("http://localhost:3000/api/products/" + id)
  .then((reponse) => reponse.json())
  .then((product) => {
    displayProduct(product);
  });

// Fonction pour Générer les Porduits
function getIdFromULR() {
  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });
  return params.id;
}

// Fonction pour afficher les éléments
function displayProduct(product) {
  const imageProduit = document.createElement("img");
  imageProduit.setAttribute("src", product.imageUrl);
  imageProduit.setAttribute("alt", product.altTxt);
  document.querySelector(".item__img").appendChild(imageProduit);

  const prix = document.createElement("p");
  prix.innerText = product.price;
  document.querySelector("#price").appendChild(prix);

  const descriptionProduit = document.createElement("p");
  descriptionProduit.innerText = product.description;
  document.querySelector("#description").appendChild(descriptionProduit);
}

const choixCouleur = document.querySelector("#colors");
