
let articulosCarrito = []

window.addEventListener("load", () => {
    articulosCarrito = JSON.parse(localStorage.getItem("Carrito"))
    agregarAlHTML()
})

//Declarar constantes
const boton_carrito = document.querySelector("#boton-carrito")
const barra_carrito = document.querySelector(".carrito")
const boton_cierreCarrito = document.querySelector("#boton_cierre")
const contenedor_productos = document.querySelector(".seccion_productos .contenedor")
const contenedorProductos = document.querySelector(".carrito .contenedorProductos")
const mensaje = document.querySelector("#mensaje")
const botonEliminar = document.querySelector(".eliminarProductos")
const boton_filtrar_zapatillas = document.querySelector(".boton-zapatillas")
const boton_filtrar_pantalones = document.querySelector(".boton-pantalones")
const boton_filtrar_shores = document.querySelector(".boton-shores")
const boton_filtrar_remeras = document.querySelector(".boton-remeras")

//Eventos
contenedor_productos.addEventListener("click", agregarCarrito)

barra_carrito.addEventListener("click", eliminarProducto)

botonEliminar.addEventListener("click", vaciarCarrito)

boton_filtrar_zapatillas.addEventListener("click", filtrarZapatillas())

boton_filtrar_pantalones.addEventListener("click", filtrarPantalones())

boton_filtrar_shores.addEventListener("click", filtrarShort())

boton_filtrar_remeras.addEventListener("click", filtraRemeras())

//Barra con la lista de productos
boton_carrito.addEventListener("click", () =>{
    barra_carrito.classList.toggle("activate")
})
boton_cierreCarrito.addEventListener("click", () =>{
    barra_carrito.classList.toggle("activate")
})


//Funciones para agregar al carrito, dibujarlo y localStorage

function agregarCarrito(evt){

    if(evt.target.classList.contains("botonAgregar")){
        const producto = evt.target.parentElement.parentElement
        let img = producto.querySelector("img").src
        let nombre_p = producto.querySelector(".nombreProducto").textContent
        let precio = producto.querySelector(".precioProducto").textContent
        let id = producto.getAttribute("data-id")
        
       const p = {
            nombre: nombre_p,
            img: img,
            precio: precio,
            id: id, 
            cantidad: 1
        }

        if(articulosCarrito.some( prod => prod.id === p.id)) {
            const productosCorregidos = articulosCarrito.map( item => {
                if(item.id == p.id){
                    let cantidad = item.cantidad
                    cantidad += 1
                    p.cantidad = cantidad
                    return p
                } 
                else{
                    return item
                }    
            }
          )
          articulosCarrito = productosCorregidos

        } else {
            articulosCarrito.push(p);
        }
        console.log(articulosCarrito)

        agregarAlHTML()

        mensaje.classList.toggle("mostrar")
        setTimeout(() => {
            mensaje.classList.toggle("mostrar")
          }, 1500)
        
    }

 
}
function agregarAlHTML(){
    limpiarHTML()
    agregarStorage()
    articulosCarrito.forEach( (item) => {
      let img = item.img
      let nombre = item.nombre
      let precio = item.precio
      let cantidad = item.cantidad
      

      const div_producto = document.createElement("div")
      div_producto.classList.add("productoSeleccionado")
      div_producto.innerHTML = `<div class="d-flex flex-column">
                                    <img src="${img}" alt="">
                                    <p class="nombre">${nombre}</p>
                                </div>                                 
                                <p class="precio">${precio}</p>
                                <p class="cantidad">${cantidad}</p>
                                <button class="boton-eliminarProductoCarrito" data-id="${item.id}"><i class="fas fa-times" style="color: #f00000";></i></button>`
       contenedorProductos.append(div_producto)                       
     
    })
} 

function limpiarHTML(){
    while(contenedorProductos.firstChild){
        contenedorProductos.removeChild(contenedorProductos.firstChild)
 }

}

function vaciarCarrito(){
    while(contenedorProductos.firstChild){
        contenedorProductos.removeChild(contenedorProductos.firstChild)
    }
    articulosCarrito = []
    agregarStorage()
}

function eliminarProducto(evt){
    if(evt.target.classList.contains("fas")){
        let idEliminar = (evt.target.parentElement.getAttribute("data-id"))
        articulosCarrito.forEach((item) => {
            if(item.id == idEliminar){
                let index = articulosCarrito.indexOf(item)
                articulosCarrito.splice(index, 1)
                console.log(articulosCarrito)
                agregarAlHTML()
            }
        })
    }
}

function agregarStorage(){
    localStorage.setItem("Carrito", JSON.stringify(articulosCarrito))
}

//funciones de filtrado
function filtrarZapatillas(){

}

function filtrarPantalones(){

}

function filtraRemeras(){

}

function filtrarShort(){

}

//funcion para dibujar
function mostrarFiltrado(arr){

}


