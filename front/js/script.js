console.log("Index");
// Récupération depuis l'api
fetch("http://localhost:3000/api/products/")
  .then(function (res) {
    if (res.ok) {
      return res.json();
    } else {
      console.log("Erreur");
    }
  })
  .then(function (itemsList) {
    console.log(itemsList);
  });

let section = document.getElementById("items");
console.log(section);
