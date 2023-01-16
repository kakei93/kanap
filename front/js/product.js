/* récupérer data dans l'url*/
const dataURL = window.location.search;
console.log(dataURL);

/* extraction id */
const Params = new URLSearchParams(dataURL);
console.log(Params);

const _id = Params.get("id");
console.log(_id);

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
  //   eltColor.innerHTML =
  //     eltColor.innerHTML +
  //     `<option value="${product.colors[0]}">${product.colors[0]}</option>`;
  //   eltColor.innerHTML += `<option value="${product.colors[1]}">${product.colors[1]}</option>`;
  //   eltColor.innerHTML += `<option value="${product.colors[2]}">${product.colors[2]}</option>`;
  product.colors.forEach((color) => {
    eltColor.innerHTML =
      eltColor.innerHTML + `<option value="${color}">${color}</option>`;
  });
};
