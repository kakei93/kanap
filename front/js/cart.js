let inCart = JSON.parse(localStorage.getItem("item"));
console.log(inCart);

//Fonction si panier vide
function emptyCart() {
  const baliseArt = document.createElement("article");
  baliseArt.classList.add("cart__item");
  const eltArt = document.getElementById("cart__items").appendChild(baliseArt);
  eltArt.innerHTML = "<p>Le panier est vide</p>";
}

//Fonction affichage des produits dans le panier
const displayCart = async () => {
  if (!inCart || (Array.isArray(inCart) && inCart.length === 0)) {
    emptyCart();
  } else {
    let quantityTotals = 0;
    let priceTotals = 0;
    for (let product of inCart) {
      await fetch("http://localhost:3000/api/products/" + product.id)
        .then(function (res) {
          if (res.ok) {
            return res.json();
          }
        })
        /* insertion des variables avec innerHTML */
        .then((data) => {
          const elt = document.getElementById("cart__items");
          elt.innerHTML =
            elt.innerHTML +
            `
            <article class="cart__item" data-id="${product.id}" data-color="${product.color}">
            <div class="cart__item__img">
            <img
                src="${data.imageUrl}"
                alt="${data.alt}"
            />
            </div>
            <div class="cart__item__content">
            <div class="cart__item__content__description">
                <h2>${data.name}</h2>
                <p>${product.color}</p>
                <p>${data.price} €</p>
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
                    value=${product.quantity}
                />
                </div>
                <div class="cart__item__content__settings__delete">
                <p class="deleteItem">Supprimer</p>
                </div>
            </div>
            </div>
            </article>
            `;
          quantityTotals += parseInt(product.quantity);
          priceTotals += data.price * product.quantity;
          document.getElementById("totalQuantity").innerHTML = quantityTotals;
          document.getElementById("totalPrice").innerHTML = priceTotals;
        });
    }
    modifQuantity();
    useBtnSuppr();
  }
};
displayCart();

const displayTotals = (quantityTotals, priceTotals) => {
  if (quantityTotals !== undefined) {
    document.getElementById("totalQuantity").innerHTML = quantityTotals;
  }
  if (priceTotals !== undefined) {
    document.getElementById("totalPrice").innerHTML = priceTotals;
  }
};

/* Fonction bonton supprimer */
function supprItem(item) {
  /* Suppression de l'item dans le tableau, puis mise à jour du localStorage */
  inCart.splice([item], 1);
  localStorage.setItem("item", JSON.stringify(inCart));
  alert("Le produit sera supprimé du panier");
  window.location.href = "cart.html";
}

/* Fonction de modification des prix et quantités totaux, après suppression */
function cartMAJ(total) {
  let quantityTotals = 0;
  let priceTotals = 0;
  if (inCart) {
    quantityTotals -= parseInt(inCart[total].quantity);
    priceTotals -=
      parseInt(inCart[total].price) * parseInt(inCart[total].quantity);
  }
}

/* Fonction pour le changement des quantités et prix des produit dans me panier */

const modifQuantity = () => {
  /* Fonction pour modifier l'affichage prix et quantité */
  const formQuantity = document.querySelectorAll(".itemQuantity");

  if (inCart) {
    let quantityTotals = parseInt(
      document.getElementById("totalQuantity").innerHTML
    );
    let priceTotals = parseInt(document.getElementById("totalPrice").innerHTML);
    let priceProduct = parseInt(
      document.querySelectorAll(
        ".cart__item__content__description p:nth-child(3)"
      )[0].innerHTML
    );
    for (let i = 0; i < inCart.length; i++) {
      formQuantity[i].addEventListener("change", function () {
        if (formQuantity[i].value > 0) {
          /* Modification de l'affichage des totaux */
          let quantityDiff = formQuantity[i].value - inCart[i].quantity;
          quantityTotals += quantityDiff;
          priceTotals += quantityDiff * priceProduct;
          displayTotals(quantityTotals, priceTotals);
          /* Ajout des modifications dans le localStorage */
          inCart[i].quantity = formQuantity[i].value;
          localStorage.setItem("item", JSON.stringify(inCart));
          /* Affichage du nouveau prix du produit */
        } else {
          cartMAJ(i);
          displayTotals(0, 0);
          supprItem(i);
        }
      });
    }
  }
};

/* Fonction supression item du panier et du localStorage avec le bouton supprimer */
const useBtnSuppr = () => {
  if (Array.isArray(inCart) && inCart.length > 0) {
    const deleteBtn = document.querySelectorAll(".deleteItem");
    for (let u = 0; u < deleteBtn.length; u++) {
      deleteBtn[u].addEventListener("click", function (e) {
        e.preventDefault;
        //Modification des totaux, prix et quantités
        cartMAJ(u);
        displayTotals();
        supprItem(u);
      });
    }
  }
};

/* Fonction de validation des champs Prénom et Nom */
const validName = (inputName) => {
  //Création des conditions d'acceptation du Nom et Prénom
  let nameRegExp = new RegExp("^([a-zA-Z]+[,.]?[ ]?|[a-z]+['-]?)+$");
  let textError = inputName.nextElementSibling;
  if (inputName.value.length > 0) {
    if (nameRegExp.test(inputName.value)) {
      textError.innerHTML = "";
      return true;
    } else {
      textError.innerHTML = "Format incorrect. Ex : John";
      return false;
    }
  } else {
    textError.innerHTML = "Veuillez renseigner ce champ";
    return false;
  }
};

/* Fonction de validation des champs adresse */
const validAddress = (inputAddress) => {
  let addressRegExp = new RegExp("^([a-zA-Z0-9]+[,.]?[ ]?|[a-z]+['-]?)+$");
  let textError = inputAddress.nextElementSibling;
  if (inputAddress.value.length > 0) {
    if (addressRegExp.test(inputAddress.value)) {
      textError.innerHTML = "";
      return true;
    } else {
      textError.innerHTML = "Format incorrect. Ex : 18 rue de la Paix";
      return false;
    }
  } else {
    textError.innerHTML = "Veuillez renseigner ce champ";
    return false;
  }
};

/* fonction validation du champs ville */
const validCity = (inputCity) => {
  let cityRegExp = new RegExp("^([a-zA-Z]+[,.]?[ ]?|[a-z]+['-]?)+$");
  let textError = inputCity.nextElementSibling;
  if (inputCity.value.length > 0) {
    if (cityRegExp.test(inputCity.value)) {
      textError.innerHTML = "";
      return true;
    } else {
      textError.innerHTML = "Format incorrect. Ex : Paris";
      return false;
    }
  } else {
    textError.innerHTML = "Veuillez renseigner ce champ";
    return false;
  }
};

/* Fonction de validation du champ email */
const validEmail = (inputEmail) => {
  let emailRegExp = new RegExp("[a-z0-9]+@[a-z]+\\.[a-z]{2,3}");
  let textError = inputEmail.nextElementSibling;
  if (inputEmail.value.length > 0) {
    if (emailRegExp.test(inputEmail.value)) {
      textError.innerHTML = "";
      return true;
    } else {
      textError.innerHTML = "Format de l'email incorrect. Ex : user@gmail.com";
      return false;
    }
  } else {
    textError.innerHTML = "Veuillez renseigner ce champ";
    return false;
  }
};

/* Variable champ Prénom */
const firstName = document.getElementById("firstName");
firstName.addEventListener("change", function () {
  validName(firstName);
});

/* Variable champ Nom */
const lastName = document.getElementById("lastName");
lastName.addEventListener("change", function () {
  validName(lastName);
});

/* Variable champ Adresse */
const address = document.getElementById("address");
address.addEventListener("change", function () {
  validAddress(address);
});

/* Variable champ Ville */
const city = document.getElementById("city");
city.addEventListener("change", function () {
  validCity(city);
});

/* Variable du champ Email */
const email = document.getElementById("email");
email.addEventListener("change", function () {
  validEmail(email);
});

/* Fonction récupération des id produits dans le panier */
const idItems = [];
const idItem = () => {
  if (inCart) {
    for (element of inCart) {
      idItems.push(element.id);
    }
  }
};
idItem();

/* Fonction d'envoi du formulaire pour page confirmation */
const order = document.getElementById("order");
const sendOrder = () => {
  order.addEventListener("click", function (e) {
    e.preventDefault();
    if (!inCart || inCart.length === 0) {
      alert("Attention, le panier est vide.");
      return;
    }
    /* Récupération des informations du formulaire */
    const contactClient = {
      firstName: firstName.value,
      lastName: lastName.value,
      address: address.value,
      city: city.value,
      email: email.value,
    };
    /* Regroupement des informations à envoyer à l'API */
    const dataItem = {
      contact: contactClient,
      products: idItems,
    };
    /* Vérification si tout le formulaire est correct avant l'envoi */
    let formValid = true;

    [address, city].forEach((e) => {
      if (!validInput(e)) formValid = false;
    });

    [firstName, lastName].forEach((e) => {
      if (!validName(e)) formValid = false;
    });

    if (!validEmail(email)) formValid = false;
    /* requête method POST */
    if (formValid) {
      try {
        async function formPost() {
          console.log(JSON.stringify(dataItem));
          let response = await fetch(
            "http://localhost:3000/api/products/order",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(dataItem),
            }
          );
          let data = await response.json();
          alert("Commande validée");
          localStorage.clear();
          idOrder = data.orderId;
          window.location.href = "./confirmation.html?id-order=" + idOrder;
        }
        formPost();
      } catch (err) {
        alert(`${err}`);
      }
    } else {
      alert("Le formulaire est incomplet ou incorrecte");
    }
  });
};
sendOrder();
