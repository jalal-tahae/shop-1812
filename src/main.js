function getAllProducts() {
    fetch("https://fakestoreapi.com/products")
        .then(res => res.json())
        .then(json => renderProducts(json))
        .catch()
}