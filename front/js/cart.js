console.log("Cart");

showCart(); //affichage du panier

// récupération du panier depuis le localStorage
function getCart() {
    let cart = JSON.parse(localStorage.getItem("cart"));
    //si absence de panier, création d'un tableau vide
    if (cart == null) {
        cart = [];
    }
    console.log(cart);
    return cart;
}
// Enregistrement des données
function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}
// Affichage du panier
function showCart() {
    let cart = getCart(); // Récupération du panier
    // Triage par id
    cart.sort((a, b) => {
        if (a.id < b.id)
            return -1;
        if (a.id > b.id)
            return 1;
        return 0;
    })
    console.log(cart);
}