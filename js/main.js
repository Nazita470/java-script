

const articulosCarrito = []

const contenedor_productos = document.querySelector(".seccion_productos .contenedor");
//console.log(contenedor_productos)

contenedor_productos.addEventListener("click", agregarCarrito)

function agregarCarrito(evt){

    if(evt.target.classList.contains("botonAgregar")){
        const producto = evt.target.parentElement.parentElement
        let img = producto.querySelector("img").src
        let nombre_p = producto.querySelector(".nombreProducto").textContent
        let precio = producto.querySelector(".precioProducto").textContent
        
       const p = {
            nombre: nombre_p,
            img: img,
            precio: precio
        }

        console.log(p)
    }
}