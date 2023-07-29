console.log("Product");
console.log(window.location.href);

var str = window.location.href;
var url = new URL(str);
var id = url.searchParams.get("id");

// Vérification de l'ID
id = parseInt(id);
if (Number.isNaN(id)) {
  alert("Erreur, pas d'article sélectionné");
}

console.log(id);

// Récupération depuis l'api
fetch("http://localhost:3000/api/products/")
  .then(function (apiPromise) {
    if (apiPromise.ok) {
      return apiPromise.json();
    } else {
      console.log("Erreur sur la récupération de l'API");
    }
  })
  .then((itemsList) => {
    showItem(itemsList);
    console.log(itemsList);
  });

// Fonction
function showItem(itemsList) {
  // Création des variables
  let itemImg = document.querySelector(".item__img");
  let img = document.createElement("img");
  let title = document.getElementById("title");
  let price = document.getElementById("price");
  let description = document.getElementById("description");
  let color_choice = document.getElementById("colors");

  // Intégration dans le fichier HTML
  itemImg.appendChild(img);
  img.src = `${itemsList[id].imageUrl}`;
  title.innerText = `${itemsList[id].name}`;
  price.innerText = `${itemsList[id].price}`;
  description.innerText = `${itemsList[id].description}`;

  // Boucle for pour choisir les couleurs
  for (let color in itemsList[id].colors) {
    color_choice.innerHTML += `<option value="${color}">${itemsList[id].colors[color]}</option>`;
    // Option value = (mettre valeur numérique ou chaîne de caractère)
  }
}

// Récupération des données saisies Quantité & Couleurs
function GetQuantity() {
  return document.getElementById("quantity").value;
}
function GetColor() {
  return document.getElementById("colors").value;
}

let boutonPanier = document.getElementById("addToCart");
boutonPanier.addEventListener("click", AjouterPanier);

// Enregistrement de l'article en cours dans le panier
function AjouterPanier() {
  // id
  let Q = GetQuantity();
  let C = GetColor();
  if (controlerDonnees(id, Q, C)) enregistrerDonnees();
}

//
function controlerDonnees(id, quantity, color) {
  // Contrôle de l'id
  if (id >= 0) {
    console.log("Contrôle de l'ID ok");
  } else {
    console.log("Le contrôle de l'ID n'est pas bon");
    return false;
  }
  // Contrôle de la quantité
  if (quantity > 0 && quantity < 101) {
    console.log("Contrôle de la quantité ok");
  } else {
    console.log("Le contrôle de la quantité n'est pas bon");
    return false;
  }
  // Contrôle de la couleur
  if (color >= 0) {
    console.log("Contrôle de la couleur ok");
  } else {
    console.log("Le contrôle de la couleur n'est pas bon");
    return false;
  }
  //si q <0 alors erreur
}
function enregistrerDonnees() {}

/*
localStorage
get

Q C

créer un array
*/
