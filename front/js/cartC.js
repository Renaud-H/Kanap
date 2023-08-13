console.log("Page panier");

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
  .then(function (apiPromise) {
    if (apiPromise.ok) {
      return apiPromise.json();
    } else {
      console.log("Erreur");
    }
  })
  .then((itemsList) => {
    showCart(itemsList);
  });

//


/* TRAVAIL DES DONNÉES L'API, renvoie vers GETCART et renvoie vers INJECT
*/
function showCart(apiItems) {
  console.log("Liste des produits", apiItems);
  let cart = getCart();

  // Liste des éléments du panier
  for (let line of cart) {
    //console.log(line.id, line.color, line.quantity);
    console.log(apiItems[line.id].name);
    console.log(apiItems[line.id].colors[line.color]);
    console.log(apiItems[line.id].price);
    inject(line, apiItems[line.id]);
  }
}

/* INJECTION HTML = création dans le HTML des données

	il manque des choses avec // MODIFICATION
	pb : prix = fonction ou boucle ?
	pb : quantité modifier / supprimer = fonction ou boucle ?

*/
function inject(cartLine, productData) {

	// html
	// <section id="cart__items">
	let container = document.getElementById("cart__items");
	// let data_id = productData._id;
	let data_color = productData.colors[cartLine.color];
	let data_price = productData.price;  // MODIFICATION
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

				div_description_p_color.innerText = data_color;  // MODIFICATION

				div_description.appendChild(div_description_p_color);
				//<p>42,00 €</p>
				let div_description_p_price = document.createElement("p");

				div_description_p_price.innerText = data_price;  // MODIFICATION

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

					div_settings_quantity_p.innerHTML = `${["cartLineQuantity"]}`; // MODIFICATION

					div_settings_quantity.appendChild(div_settings_quantity_p);


					//<input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
					// addEventListener 
					// Configuration de l'input de qantité
					let settingsQuantityInput = document.createElement("input");
					settingsQuantityInput.type = "number";
					settingsQuantityInput.classList.add("itemQuantity")
					settingsQuantityInput.name = "itemQuantity"
					settingsQuantityInput.min = "1";
					settingsQuantityInput.max = "100";
					//affichage de la quantité
					settingsQuantityInput.value = productData.quantity;
					div_settings_quantity.appendChild(settingsQuantityInput);
					//mise à jour du prix de l'article
					settingsQuantityInput.addEventListener("input", () => { //lorsque la quantité est modifiée
						modifyQuantity(productData._id,color,productData.price); //modification de l'artcicle
						//mise à jour de la description de l'article

						let newPrice = productData.price;									 // MODIFICATION
						div_description.innerHTML = `<h2>${productData.name}</h2>
						<p>${color}</p>
						<p>${newPrice}</p>`;
					})

				//</div>
				div_settings.appendChild(div_settings_quantity);

				//<div class="cart__item__content__settings__delete">
				let div_settings_delete = document.createElement("div");
				div_settings_delete.setAttribute("class", "cart__item__content__settings__delete");
					//<p class="deleteItem">Supprimer</p>
					let div_settings_delete_p = document.createElement("p");
					div_settings_delete_p.setAttribute("class", "deleteItem");

					div_settings_delete_p.innerHTML = "Delete"; // MODIFICATION

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














// LIGNE 170 /!\ Récupération du panier depuis le localStorage
function getCart() {
  let cart = JSON.parse(localStorage.getItem("cart"));
  //si absence de panier, création d'un tableau vide
  if (cart == null) {
    cart = [];
  }
  console.log(cart);
  return cart;
}



// LIGNE 180 /!\  Enregistrement des données
function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}


function getPrice() {

}

function getQuantity() {

}

function modifyQuantity(productData_id, color, productData_price){
	let newQuantity = 1 ;  												// MODIFICATION
		let cart = getCart(); //récupération du panier
		//ciblage de l'article à modifier
		const item = cart.find(item => (productData_id === item.productData_id && color === item.color));
		//récupération de la nouvelle quantité
		//contrôle de la quantité
		if (newQuantity <= 0 || newQuantity >= 101 || Number.isNaN(newQuantity)){
			alert("saisie incorrecte");
			document.querySelector(`article[data-id="${productData_id}"][data-color="${color}"]`).getElementsByTagName('input')[0].value = item.quantity;
		}
		else{
			//mise à jour de la quantité

			//mise à jour du prix

			
			saveCart(cart); //enregistrement du panier
			getPrice(); //affichage du prix total
			getQuantity(); //affichage de la quantité toatale d'articles
		}
		console.log ("event")	
	}