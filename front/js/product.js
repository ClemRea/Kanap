// Récupérer l'id de l'article à partir de l'url
const id = getIdFromULR();

// On récupère les données de l'API
fetch("http://localhost:3000/api/products/" + id)
  .then((reponse) => reponse.json())
  .then((product) => {
    displayProduct(product);
    listenForCartAddittion(product);
  });

// Fonction pour Générer les Porduits depuis le lien
function getIdFromULR() {
  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });
  return params.id;
}

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
  prix.innerText = product.price;
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

    alert("Produit bien ajouté au panier !");

    const canap = {
      id: id,
      couleur: color,
      quantite: quantite,
    };

    // On ajoute les produits au LocalStorage
    const ajouterAuLocalStorage = () => {
      cart.push(canap);
      localStorage.setItem("products", JSON.stringify(cart));
    };

    // On récupère les donées du LS
    let cart = JSON.parse(localStorage.getItem("products"));

    // On ajoute les produits au LS
    // for (let i = 0; i < cart.length; i++) {
    //   let findProduct = cart.find((a) => a.id === product._id);
    //   console.log("findProduct", findProduct.id);
    //   if (findProduct != undefined) {
    //     console.log("cart", cart[i].quantite);
    //     cart[i].quantite += quantite;
    //     return;
    //   } else {
    //     cart = [];
    //     ajouterAuLocalStorage();
    //     return;
    //   }
    // }
    if (cart) {
      ajouterAuLocalStorage();
    } else {
      cart = [];
      ajouterAuLocalStorage();
    }
  });
}
