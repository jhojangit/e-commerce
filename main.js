
async function main() {
    
    const db = {
        products: JSON.parse(window.localStorage.getItem('products'))
            || await getProducts(),

        cart: JSON.parse(window.localStorage.getItem('cart')) || {}
    }


    showCart()

    showMenu()

    showProducts(db)

    addItemsCart(db)

    showProductsCart(db) 
    
    handle(db)

    cartTotal(db)

    visibleNav()

    darkMode()

    mix()



}

async function getProducts() {
    let data = await fetch('https://ecommercebackend.fundamentos-29.repl.co/')
    let res = await data.json()
    window.localStorage.setItem('products', JSON.stringify(res))
    return res;


    
}

function mix() {
    mixitup(".main_products", {
        selectors: {
            target: ".product_container"
        },
        "animation": {
            "duration": 602,
            "nudge": false,
            "reverseOut": true,
            "effects": "fade translateX(20%) translateY(20%) translateZ(-100px) rotateX(90deg) rotateY(90deg) stagger(30ms)"
        }
    });

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
            <p class="item_product_price">$${db.cart[i].price}.00</p>
            <span> <em>Cantidad en Stock: ${db.cart[i].quantity}</em></span></p>
            <p class ='amount'>Items <b class ='item_amount'> ${db.cart[i].amount}</b> </p>
            <p class ='sub_total_item'>Sub-Total: $<span class='subtotal_price'>${db.cart[i].amount *db.cart[i].price}.00 </span></p>
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

    document.querySelector(".bx-cart").innerHTML=amount
    



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


    let btnBuy = document.querySelector('.btn_buy')
    btnBuy.addEventListener('click', ()=> {



        
        if (total != 0) {
            let confirma = confirm('¿Quieres confirmar la transacción?')
            if (confirma) {
                alert('Gracias por tu darnos tu dinero 💵💵💵💲')
            db.cart = {}

            localStorage.setItem('cart', JSON.stringify(db.cart))

            cartTotal(db)
            showProductsCart(db)
            showCart(db)
            showProducts(db)
            addItemsCart(db)
            handle(db)
            main()
            window.location.reload()
                }
            
        }else{
            alert('Agrega productos al carrito 🛒')
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
        <div class="product_container ${db.products[i].category}">
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

function showMenu(){
    let btnMenuHTML = document.querySelector('i.bx.bx-menu')
    let menuHTML = document.querySelector('.nav_menu-options')
    let homeText = document.querySelector('.btn_home-text')
    let productText = document.querySelector('.btn_products-text') 


    homeText.addEventListener('click', ()=>{
        menuHTML.classList.toggle('nav_menu-options_show')
    })

    btnMenuHTML.addEventListener('click', ()=>{
        menuHTML.classList.toggle('nav_menu-options_show')
    })

    productText.addEventListener('click', ()=>{
        menuHTML.classList.toggle('nav_menu-options_show')
    })


}

function visibleNav() {
    let navHTML = document.querySelector('nav') 
    window.addEventListener('scroll', () =>{
        if (window.scrollY > 20) {
            navHTML.classList.add('visible_nav')
        }else{
            navHTML.classList.remove('visible_nav')
        }
        
    })
}

function darkMode() {
    let botonDarkHTML = document.querySelector('.btn_dark')
    let bodyHTML = document.querySelector('body')
    let header_textHTML = document.querySelector('.header_text-box')
    let header_HTML = document.querySelector('header')
    let fotter_HTML = document.querySelector('footer')
    let headIMG_HTML = document.querySelector('.header_img')
    let headerColorHTML = document.querySelector('header')
    let cartDarkHTML = document.querySelector('.cart')



    botonDarkHTML.addEventListener('click', ()=>{
        bodyHTML.classList.toggle('body_dark')
    })

    botonDarkHTML.addEventListener('click', ()=>{
        header_textHTML.classList.toggle('header_text-box_dark')
    })

    botonDarkHTML.addEventListener('click', ()=>{
        header_HTML.classList.toggle('header_dark')
    })

    botonDarkHTML.addEventListener('click', ()=>{
        fotter_HTML.classList.toggle('footer_dark')
    })

    botonDarkHTML.addEventListener('click', ()=>{
        headIMG_HTML.classList.toggle('header_img_Dark')
    })

    botonDarkHTML.addEventListener('click', ()=>{
        headerColorHTML.classList.toggle('header_text_dark')
    })

    botonDarkHTML.addEventListener('click', ()=>{
        cartDarkHTML.classList.toggle('cart_dark')
    })

    
}



main()