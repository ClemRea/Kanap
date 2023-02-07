let cart = JSON.parse(localStorage.getItem("products"));

if (!cart) {
  document.querySelector("h1").innerText = "Votre panier est vide !";
} else {
  fetch("http://localhost:3000/api/products/")
    .then((reponse) => reponse.json())
    .then((allProducts) => {
      const products = builCompleteList(cart, allProducts);
      afficherPanier(products);
      listenForQtyUpdate(products);
      supprimerProduit(cart, products);
      afficherTotal(products);
    });
}

// Fonction pour créer la liste complète des éléments
function builCompleteList(cart, allProducts) {
  const list = [];
  cart.forEach((itemOfCart) => {
    const fullProduct = allProducts.find((a) => a._id === itemOfCart.id);
    list.push({
      id: itemOfCart.id,
      quantite: itemOfCart.quantite,
      couleur: itemOfCart.couleur,
      altTxt: fullProduct.altTxt,
      colors: fullProduct.colors,
      description: fullProduct.description,
      imageUrl: fullProduct.imageUrl,
      name: fullProduct.name,
      price: fullProduct.price,
    });
  });
  return list;
}

// Fonction afficher les produits du panier
function afficherPanier(products) {
  let html = "";
  products.forEach((product) => {
    html += render(product);
  });

  document.querySelector("#cart__items").innerHTML = html;
}

// Fonction pour afficher l'html sur la page
function render(product) {
  return `
  <article
  class="cart__item"
  data-id="${product.id}"
  data-color="${product.couleur}"
>
    <div class="cart__item__img">
      <img
        src="${product.imageUrl}"
        alt="${product.altTxt}"
      />
    </div>
    <div class="cart__item__content">
      <div class="cart__item__content__description">
      <h2>${product.name}</h2>
      <p>${product.couleur}</p>
      <p>${product.price} €</p>
    </div>
      <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
        <p>Qté :</p>
        <input
          type="number"
          class="itemQuantity"
          name="itemQuantity"
          min="1"
          max="100"
          value="${product.quantite}"
        />
      </div>
      <div class="cart__item__content__settings__delete">
        <p class="deleteItem">Supprimer</p>
      </div>
    </div>
  </div>
</article>`;
}

// Fonction pour savoir si on ajoute une quantité
function listenForQtyUpdate(products) {
  products.forEach((product) => {
    document
      .querySelector(
        `.cart__item[data-id="${product.id}"][data-color = "${product.couleur}"] .itemQuantity`
      )
      .addEventListener("input", () => {
        const quantite = document.querySelector(".itemQuantity").value;
        console.log(quantite);
        if (quantite < 1 || quantite > 100) {
          alert("Merci d'entrer une quantité comprise entre 1 et 100");
          return;
        }
      });
  });
}

// Fonction pour afficher le total des prix des articles
function afficherTotal(cart, products) {
  // Afficher le total des prix
  let listePrix = [];
  for (i = 0; i < cart.length; i++) {
    const prixInCart = cart[i].price;
    listePrix.push(prixInCart);
  }
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  const totalPrix = listePrix.reduce(reducer);
  document.querySelector("#totalPrice").innerText = totalPrix;

  // Afficher le total des articles
  let listeArticle = [];
  for (j = 0; j < cart.length; j++) {
    const quantityInCart = cart[j].quantite;
    const quantityInt = parseInt(quantityInCart);
    listeArticle.push(quantityInt);
  }
  const totalArticle = listeArticle.reduce(reducer);
  document.querySelector("#totalQuantity").innerHTML = totalArticle;
}

// Fonction poue supprimer un produit du panier
function supprimerProduit(cart, products) {
  const supprimer = document.querySelectorAll(
    ".cart__item__content__settings__delete"
  );
  // console.log("supprimer", supprimer);

  for (k = 0; k < supprimer.length; k++) {
    supprimer[k].addEventListener("click", () => {
      const supprimerId = cart[k];
      // console.log("supprimerId", supprimerId);
    });
  }
}
