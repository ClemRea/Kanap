let cart = get("products");

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
      soumettreFormulaire();
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
      .addEventListener("input", (e) => {
        const quantite = e.target.value;
        if (quantite < 1 || quantite > 100) {
          alert("Merci d'entrer une quantité comprise entre 1 et 100");
          return;
        }
        if (!has("products")) {
          let cart = get("products");
          let findProduct = cart.find(
            (a) => a.id === product.id && a.couleur === product.couleur
          );
          if (findProduct) {
            findProduct.quantite =
              Number(findProduct.quantite) + (quantite - findProduct.quantite);
            store("products", cart);
          }
        }
      });
  });
}
// Fonction pour afficher le total des prix des articles
function afficherTotal(cart) {
  let totalArticle = 0;
  let prixParQuantite = 0;
  let totalPrix = [];

  // Récuperer et afficher la quantité des article dans le panier
  cart.forEach((e) => {
    totalArticle += e.quantite;
  });
  document.querySelector("#totalQuantity").innerHTML = totalArticle;

  // Récupérer le prix des articles
  cart.forEach((f) => {
    const prix = f.price;
    const quantite = f.quantite;
    prixParQuantite = prix * quantite;

    // On ajoute le total des prix par la quantité dans la liste totalPrix
    totalPrix.push(prixParQuantite);
  });

  // On fait la somme de tout les articles dans le panier, et on les affiche dans le html
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  const prixAfficher = totalPrix.reduce(reducer);
  document.querySelector("#totalPrice").innerText = prixAfficher;
}

// Fonction pour supprimer un produit du panier
function supprimerProduit(cart, products) {
  // cart.forEach((i) => {
  //   document
  //     .querySelectorAll(".cart__item__content__settings__delete")
  //     .addEventListener("click", (e) => {
  //       const supprimer = e.target.value;
  //       console.log(supprimer);
  //     });
  // });
}

// Fonction pour soumettre le formulaire à l'api
function soumettreFormulaire() {
  const selectForm = document.querySelector(".cart__order__form");
  selectForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const form = {
      firstName: e.target.querySelector("#firstName").value,
      lastName: e.target.querySelector("#lastName").value,
      adresse: e.target.querySelector("#address").value,
      city: e.target.querySelector("#city").value,
      email: e.target.querySelector("#email").value,
    };
    const chargUtile = JSON.stringify(form);
    fetch("http://localhost:3000/api/products/"),
      {
        methode: "POST",
        headers: { "Content-Type": "application/json" },
        body: chargUtile,
      };
  });
}
