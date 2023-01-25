/* récupérer data dans l'url*/
const dataURL = window.location.search;

/* extraction id */
const Params = new URLSearchParams(dataURL);

const _id = Params.get("id");

/* appel API du produit via l'id = */

fetch("http://localhost:3000/api/products/" + _id)
  .then((res) => res.json())
  .then((data) => {
    dataProduct(data);
  })
  .catch((err) => console.log(err));

/* insertion des variables (données du produit) dans l'html*/

const dataProduct = (product) => {
  const eltIMG = document.getElementsByClassName("item__img");
  eltIMG[0].innerHTML = `<img src="${product.imageUrl} " alt="${product.altTxt}">`;

  const eltTitle = document.getElementById("title");
  eltTitle.innerHTML = `${product.name}`;

  const eltPrice = document.getElementById("price");
  eltPrice.innerHTML = `${product.price}`;

  const eltDescription = document.getElementById("description");
  eltDescription.innerHTML = `${product.description}`;

  const eltColor = document.getElementById("colors");
  product.colors.forEach((color) => {
    eltColor.innerHTML =
      eltColor.innerHTML + `<option value="${color}">${color}</option>`;
  });
};

/* recupération data choix client */
const btnAjoutPanier = document.getElementById("addToCart");

/* Envoi les données du client au local storage */
btnAjoutPanier.addEventListener("click", (e) => {
  e.preventDefault();
  const productColor = document.getElementById("colors").value;
  const productQuantity = document.getElementById("quantity").value;
  /* vérification saisi client */
  if (
    productColor == null ||
    productColor === "" ||
    productQuantity == null ||
    productQuantity == 0
  ) {
    alert("selectionner une couleur et une quantité");
    return;
  }

  const productData = {
    id: _id,
    color: productColor,
    quantity: Number(productQuantity),
  };

  /* Vérification si produit dans localStorage */
  let inCart = JSON.parse(localStorage.getItem("item"));

  /* Ajout d'un produit dans le localStorage */
  if (!inCart) {
    inCart = [];
    inCart.push(productData);
    localStorage.setItem("item", JSON.stringify(inCart));
  } else {
    /* Vérification si doublon dans le localStorage */
    const index = inCart.findIndex(
      (product) =>
        productData.id == product.id && productData.color == product.color
    );
    /* Si oui, incrémentation de la quantité du produit existant */
    if (index > -1) {
      inCart[index].quantity =
        parseInt(inCart[index].quantity) + parseInt(productData.quantity);
      localStorage.setItem("item", JSON.stringify(inCart));
      /* Si non, incrémentation un nouvel objet dans le tableau */
    } else {
      inCart.push(productData);
      localStorage.setItem("item", JSON.stringify(inCart));
    }
  }
});
