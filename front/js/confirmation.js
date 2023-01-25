let params = new URLSearchParams(document.location.search);
let idOrder = params.get("id-order");

/* Affichage de numéro de commande via innerHTML */
const orderId = document.getElementById("orderId");
orderId.innerHTML = idOrder;
