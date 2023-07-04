console.log("Index");
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

    showItems (itemsList)});

function showItems(itemsList) {
    //je créé via logiciel (plutot que par fichier .html une balise <a>).
  //Tu ne peux voir les élements créé par le script qu'en inspectant la page, pas en faisant 'voir le code source"'
  let a     = document.createElement("a"); //a est ma variable, "a" est une paramètre
  let art   = document.createElement("article"); //art est ma variable, "article" est une paramètre
  let img   = document.createElement("img");
  let titre = document.createElement("h3");
  let desc  = document.createElement("p");
}



console.log(showItems);
if (showItems.ok) {
  console.log("Yo");
} else {
  {
    console.log("Erreur");
  }
}

let section = document.getElementById("items");
console.log(section);
