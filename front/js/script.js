// Appel à l'API products
fetch ("http://localhost:3000/api/products")
    .then((res) => res.json())
    .then((data) => addProducts(data))


// Récupération des données et intégration dans le DOM
function addProducts(donnees) {
        donnees.forEach((canap)=> {
        const {_id, imageUrl, altTxt, name, description} = canap
        const anchor = makeAnchor(_id)
        const article = document.createElement("article")
        const image = makeImage(imageUrl, altTxt)
        const h3 = makeH3(name)
        const p = makeParagraph(description)
        appendElementToArticle(article, [image, h3, p])
        appendArticleToAnchor(anchor, article)
        }) 
} 

// Insertion des élement dans les articles
function appendElementToArticle(article, array) {
        array.forEach((item) => {
                article.appendChild(item)
        })
}
// Insertion de l'ID
function makeAnchor(id) {
        const anchor = document.createElement("a")
        anchor.href = "./product.html?id=" + id
        return anchor
}

// Insertion des items
function appendArticleToAnchor(anchor, article) {
        const items = document.querySelector("#items")
        if (items != null) {
        items.appendChild(anchor)
        anchor.appendChild(article)
    }
}

// Insertion des images
function makeImage(imageUrl, altTxt) {
        const image = document.createElement("img")
        image.src = imageUrl
        image.alt = altTxt
        return image
}

// Insertion du nom
function makeH3(name) {
        const h3 = document.createElement("h3")
        h3.textContent = name
        h3.classList.add("productName")
        return h3
}

// Insertion de la description
function makeParagraph(description) {
        const p = document.createElement("p")
        p.textContent = description
        p.classList.add("productDescription")
        return p
}

// Insertion des articles
function makeArticle() {
        return document.createElement("article")
}



