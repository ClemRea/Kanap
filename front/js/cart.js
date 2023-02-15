let cart = get("products");

if (!cart) {
  document.querySelector("h1").innerText = "Votre panier est vide !";
  document.querySelector("#totalQuantity").innerHTML = "Aucun";
  document.querySelector("#totalPrice").innerHTML = "0 €";
} else {
  fetch("http://localhost:3000/api/products/")
    .then((reponse) => reponse.json())
    .then((allProducts) => {
      const products = builCompleteList(cart, allProducts);
      afficherPanier(products);
      listenForQtyUpdate(products);
      supprimerProduit(products);
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
      <p>${price(product.price)}</p>
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
            window.location.reload();
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
  document.querySelector("#totalPrice").innerText = price(prixAfficher);
}

// Fonction pour supprimer un produit du panier
function supprimerProduit(products) {
  products.forEach((product) => {
    const supprimer = document.querySelector(
      `.cart__item[data-id="${product.id}"][data-color = "${product.couleur}"] .deleteItem`
    );
    supprimer.addEventListener("click", (e) => {
      let cart = get("products");
      let findIndex = cart.findIndex(
        (a) => a.id === product.id && a.couleur === product.couleur
      );
      cart.splice(findIndex, 1);
      store("products", cart);
      window.location.reload();
    });
  });
}

/***********************************/
/***VARIABLES POUR LE FORMULAIRE****/
/***********************************/

// Regex pour valider Prénom, Nom, Ville
const noIntRegex =
  /^[^0-9\.\,\"\?\!\;\:\#\$\%\&\(\)\*\+\-\/\<\>\=\@\[\]\\\^\_\{\}\|\~]{3,20}$/;

// Regex pour valider l'email
const emailRegex =
  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

// Regex pour valider l'adresse
const adresseRegex = /^(([a-zA-ZÀ-ÿ0-9]+[\s\-]{1}[a-zA-ZÀ-ÿ0-9]+)){1,10}$/;

const submitButtun = document.querySelector("#order");

/******************************/
/***VALIDATION DU FORMULAIRE***/
/******************************/

submitButtun.addEventListener("click", (e) => {
  e.preventDefault();
  const contact = {
    firstName: document.querySelector("#firstName").value,
    lastName: document.querySelector("#lastName").value,
    adresse: document.querySelector("#address").value,
    city: document.querySelector("#city").value,
    email: document.querySelector("#email").value,
  };

  const firstName = contact.firstName;
  const lastName = contact.lastName;
  const city = contact.city;
  const adresse = contact.adresse;
  const email = contact.email;

  //****Controle du Prénom****//
  function controllerPrenom(noIntRegex, firstName) {
    if (noIntRegex.test(firstName)) {
      return true;
    } else {
      document.querySelector("#firstNameErrorMsg").innerText =
        "Le Prénom n'est pas valide";
      return false;
    }
  }

  //****Controle du Nom****//
  function controllerNom(noIntRegex, lastName) {
    if (noIntRegex.test(lastName)) {
      return true;
    } else {
      document.querySelector("#lastNameErrorMsg").innerText =
        "Le Nom n'est pas valide";
      return false;
    }
  }

  //****Controle de la ville****//
  function controllerVille(noIntRegex, city) {
    if (noIntRegex.test(city)) {
      return true;
    } else {
      document.querySelector("#cityErrorMsg").innerText =
        "La ville n'est pas valide";
      return false;
    }
  }

  //****Controle de l'email****//
  function controllerEmail(emailRegex, email) {
    if (emailRegex.test(email)) {
      return true;
    } else {
      document.querySelector("#emailErrorMsg").innerText =
        "L'email n'est pas valide";
      return false;
    }
  }

  function controllerAdresse(adresseRegex, adresse) {
    if (adresseRegex.test(adresse)) {
      return true;
    } else {
      document.querySelector("#addressErrorMsg").innerText =
        "l'adresse n'est pas valide";
      return false;
    }
  }

  //****VALIDER LE FORMULAIRE****/
  if (
    controllerPrenom(noIntRegex, firstName) &&
    controllerNom(noIntRegex, lastName) &&
    controllerVille(noIntRegex, city) &&
    // controllerAdresse(adresseRegex, adresse) &&
    controllerEmail(emailRegex, email)
  ) {
    const product_ID = [];
    const aEnvoyer = {
      cart,
      contact,
    };
    product_ID.push(aEnvoyer);
    fetch("http://localhost:3000/api/products");
    {
      methode: "POST";
      body: {
        JSON.stringify(product_ID);
      }
      headers: {
        ("content-Type : application/json");
      }
    }
  }
});
