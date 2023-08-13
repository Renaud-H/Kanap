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
    showItems(itemsList);
  });

let grille = document.getElementById("items");
function showItems(itemsList) {
  for (var i = 0; i < itemsList.length; i++) {
    // Création des variables
    let a = document.createElement("a");
    let art = document.createElement("article");
    let img = document.createElement("img");
    let title = document.createElement("h3");
    let desc = document.createElement("p");

    //tous les elements necessaires sont créés
    //maintenant on ajoute le bon contenu à chaque élement

    desc.appendChild(document.createTextNode(itemsList[i].description));
    desc.setAttribute("class", "productDescription");

    title.appendChild(document.createTextNode(itemsList[i].name));
    title.setAttribute("class", "productName");

    img.setAttribute("src", itemsList[i].imageUrl);
    //     img.src = `${item.imageUrl}`;
    img.setAttribute("alt", itemsList[i].altTxt);

    art.appendChild(img);
    art.appendChild(title);
    art.appendChild(desc);
    a.appendChild(art);
    a.setAttribute("href", "./product.html?id=" + i);
    grille.appendChild(a);
  }
}

