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
  }else{
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
  
}

//Récupération du total
function displayTotal() {
  let quantity = 0;
  let price = 0;

  localCart.forEach(element =>{
    fetch(`http://localhost:3000/api/products/${element.id}`)

    .then((response) => response.json())
    .then((product)=> {
      quantity += element.qty;
      price += product.price * element.qty;
      document.getElementById('totalQuantity').innerHTML = quantity;
      document.getElementById('totalPrice').innerHTML = price;
    })
  })
}

//Modification de la quantité
function changeQuantity(e) {
  console.log(e.target)
  let localCart = localStorage.cart;
  let article = e.target.closest('article');
  let productId = article.dataset.id;
  let productColor = article.dataset.color;

  displayTotal();

    /*const quantityInputs = document.querySelectorAll(".cart__item");



  /*const quantityInputs = document.querySelectorAll(".cart__item");
  console.log(quantityInputs)
  quantityInputs.forEach(quantityInput => {
  console.log(quantityInput)
  quantityInput.addEventListener("change", (event) => {
      event.preventDefault();
      const inputValue = event.target.value;
      const dataId = event.target.getAttribute("data-id");
      const dataColor = event.target.getAttribute("data-color");
      console.log(inputValue)
      console.log(dataId)
      console.log(dataColor)
      
      
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
  });*/
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
  input.value = item.quantity;
  input.addEventListener('change', changeQuantity);
  quantity.appendChild(input)
  settings.appendChild(quantity)
  
}


//Création form

// Variables Regex
let nameRegex = /^[a-zA-Z\-çñàéèêëïîôüù ]{2,}$/;
let adressRegex = /^[0-9a-zA-Z\s,.'-çñàéèêëïîôüù]{3,}$/;
let emailRegex = /^[A-Za-z0-9\-\.]+@([A-Za-z0-9\-]+\.)+[A-Za-z0-9-]{2,4}$/;

// Variables pour récupérer les id des champs de formulaire
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const address = document.getElementById("address");
const city = document.getElementById("city");
const email = document.getElementById("email");
  
// Validation prénom
firstName.addEventListener("input", (event) => {
  event.preventDefault();
  if (nameRegex.test(firstName.value) == false || firstName.value == "") {
    document.getElementById("firstNameErrorMsg").innerHTML =
      "Prénom non valide";
    return false;
  } else {
    document.getElementById("firstNameErrorMsg").innerHTML = "";
    return true;
  }
});

// Validation nom
lastName.addEventListener("input", (event) => {
  event.preventDefault();
  if (nameRegex.test(lastName.value) == false || lastName.value == "") {
    document.getElementById("lastNameErrorMsg").innerHTML = "Nom non valide";
    return false;
  } else {
    document.getElementById("lastNameErrorMsg").innerHTML = "";
    return true;
  }
});

// Validation adresse
address.addEventListener("input", (event) => {
  event.preventDefault();
  if (adressRegex.test(address.value) == false || address.value == "") {
    document.getElementById("addressErrorMsg").innerHTML = "Adresse non valide";
    return false;
  } else {
    document.getElementById("addressErrorMsg").innerHTML = "";
    return true;
  }
});

// Validation ville
city.addEventListener("input", (event) => {
  event.preventDefault();
  if (nameRegex.test(city.value) == false || city.value == "") {
    document.getElementById("cityErrorMsg").innerHTML = "Ville non valide";
    return false;
  } else {
    document.getElementById("cityErrorMsg").innerHTML = "";
    return true;
  }
});

// Validation email
email.addEventListener("input", (event) => {
  event.preventDefault();
  if (emailRegex.test(email.value) == false || email.value == "") {
    document.getElementById("emailErrorMsg").innerHTML = "Email non valide";
    return false;
  } else {
    document.getElementById("emailErrorMsg").innerHTML = "";
    return true;
  }
});

let order = document.getElementById("order");
order.addEventListener("click", (e) => {
  e.preventDefault();
  // création d'un tableau afin de récuperer les données de l'utilisateur
  let contact = {
    firstName: firstName.value,
    lastName: lastName.value,
    address: address.value,
    city: city.value,
    email: email.value,
  };

  if (
    firstName.value === "" ||
    lastName.value === "" ||
    address.value === "" ||
    city.value === "" ||
    email.value === ""
  ) {
    alert("Vous devez renseigner vos coordonnées pour passer la commande !");
  } else if (
    nameRegex.test(firstName.value) == false ||
    nameRegex.test(lastName.value) == false ||
    adressRegex.test(address.value) == false ||
    nameRegex.test(city.value) == false ||
    emailRegex.test(email.value) == false
  ) {
    alert("Merci de renseigner correctement vos coordonnées !");
  } else {
    let products = [];
    localCart.forEach((order) => {
      products.push(order.id);
    });

    let pageOrder = { contact, products };

    // Appel à l'api order pour envoyer les tableaux
    fetch("http://localhost:3000/api/products/order", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify(pageOrder),
    })
      .then((res) => {
        return res.json();
      })
      .then((confirm) => {
        window.location.href = "./confirmation.html?orderId=" + confirm.orderId;
        localStorage.clear();
      })
      .catch((error) => {
        console.log("une erreur est survenue");
      });
  }
});



  

