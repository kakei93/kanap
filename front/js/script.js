fetch("http://localhost:3000/api/products") /* appel API */
  .then((res) => res.json())
  .then((data) => {
    printProducts(data);
  })
  .catch((err) => console.log(err));

// const call = async() => {
//     let response = await fetch("http://localhost:3000/api/products")
//     console.log(response)
//     let text = await response.json()
//     console.log (text)
// }
// call()

const printProducts = (products) => {
  products.forEach((product) => {
    /* pour chaque product de products dans id items, remplacer les elements html par les product du array*/
    let elt = document.getElementById("items");
    elt.innerHTML =
      elt.innerHTML +
      `<a href="./product.html?id=${product._id}">
        <article>
          <img src="${product.imageUrl}" alt="${product.altTxt}">
          <h3 class="productName">${product.name}</h3>
          <p class="productDescription">${product.description}</p>
        </article>
      </a>`;
  });
};
