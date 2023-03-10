
async function main(){
    let res = JSON.parse(window.localStorage.getItem('products')) || await getProducts()
    showProducts(res)
}

async function getProducts() {
    let data = await fetch('https://ecommercebackend.fundamentos-29.repl.co/')
    let res = await data.json()
    window.localStorage.setItem('products',JSON.stringify(res))
    return res;
}

function showProducts(products) {
    let htmlProducts = document.querySelector('.main_products')
    let html = ''


    for (const product of products) {
        html += `
        <div class="product_container">
            <img src="${product.image}" alt="">
            <button class="product_button">+</button>
            <p class="product_price">$${product.price} <span>Stock ${product.quantity}</span></p>
            <p class="product_desription">${product.name}</p>
        </div>`


    }
    htmlProducts.innerHTML = html
    
}

main()
