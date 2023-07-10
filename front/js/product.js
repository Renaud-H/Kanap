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
    showItems(itemsList);
  });

function showProduct(product) {

}