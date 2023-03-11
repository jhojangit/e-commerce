
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


    for (const product in products) {
        html += `
        <div class="product_container">
            <img src="${products[product].image}" alt="">
            <div class="product_line">
                <p class="product_price">$${products[product].price} <span>Stock ${products[product].quantity}</span></p>
                <button class="product_button" id="${product}">+</button>
                </div>
            <p class="product_name">${products[product].name}</p>
        </div>`

    }
    htmlProducts.innerHTML = html
    
}

main()
