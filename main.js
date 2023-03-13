
async function main(){

    
    const db = {
        products: JSON.parse(window.localStorage.getItem('products')) 
                    || await getProducts(),

        cart: {}
    }

    showCart()

    showProducts(db)

    const productsHTML= document.querySelector('.main_products')
    productsHTML.addEventListener('click', e=> {
        if(e.target.classList.contains('product_button')){
            const productID = Number(e.target.id)

            const productFound = db.products.find(product => product.id === productID)
            console.log(productFound.id);
        if(db.cart[productFound.id]){
            db.cart[productFound.id].amount ++
            
        }else{
            let newProduct = structuredClone(productFound)
            newProduct.amount = 1
            db.cart[productFound.id] = newProduct

        }




    let cartProducts = document.querySelector('.cart_products')
        
    let html = ''
    for (const i in db.cart) {
        html += `
        <div class="item_product">
            <div class="item_product_img">
                <img src="${db.cart[i].image}" alt="">
            </div>
            <div class='item_product_body'>
                    <p class="item_product_price">$${db.cart[i].price} <span>Stock ${db.cart[i].quantity}</span></p>
                    <p class="item_product_name">${db.cart[i].name}</p>
                    <p class ='item_amount'>Cantidad: ${db.cart[i].amount}</p>
            </div>
        </div>`
        
    }

    cartProducts.innerHTML = html
        } 
        })

        

}

async function getProducts() {
    let data = await fetch('https://ecommercebackend.fundamentos-29.repl.co/')
    let res = await data.json()
    window.localStorage.setItem('products',JSON.stringify(res))
    return res;
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

function showCart(){

    let iconCart = document.querySelector('.bx-cart')
    let cartHTML = document.querySelector('.cart')

    iconCart.addEventListener('click', ()=>{
        cartHTML.classList.toggle('cart_show')
    })
}

main()
