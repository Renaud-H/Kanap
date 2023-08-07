console.log("Cart");

showCart(); //affichage du panier

//récupération du panier depuis le localStorage
function getCart() {
    let cart = JSON.parse(localStorage.getItem("cart"));
    //si absence de panier, création d'un tableau vide
    if (cart == null) {
        cart = [];
    }
    console.log(cart);
    return cart;
}
