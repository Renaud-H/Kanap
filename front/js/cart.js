console.log("Page panier");


// FONCTION /!\ Récupération du panier depuis le localStorage
function getCart() {
	let cart = JSON.parse(localStorage.getItem("cart"));
	//si absence de panier, création d'un tableau vide
	if (cart == null) {
	  cart = [];
	}
	console.log("Contenu du panier",cart);
	return cart;
}

// FONCTION /!\  Enregistrement des données
function saveCart(cart) {
	localStorage.setItem("cart", JSON.stringify(cart));
}

/*	ProductData []
          "colors": ["Blue", "White", "Black"],
          "_id": "107fb5b75607497b96722bda5b504926",
          "name": "Kanap Sinopé",
          "price": 1849,
          "imageUrl": "kanap01.jpeg",
          "description": "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          "altTxt": "Photo d'un canapé bleu, deux places" 
*/
// Récupération depuis l'api						
fetch("http://localhost:3000/api/products/")
	.then(function (apiResponse) {
	  if (apiResponse.ok) {
		return apiResponse.json();
	  } else {
		console.log("Erreur");
	  }
	})
	.then((itemsList) => {
	  showCart(itemsList);
	  showPrice();
	}); 
//

async function getApiPrices() {
    let apiResponse = await fetch("http://localhost:3000/api/products/");
    if (apiResponse.ok) {
        let itemsList = await apiResponse.json();
        let prices = [];

        for (let index = 0; index < itemsList.length; index++) {
            let product = itemsList[index];
            for (let colorIndex = 0; colorIndex < product.colors.length; colorIndex++) {
                let productdata = {
                    "index": index,
                    "id": product._id,
                    "price": product.price,
                    "color": colorIndex // Ajout de la couleur
                };
                prices.push(productdata);
            }
        }

        console.log("Liste des produits et leur prix", prices);
        return prices;
    }
}
async function showPrice() {

    console.log("Total Price :", total);

}


/* TRAVAIL DES DONNÉES DE L'API, renvoie vers GETCART et renvoie vers INJECT
*/
function showCart(apiItems) {
  console.log("Liste des produits", apiItems);
  let cart = getCart();
  // Liste des éléments du panier

  for (let line of cart) {

    // console.log(line.id, line.color, line.quantity);
    // console.log(apiItems[line.id].name);
    // console.log(apiItems[line.id].colors[line.color]);
    // console.log("prix du produit traité", apiItems[line.id].price);

    injectDOM(line, apiItems[line.id]);
  }
}
















// INJECTION HTML = création dans le HTML des données
function injectDOM(cartLine, productData) {

	// html
	// <section id="cart__items">
	let container = document.getElementById("cart__items");
	let data_id = productData._id;
	let data_color = productData.colors[cartLine.color];
	let data_price = productData.price; 			 // MODIFICATION ?
	let name = productData.name;






		//<!--  <article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
		let article = document.createElement("article");
		article.setAttribute("class", "cart__item");
		article.setAttribute("data-id", cartLine.id);
		// article.setAttribute("data-id2", `${cartLine.id}`);
		article.setAttribute("data-color", `${cartLine.color}`);
			//<div class="cart__item__img">
			let div_img = document.createElement("div");
			div_img.setAttribute("class", "cart__item__img");
				//<img src="../images/product01.jpg" alt="Photographie d'un canapé">
				let img = document.createElement("img");
				// let img_alt = productData.altTxt;
				img.src = productData.imageUrl;
				img.alt = productData.altTxt;
				div_img.appendChild(img);
			//</div>
			article.appendChild(div_img);
		//<div class="cart__item__content">
		let div_content = document.createElement("div");
		div_content.setAttribute("class", "cart__item__content");
			//<div class="cart__item__content__description">
			let div_description = document.createElement("div");
			div_description.setAttribute("class", "cart__item__content__description");
				//<h2>Nom du produit</h2>
				let html_name = document.createElement("H2");
				html_name.innerText = name;
				div_description.appendChild(html_name);
				//<p>Vert</p> 
				let div_description_p_color = document.createElement("p");
				let color = productData.color;
				div_description_p_color.innerText = data_color; 
				div_description.appendChild(div_description_p_color);
				//<p>42,00 €</p>
				let div_description_p_price = document.createElement("p");
				div_description_p_price.innerText = data_price;  // Prix ici
				div_description.appendChild(div_description_p_price);
			//</div>
			div_content.appendChild(div_description);
			//<div class="cart__item__content__settings">
			let div_settings = document.createElement("div");
			div_settings.setAttribute("class", "cart__item__content__settings")
				//<div class="cart__item__content__settings__quantity">
				let div_settings_quantity = document.createElement("div");
				div_settings_quantity.setAttribute("class", "cart__item__content__settings__quantity");
					//<p>Qté : </p>
					let div_settings_quantity_p = document.createElement("p");
					div_settings_quantity_p.innerHTML = `${["Quantité"]}`; 
					div_settings_quantity.appendChild(div_settings_quantity_p);
					//<input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
					let settingsQuantityInput = document.createElement("input");
					settingsQuantityInput.type = "number";
					settingsQuantityInput.classList.add("itemQuantity")
					settingsQuantityInput.name = "itemQuantity"
					// Configuration de l'input de quantité
					settingsQuantityInput.min = "1";
					settingsQuantityInput.max = "100";
					// Affichage de la quantité
					settingsQuantityInput.value = cartLine.quantity;




					// Event Listener
					settingsQuantityInput.addEventListener("input", (product) => {
						// Lorsque la quantité est modifiée, appel à fonction modifyQuantity
						let newQuantity = Number(product.data);
						modifyQuantity(cartLine.id, cartLine.color, newQuantity);
						console.log("Appel de la fonction modifyQuantity terminé, données de newQuantity : ", newQuantity)
						getApiPrices();
						showPrice();

					})
				div_settings_quantity.appendChild(settingsQuantityInput);
				//</div>
				div_settings.appendChild(div_settings_quantity);
				//<div class="cart__item__content__settings__delete">
				let div_settings_delete = document.createElement("div");
				div_settings_delete.setAttribute("class", "cart__item__content__settings__delete");
					//<p class="deleteItem">Supprimer</p>
					let div_settings_delete_p = document.createElement("p");
					div_settings_delete_p.setAttribute("class", "deleteItem");




						// Event Listener
						div_settings_delete_p.addEventListener("click", () => { 
							// Appel à deleteItem
							deleteItem(cartLine.id,cartLine.color);
							getApiPrices();
							showPrice();
							})





					div_settings_delete_p.innerHTML = "Supprimer du panier";
					div_settings_delete.appendChild(div_settings_delete_p);
				//</div>
				div_settings.appendChild(div_settings_delete);
			//</div>
			div_content.appendChild(div_settings);
		//</div>
		article.appendChild(div_content);
	//</article> -->
	container.appendChild(article);
}


























// FONCTION /!\ Modification de la quantité
function modifyQuantity(productData_id, color, newQuantity){
		let cart = getCart(); //récupération du panier
		//ciblage de l'article à modifier
		const item = cart.find(item => (productData_id === item.id && color === item.color)); // Refaire const item
		console.log("Objet modifié :", item);
		console.log("Nouvelle quantité", newQuantity)
		//récupération de la nouvelle quantité
		//contrôle de la quantité
		if (Number.isNaN(newQuantity) || newQuantity <= 0 || newQuantity >= 101){
			alert("saisie incorrecte");
			document.querySelector(`article[data-id="${productData_id}"][data-color="${color}"]`).getElementsByTagName('input')[0].value = item.quantity;  // MODIFICATION
		}
		else{
			//mise à jour de la quantité
			item.quantity = newQuantity;
			console.log("Fonction modify quantity, log cart", cart);
			console.log("Nouvelle quantité", newQuantity);
			//enregistrement du panier
			saveCart(cart); 
		}
		console.log ("Modification de la quantité effectuée avec succès");	
	}


//FONCTION /!\ Supprimer l'article
function deleteItem(id, color) {

	let deleteLine = document.querySelector(`article[data-id="${id}"][data-color="${color}"]`);
    let cart = getCart(); 
    //ciblage de l'article à supprimer
	console.log(cart);
	const item = cart.find(item => (id === item.id && color === item.color));
	console.log("Article supprimé: ", item);

    //suppression de l'article dans le panier
	for (let i = 0; i < cart.length; i ++) {
		if (cart[i].id == id && cart[i].color == color){
			cart.splice(i, 1);
			break;
		}
	}

	 //suppression dans le DOM
	deleteLine.remove();
	saveCart(cart); //enregistrement du panier
    return;
}





/* CHECK BOXES

*/
// Check prénom
function checkFirstName(){
    // Get data
    const firstName = document.getElementById("firstName").value;
    const error = document.getElementById("firstNameErrorMsg");
    // REGEX 
    const regex = /^[a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ-]+$/;

    // Contrôle data = regex 
    if(firstName.match(regex)){
        error.innerText = "";
        return true;
    }
    else{
        error.innerText = "Champ invalide.";
        return false;
    }
}
document.getElementById("firstName").addEventListener("input", () => { // Event "input"
    checkFirstName(); // Lancer le check 
});
// Check nom
function checkLastName(){
    // Get data
    const lastName = document.getElementById("lastName").value;
    const error = document.getElementById("lastNameErrorMsg");
    // REGEX 
    const regex = /^[a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ -]+$/;

    // Contrôle data = regex 
    if(lastName.match(regex)){
        error.innerText = "";
        return true;
    }
    else{
        error.innerText = "Champ invalide.";
        return false;
    }
}
document.getElementById("lastName").addEventListener("input", () => { // Event "input"
    checkLastName();  // Lancer le check 
});
// Check adresse
function checkAddress(){
    // Get data
    const address = document.getElementById("address").value;
    const error = document.getElementById("addressErrorMsg");
    // REGEX 
    const regex = /^[a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ0-9999 -]+$/;

    // Contrôle data = regex 
    if(address.match(regex)){
        error.innerText = "";
        return true;
    }
    else{
        error.innerText = "Champ invalide.";
        return false;
    }
}
document.getElementById("address").addEventListener("input", () => { // Event "input"
    checkAddress();  // Lancer le check 
});
// Check ville
function checkCity(){
    // Get data
    const city = document.getElementById("city").value;
    const error = document.getElementById("cityErrorMsg");
    // REGEX 
    const regex = /^[a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ -]+$/;

    // Contrôle data = regex 
    if(city.match(regex)){
        error.innerText = "";
        return true;
    }
    else{
        error.innerText = "Champ invalide.";
        return false;
    }
}
document.getElementById("city").addEventListener("input", () => { // Event "input"
    checkCity(); // Lancer le check 
});
// Check email
function checkEmail(){
    // Get data
    const email = document.getElementById("email").value;
    const error = document.getElementById("emailErrorMsg");
    // REGEX 
    const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    // Contrôle data = regex 
    if(email.match(regex)){
        error.innerText = "";
        return true;
    }
    else{
        error.innerText = "Champ invalide.";
        return false;
    }
}
document.getElementById("email").addEventListener("input", () => { // Event "input"
    checkEmail();  // Lancer le check 
});
// Formulaire
const order = document.getElementById("order");
order.addEventListener("click", (e) => { //au clic
    e.preventDefault(); 
	let cart = getCart();
	// Si formulaire = true
	if (checkFirstName() & checkLastName() & checkAddress() & checkCity() & checkEmail()){
		// Créer objet contact
		let contact = {
			firstName: document.getElementById("firstName").value,
			lastName: document.getElementById("lastName").value,
			address: document.getElementById("address").value,
			city: document.getElementById("city").value,
			email: document.getElementById("email").value,
		  }
		// Créer tableau produits
		let productsId = [];
		// Boucle for, ajout des IDs du panier dans le tableau
		for (let i = 0; i < cart.length; i++) {
			productsId.push(cart[i].id);
		  }  	
		// Créer l'objet "commande"
		let orderNew = {
		contact: contact,
		products: productsId,
		}
		console.log(orderNew);
	}   //sinon, message d'erreur
		else{
			window.alert("Veuillez remplir le formulaire.");
		}
});

