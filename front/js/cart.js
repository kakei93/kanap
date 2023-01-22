let inCart = JSON.parse(localStorage.getItem("item"));
console.log(inCart);

//Fonction si panier vide
function emptyCart() {
  const article = document.createElement("article");
  article.classList.add("cart__item");
  const listArticles = document
    .getElementById("cart__items")
    .appendChild(article);
  listArticles.innerHTML = "<p>Le panier est vide</p>";
}

//Fonction affichage les produits dans le panier
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
          quantityTotals += product.quantity;
          priceTotals += data.price * product.quantity;
          document.getElementById("totalQuantity").innerHTML = quantityTotals;
          document.getElementById("totalPrice").innerHTML = priceTotals;
        });
    }
  }
};
displayCart();

const displayResults = (quantityTotals, priceTotals) => {
  document.getElementById("totalQuantity").innerHTML = quantityTotals;
  document.getElementById("totalPrice").innerHTML = priceTotals;
};
