console.log("Product");
console.log(window.location.href);

var str = window.location.href;
var url = new URL(str);
var id = url.searchParams.get("id");
console.log(id);

fetch("http://localhost:3000/api/products/")
  .then(function (apiPromise) {
    if (apiPromise.ok) {
      return apiPromise.json();
    } else {
      console.log("Erreur");
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

  console.log("Ciblage du DOM");
  console.log(color_choice);
  console.log("Liste des Colors");
  console.log(itemsList[id].colors);
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
  return document.getElementById("colors").value ;
}



function AjouterPanier(){
  // id  
  let Q = GetQuantity();
  let C = GetColor();
}

let BoutonPanier = document.getElementById("addToCart");
BoutonPanier.addEventListener("click", AjouterPanier());