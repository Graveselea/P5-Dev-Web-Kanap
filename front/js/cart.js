//Initialisation
let localCart = JSON.parse(localStorage.getItem("cart"));
const positionEmptyCart = document.querySelector("#cart__items");

init();

function init(){
  displayCart();
  displayTotal();

}


// Récupération panier
function displayCart() {
  if (localCart === null || localCart.length === 0) {
    const emptyCart = `<p>Votre panier est vide</p>`;
    positionEmptyCart.innerHTML = emptyCart;
  }     
  localCart.forEach((product) =>{
    fetch(`http://localhost:3000/api/products/${product.id}`)
    .then((response) => response.json())
    .then((res) => {
      res.color = product.color;
      res.quantity = product.qty;
      displayArticle(res); 
    }
  )})  
}

//Récupération du total
function displayTotal() {

  // Récupération du total des quantités
  let totalQtt = 0;
  const totalQuantity = document.querySelector("#totalQuantity")

  localCart.forEach(item => {
    const totalUnitQuantity = item.qty;
    totalQtt += totalUnitQuantity
  })
  totalQuantity.textContent = totalQtt

  // Récupération du prix total
  let totalPrice = 0;
  let productTotalPrice = document.getElementById('totalPrice');
  localCart.forEach((item) => {
    const totalUnitPrice = item.price * item.quantity;
    totalPrice += totalUnitPrice
    })
    
    productTotalPrice.textContent = totalPrice
    changeQuantity();
    deleteItem();
}

//Modification de la quantité
function changeQuantity() {
  const quantityInputs = document.querySelectorAll(".itemQuantity");
  quantityInputs.forEach(quantityInput => {
    quantityInput.addEventListener("change", (event) => {
      event.preventDefault();
      const inputValue = event.target.value;
      const dataId = event.target.getAttribute("data-id");
      const dataColor = event.target.getAttribute("data-color");
      let localCart = localStorage.getItem("cart");
      let items = JSON.parse(cart);
  
      items = items.map((item) => {
        if (item.id === dataId && item.color === dataColor) {
          item.quantity = inputValue;
        }
        return item;
      });
  
      if (qtt < 1 || qtt > 100) {
        alert('La quantité doit être comprise entre 1 et 99');
        location.reload();
        return;
      }
      localStorage.setItem('cart', JSON.stringify(localCart))
      location.reload();
    });
  });
  }
  
// Affichage du contenu du panier
function displayArticle(item) {
  const blocCartItem = document.getElementById('cart__items');

  let article = document.createElement('article');
  article.classList.add('cart__item');
  article.setAttribute('data-id',item._id);
  article.setAttribute('data-color',item.color);

  let divImg = makeImageDiv(item);
  let divContent = makeCartContent(item);

  article.appendChild(divImg);
  article.appendChild(divContent)

  blocCartItem.appendChild(article);
}

// Création de l'image
function makeImageDiv(item) {
  const div = document.createElement("div")
  div.classList.add("cart__item__img")

  const image = document.createElement("img")
  image.src = item.imageUrl
  image.alt = item.altTxt
  div.appendChild(image) 
  return div
}

// Insertion du contenu de l'article
function makeCartContent(item) {
  const cardItemContent = document.createElement("div")
  cardItemContent.classList.add("cart__item__content")

  const description = makeDescription(item)
  const settings = makeSettings(item)

  cardItemContent.appendChild(description)
  cardItemContent.appendChild(settings)
  return cardItemContent
}

//Création de la description
function makeDescription(item){

  const description = document.createElement('div')
  description.classList.add("cart__item__content__description")

  const h2 = document.createElement('h2')
  h2.textContent = item.name

  const p = document.createElement('p')
  p.textContent = item.color

  const p2 = document.createElement('p')
  p2.textContent = Number(item.price) + "€"

  description.appendChild(h2)
  description.appendChild(p)
  description.appendChild(p2)
  return description
}


//Affichage des settings
function makeSettings(item) {
  const settings = document.createElement("div")
  settings.classList.add("cart__item__content__settings")

  addQuantityToSettings(settings, item)
  addDeleteToSettings(settings, item)
  return settings
}

//Insertion élément "supprimer"
function addDeleteToSettings(settings, item) {
  const div = document.createElement('div')
  div.classList.add("cart__item__content__settings__delete")
  div.addEventListener("click", () => deleteItem())
  const p = document.createElement('p')
  p.textContent = "Supprimer"
  div.appendChild(p)
  settings.appendChild(div)

}
//Suppression élément du panier selon Id et color
function deleteItem() {
  const deleteButtons = document.querySelectorAll(".deleteItem");
  deleteButtons.forEach((deleteButton) => {
    deleteButton.addEventListener("click", (event) => {
      event.preventDefault();
      const deleteId = event.target.getAttribute("data-id");
      const deleteColor = event.target.getAttribute("data-color");
      localCart = localCart.filter(
        (element) => !(element.id == deleteId && element.color == deleteColor)
      );
      deleteConfirm = window.confirm(
        "Etes vous sûr de vouloir supprimer cet article ?"
      );
      if (deleteConfirm == true) {
        localStorage.setItem("cartItems", JSON.stringify(itemsInLocalStorage));
        location.reload();
        alert("Article supprimé avec succès");
      }
    });
  });
}


//Insertion quantité dans un "input"
function addQuantityToSettings(settings, item) {
  const quantity = document.createElement('div')
  quantity.classList.add("cart__item__content__settings__quantity")
  const p = document.createElement('p')
  p.textContent = "Qté: "
  quantity.appendChild(p)
  const input = document.createElement('input')
  input.type = "number"
  input.classList.add("itemQuantity")
  input.name = "itemQuantity"
  input.min = "1"
  input.max = "100"
  input.value = item.quantity
  quantity.appendChild(input)
  settings.appendChild(quantity)
}


//Création form

  


  

