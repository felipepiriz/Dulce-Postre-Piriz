
let stockProductos = 
[{id:1, nombre: "Banana Split", cantidad:1, desc: "Una torta con una base de chocolate, banana y dulce de leche con una crema chantilly por encima, forman esta torta tan clasica, que nunca falla.",precio:2500,img:"../multimedia/bananasplit.jpg"},
{id:2, nombre: "Chocotorta Boca",  cantidad:1, desc: "Galletitas de chocolate, relleno de dulce de leche y queso crema, copos de merengue italiano de color y decorada con chocolates y golosinas.",precio:2000,img:"../multimedia/bokee.jpg"},
{id:3, nombre: "Lasagna de Chocolate",  cantidad:1, desc: "Base de brownie, crema chantilly, dulce de leche natural, merengue italiano y chips de chocolate.", precio:2300 , img:"../multimedia/lasagnachocolate.jpg"},
{id:4, nombre: "Torta Oreo",  cantidad:1, desc: "Torta Oreo de Dulce de leche, Ideal para comer refrigerada o helada ", precio:2700 , img:"../multimedia/oreo.jpg"},
{id:5, nombre: "Torta Rogel",  cantidad:1, desc: "Sucesivas galletas neutras alternando con abundante dulce de leche y finalmente cubierto por una capa de merengue.",precio:3000,img:"../multimedia/rogel.jpg"},
{id:6, nombre: "Torta De Frutilla", cantidad:1, desc: "Tarta dulce, crema chantilly o pastelera, frutillas y gelatina.",precio:2600,img:"../multimedia/tortadefrutilla.jpg"}
]
let carrito=[];
let contenedorProductos = document.getElementById("productos");
let botonVaciar = document.getElementById("vaciar-carrito")
let contenedorCarrito = document.getElementById("carrito-contenedor");
let contadorCarrito =document.getElementById("contadorCarrito")
let precioTotal = document.getElementById("precioTotal")

document.addEventListener ('DOMContentLoaded', () => {
    if (localStorage.getItem('carrito')){
        carrito = JSON.parse(localStorage.getItem('carrito'))
        actualizarCarrito()
    }
}
)

botonVaciar.addEventListener("click",() => {
    carrito.length = 0;
    actualizarCarrito();
})

stockProductos.forEach( (producto) => {
    let div = document.createElement("div");
    div.classList.add("container");
    div.innerHTML = `
    <div class="product-details">
                <h1>${producto.nombre}</h1>
                <p class="information">"${producto.desc}"</p>
            <div class="control">
                <button class="btn" id="agregar${producto.id}">
            <!-- PRECIO -->
                <span class="price">${producto.precio}$</span>
            <!--LOGO DE CARRITO -->
                <span class="shopping-cart"><i class="fas fa-shopping-cart" aria-hidden="true"></i></span>
            <!-- COMPRAR AHORA / AGREGAR AL CARRITO -->
                <span class="buy">Comprar</span>
            </button>
                <!-- termina boton -->
                
            </div>
                        
            </div>
            <div class="product-image">
                <img src="${producto.img}">
            </div>
            <!--Termina producto 1-->
        </div>
    `
    contenedorProductos.appendChild(div);

    const boton = document.getElementById(`agregar${producto.id}`)

    boton.addEventListener ( "click", () => {
        agregarAlCarrito(producto.id);
    })
}
)

const agregarAlCarrito = (prodId) => {
    const existe = carrito.some (prod => prod.id === prodId);

    if (existe){
        let prod = carrito.map (prod => {
            if (prod.id === prodId){
                prod.cantidad++
            }
            Toastify({
                text: "Se añadio el producto al carro",
                duration: 3000
                }).showToast();
        })
    } else {

    const item = stockProductos.find ((prod) => prod.id === prodId) 
    carrito.push(item);
    console.log(carrito)
    Toastify({
        text: "Se añadio el producto al carro",
        duration: 3000
        }).showToast();
    }
    actualizarCarrito()
}

const eliminarDelCarrito = (prodId) => {
    const item = carrito.find ((prod)=> prod.id === prodId)
    const indice = carrito.indexOf(item);
    carrito.splice (indice, 1);
    actualizarCarrito();
}

let actualizarCarrito = () => {
    contenedorCarrito.innerHTML=""


    carrito.forEach((prod) => {
        let div = document.createElement("div");
        div.className = ("productoEnCarrito");
        div.innerHTML = `
        <p>${prod.nombre}</p>
        <p>Precio: ${prod.precio}$</p>
        <p>Cantidad:<span i="cantidad"> ${prod.cantidad}</span></p>
        <button onclick = "eliminarDelCarrito(${prod.id})" class ="botonEliminar"><i class= "fas fa-trash-alt"></i></button>
        `
        contenedorCarrito.appendChild(div);
        
    })
    contadorCarrito.innerText = carrito.length;
    precioTotal.innerText = carrito.reduce((acc,prod) => acc + prod.precio,0);
    localStorage.setItem("carrito",JSON.stringify(carrito))
}