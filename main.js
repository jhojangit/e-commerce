
async function main() {
    
    const db = {
        products: JSON.parse(window.localStorage.getItem('products'))
            || await getProducts(),

        cart: JSON.parse(window.localStorage.getItem('cart')) || {}
    }

    showCart()

    showProducts(db)

    addItemsCart(db)

    showProductsCart(db) 
    
    handle(db)

    cartTotal(db)

    visibleNav()
}

async function getProducts() {
    let data = await fetch('https://ecommercebackend.fundamentos-29.repl.co/')
    let res = await data.json()
    window.localStorage.setItem('products', JSON.stringify(res))
    return res;
}

function addItemsCart(db) {
    const productsHTML = document.querySelector('.main_products')
    productsHTML.addEventListener('click', e => {
        if (e.target.classList.contains('product_button')) {
            const productID = Number(e.target.id)

            const productFound = db.products.find(product => product.id === productID)

            if (db.cart[productFound.id]) {
                if (productFound.quantity === db.cart[productFound.id].amount) {
                    return alert('No hay más cantidad de este producto')
                }
                db.cart[productFound.id].amount++
            } else {
                let newProduct = structuredClone(productFound)
                newProduct.amount = 1
                db.cart[productFound.id] = newProduct
            }

            localStorage.setItem('cart', JSON.stringify(db.cart))
            showProductsCart(db)
            cartTotal(db)
        }
    })
}

function showProductsCart(db) {
    let cartProducts = document.querySelector('.cart_products')

    let html = ''
    for (const i in db.cart) {
        html += `
        <div class="item_product">
            <div class="item_product_img">
                <img src="${db.cart[i].image}" alt="">
            </div>
            <div class='item_product_body'>
            <p class="item_product_name"> <b>${db.cart[i].name}</b></p>
            <p class="item_product_price">$${db.cart[i].price}.00 
            <br> <span> <em>Cantidad en Stock: ${db.cart[i].quantity}</em></span></p>
            <p class ='amount'> <b class ='item_amount'>${db.cart[i].amount}</b> </p>
            <p class ='sub_total_item'>Sub-Total: $<p class='subtotal_price'> ${db.cart[i].amount *db.cart[i].price}.00 </p></p>

            
                    <div class='item_product_options'>
                        <i class='bx bx-plus' id='${db.cart[i].id}'></i>
                        <i class='bx bx-minus' id='${db.cart[i].id}'></i>
                        <i class='bx bx-trash-alt' id='${db.cart[i].id}'></i>
                    </div>
                
            </div>
        </div>`

    }

    cartProducts.innerHTML = html
}

function cartTotal(db) {
    let cartSub = document.querySelectorAll('.subtotal_price')
    let cartTotalHTML = document.querySelector('.cart_total')
    let cartProductsHTML = document.querySelector('.cart_products')
    let amountHTML = document.querySelectorAll('.item_amount')

    

    let total = 0
    cartSub.forEach(element =>{
        total += Number(element.textContent)
    })

    let amount = 0
    amountHTML.forEach(element =>{
        amount += Number(element.textContent)
    })

    let bxCart = document.querySelector(".bx-cart")
    bxCart.innerHTML = amount



    let body_total = 
                    `
                    <div class="body_total">
                        <h4>Total: $<span class='view_total'>${total}</span>.00</h4>
                        <p>Items: ${amount}</p>
                        <button class="btn_buy">Comprar</button>
                    </div>
    `
    cartTotalHTML.innerHTML = body_total


    cartProductsHTML.addEventListener('click', e =>{

        
        if (e.target.classList.contains('bx-plus') ||
        e.target.classList.contains('bx-minus') ||
        e.target.classList.contains('bx-trash-alt')) {
            cartTotal(db)
        }
        
    })


}

function handle(db) {
    const mainProductsHTML = document.querySelector('.cart_products')

    mainProductsHTML.addEventListener('click', e =>{

        if(e.target.classList.contains('bx-plus')){

            const idProduct = Number(e.target.id)

            if (db.cart[idProduct].quantity === db.cart[idProduct].amount) {
                return alert('No hay más cantidad de este producto')
            }
            db.cart[idProduct].amount++
            
        }
        if(e.target.classList.contains('bx-minus')){

            const idProduct = Number(e.target.id)
            db.cart[idProduct].amount--
            if(db.cart[idProduct].amount === 0){
                delete db.cart[idProduct]
            }
        }
        if(e.target.classList.contains('bx-trash-alt')){

            const idProduct = Number(e.target.id)
            delete db.cart[idProduct]
        }

        localStorage.setItem('cart', JSON.stringify(db.cart))
        showProductsCart(db)
        
    })
}

function showProducts(db) {
    let htmlProducts = document.querySelector('.main_products')
    let html = ''


    for (const i in db.products) {
        html += `
        <div class="product_container">
            <img src="${db.products[i].image}" alt="">
            <div class="product_line">
                <p class="product_price">$${db.products[i].price} <span>Stock ${db.products[i].quantity}</span></p>
                <button class="product_button" id="${db.products[i].id}">+</button>
                </div>
            <p class="product_name">${db.products[i].name}</p>
        </div>`

    }
    htmlProducts.innerHTML = html

}

function showCart() {

    let iconCart = document.querySelector('.bx-cart')
    let cartHTML = document.querySelector('.cart')

    iconCart.addEventListener('click', () => {
        cartHTML.classList.toggle('cart_show')
    })
}

function visibleNav() {
    let navHTML = document.querySelector('nav') 
    window.addEventListener('scroll', () =>{
        if (window.scrollY > 50) {
            navHTML.classList.add('visible_nav')
        }else{
            navHTML.classList.remove('visible_nav')
        }
        
    })
}

main()
