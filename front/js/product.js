console.log("Page du Produit");
console.log(window.location.href);

var str = window.location.href;
var url = new URL(str);
var id = url.searchParams.get("id");

// Vérification de l'ID
id = parseInt(id);
if (Number.isNaN(id)) {
  alert("Erreur, pas d'article sélectionné");
}

// Récupération depuis l'api
fetch("http://localhost:3000/api/products/")
  .then(function (apiPromise) {
    if (apiPromise.ok) {
      console.log("Réponse de l'API");
      return apiPromise.json();
    } else {
      console.log("Erreur sur la récupération de l'API");
    }
  })
  .then((itemsList) => {
    showItem(itemsList);
    console.log(itemsList);
  });

// Fonction affichage des données du produit
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
function getQuantity() {
  return document.getElementById("quantity").value;
}
function getColor() {
  return document.getElementById("colors").value;
}

let boutonPanier = document.getElementById("addToCart");
boutonPanier.addEventListener("click", ajouterPanier);
// AjouterPanier n'a pas de parenthèses car c'est le nom de la fonction que l'on passe en argument.

// Enregistrement de l'article en cours dans le panier
function ajouterPanier() {
  // id
  let Q = getQuantity();
  let C = getColor();
  if (controlerDonnees(id, Q, C)) enregistrerDonnees(id, Q, C);
}

// Contrôle des données
function controlerDonnees(id, quantity, color) {
  // Contrôle de l'id
  if (id >= 0) {
    console.log("Contrôle de l'ID ok");
  } else {
    console.log("Le contrôle de l'ID n'est pas bon");
    return false;
  }
  // Contrôle de la quantité
  if (Number.isNaN(quantity)) return false;
  if (quantity > 0 && quantity < 101) {
    console.log("Contrôle de la quantité ok");
  } else {
    alert("Veuillez saisir une quantité");
    return false;
  }
  // Contrôle de la couleur
  if (color == "") {
    alert("Veuillez saisir une couleur");
    return false;
  }
  if (color >= 0) {
    console.log("Contrôle de la couleur ok");
  } else {
    console.log("Le contrôle de la couleur n'est pas bon");
    return false;
  }
  return true;
}

// Enregistrement des données
function enregistrerDonnees(id, quantity, color) {
  // Récupération du panier, si la valeur n'exite pas, ça met un tableau vide par défaut
  const currentValue = window.localStorage.getItem("cart") || "[]";
  // Décoder le local storage (ne supporte que des strings)
  const value = JSON.parse(currentValue);

  // Création de l'objet à ajouter
  const valueToAdd = {id, quantity, color};

  // Fusion des données
  let inCart = false;
  for (const product of value) {
    console.log (product); 
    // Object { id: 0, quantity: "1211", color: "0" } 
    if (product.id === valueToAdd.id && product.color === valueToAdd.color) {
      product.quantity += valueToAdd.quantity;
      inCart = true; // on note que le produit est dans le panier et qu'il a bien été mis à jour
      break; // pas besoin de continuer à chercher
    }
  }

  if (!inCart) {
    // si le produit n'était pas dans le panier, alors il faut l'ajouter
    value.push(valueToAdd);
  }
  // Sauvegarde de la valeur en json dans le local storage
  window.localStorage.setItem("cart", JSON.stringify(value));

}
