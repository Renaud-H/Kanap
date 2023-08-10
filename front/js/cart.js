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
    // Boucle for pour chaques articles
    for (let i = 0; i < cart.length; i++) {
        let item = cart[i];
        console.log(item.id);
        // Récupération depuis l'api
        fetch(`http://localhost:3000/api/products/${item.id}`)
            .then((data) => data.json())
            .then((product) => {

                // showItem(product, item.quantity, item.color); // Fonction affichage de l'article
                // showTotalPrice(); // Fonction affichage prix total des articles
            })

    }
    // showTotalQuantity(); // Fonction affichage quantité totale d'articles
}