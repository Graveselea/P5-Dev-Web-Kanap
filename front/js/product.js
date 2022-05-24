// Récupération id
const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)
const id = urlParams.get("id")

fetch(`http://localhost:3000/api/products/${id}`)
    .then((response) => response.json())
    .then((res) => handleData(res))

// Récupération des données
function handleData(kanap) {
    makeImage(kanap.imageUrl, kanap.altTxt)
    makeTitle(kanap.name)
    makePrice(kanap.price)
    makeDescription(kanap.description)
    makeColors(kanap.colors)
}

// Insertion de l'image
function makeImage(imageUrl, altTxt){
    const image = document.createElement("img")
    image.setAttribute("src", imageUrl) 
    image.setAttribute("alt", altTxt)
    const parent = document.querySelector(".item__img")
    parent.appendChild(image)
}

// Insertion du nom
function makeTitle(name){
    const h1 = document.querySelector("#title")
    h1.textContent = name
}

// Insertion du prix
function makePrice(price){
    const span = document.querySelector("#price")
    span.textContent = price
}

// Insertion de la description
function makeDescription(description){
    const p = document.querySelector("#description")
    p.textContent = description
}

// Insertion du menu déroulant couleurs
function makeColors(colors){
    const select = document.querySelector("#colors")
        colors.forEach((colors) => {
        const option = document.createElement("option")
        option.value = colors
        option.textContent = colors
        select.appendChild(option)
    })  
}

//Evenement obligeant le consommateur à choisir une couleur et une quantité
document.getElementById("addToCart").addEventListener("click", function () {
    let selectedColor = document.getElementById("colors").value
    if (selectedColor == '') {
        alert('Veuillez choisir une couleur');
        return;
    }
    let qtt = document.getElementById("quantity").value
    if (qtt < 1 || qtt > 100) {
        alert('La quantité doit être comprise entre 1 et 100');
        return;
    }
    
    
    let product = {
        'id': id, 
        'color': selectedColor,
        'quantity': parseInt(qtt),    
    }

    addProductToCart(product);

})

//Mise à jour du localSorage avec les options couleurs, quantité et id
function addProductToCart(product){
    let localCart = [];
    if(localStorage.getItem('cart')){
        localCart = JSON.parse(localStorage.getItem('cart'));
    }

    if(localCart.length){
        let modified = false;
        localCart.forEach(element => {
            if(element.id == product.id && element.color == product.color){
                element.quantity += product.quantity;
                modified = true;
            }
        })
        if(!modified){
            localCart.push(product);
        }
        localStorage.setItem('cart', JSON.stringify(localCart))
        alert("Produit ajouté au panier !");

    }else{
        localCart.push(product);
        localStorage.setItem('cart', JSON.stringify(localCart))
        alert("Produit ajouté au panier !");
    }
}