// Récupérer l'id de l'article à partir de l'url
const id = getDataFromURL("id");

// On récupère les données de l'API
fetch("http://localhost:3000/api/products/" + id)
  .then((reponse) => reponse.json())
  .then((product) => {
    displayProduct(product);
    listenForCartAddittion(product);
  })
  .catch((e) => {
    document.querySelector("main").remove();
    alert("Ce produti n'existe pas");
    document.location.href = "index.html";
  });

// Fonction pour afficher les éléments
function displayProduct(product) {
  const titreProduit = document.createElement("h1");
  titreProduit.innerText = product.name;
  document.querySelector("#title").appendChild(titreProduit);

  const imageProduit = document.createElement("img");
  imageProduit.setAttribute("src", product.imageUrl);
  imageProduit.setAttribute("alt", product.altTxt);
  document.querySelector(".item__img").appendChild(imageProduit);

  const prix = document.createElement("span");
  prix.innerText = price(product.price);
  document.querySelector("#price").appendChild(prix);

  const descriptionProduit = document.createElement("p");
  descriptionProduit.innerText = product.description;
  document.querySelector("#description").appendChild(descriptionProduit);

  // Récupération de la couleur choisie
  const choixCouleur = document.querySelector("#colors");
  product.colors.forEach((color) => {
    const option = document.createElement("option");
    option.innerText = color;
    option.setAttribute("value", color);
    choixCouleur.appendChild(option);

    // Afficher le nom du produit dans la balise titre
    document.querySelector(".title").innerText = product.name;
  });
}

// Fonction pour vérifier si les éléments sont valides et les ajoutes au panier
function listenForCartAddittion(product) {
  document.querySelector("#addToCart").addEventListener("click", () => {
    const color = document.querySelector("#colors").value;

    // Vérification si la couleur est valide
    if (color === "") {
      alert("Merci de sélectionner une couleur");
      return;
    }

    const quantite = document.querySelector("#quantity").value;

    // Vérification si la quantité est valide
    if (quantite < 1 || quantite > 100) {
      alert("Merci d'entrer une quantité comprise entre 1 et 100");
      return;
    }

    // On ajoute les produits au LS
    if (has("products")) {
      const products = [];
      const canap = {
        id: product._id,
        couleur: color,
        quantite: Number(quantite),
      };
      products.push(canap);
      store("products", products);
    } else {
      let cart = get("products");
      let findProduct = cart.find(
        (a) => a.id === product._id && a.couleur === color
      );
      if (findProduct) {
        findProduct.quantite = Number(findProduct.quantite) + Number(quantite);
        if (findProduct.quantite < 1 || findProduct.quantite > 100) {
          alert("La quantité maximale du panier est de 100 articles");
          window.location.reload();
          return;
        }
        store("products", cart);
      } else {
        let cart = get("products");
        const canap = {
          id: product._id,
          couleur: color,
          quantite: Number(quantite),
        };
        cart.push(canap);
        store("products", cart);
      }
    }
    return alert("Produit bien ajouté au panier !");
  });
}
