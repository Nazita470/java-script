
let articulosCarrito = []
const productos = []
let woman = false
let man = false
let zapatillasCheck = false
let remerasCheck = false
let pantalonesCheck = false
let shortsCheck = false
let todo = false
let productoMostrar = []
let seleccionado = zapatillasCheck || remerasCheck || pantalonesCheck || shortsCheck

//Cargar productos cuando recarge la pagina
window.addEventListener("load", () => {
    articulosCarrito = JSON.parse(localStorage.getItem("Carrito"))
    agregarAlHTML()
    recuperarProductos()
    mostrarFiltrado()
})

//Declarar constantes
const boton_carrito = document.querySelector("#boton-carrito")
const barra_carrito = document.querySelector(".carrito")
const boton_cierreCarrito = document.querySelector("#boton_cierre")
const contenedor_productos = document.querySelector(".seccion_productos .contenedor")
const contenedorProductos = document.querySelector(".carrito .contenedorProductos")
const mensaje = document.querySelector("#mensaje")
const botonEliminar = document.querySelector(".eliminarProductos")
const boton_filtrar_zapatillas = document.querySelector("#boton-zapatillas")
const boton_filtrar_pantalones = document.querySelector("#boton-pantalones")
const boton_filtrar_shores = document.querySelector("#boton-short")
const boton_filtrar_remeras = document.querySelector("#boton-remeras")
const boton_filtrar_todos = document.querySelector("#boton-todos")
const check_generoMujer = document.querySelector("#option-Mujer")
const check_generoHombre = document.querySelector("#option-Hombre")
const classProductos = document.querySelectorAll(".producto")

//Event
contenedor_productos.addEventListener("click", agregarCarrito)

barra_carrito.addEventListener("click", eliminarProducto)

botonEliminar.addEventListener("click", vaciarCarrito)

boton_filtrar_zapatillas.addEventListener("change", filtrarZapatillas)

boton_filtrar_pantalones.addEventListener("change", filtrarPantalones)

boton_filtrar_shores.addEventListener("change", filtrarShort)

boton_filtrar_remeras.addEventListener("change", filtraRemeras)

boton_filtrar_todos.addEventListener("change", filtrarTodos)

check_generoMujer.addEventListener("change", filtrarMujer)
check_generoHombre.addEventListener("change", filtrarHombre)

console.log(woman)
console.log(man)

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
    boton_filtrar_remeras.nextElementSibling.classList.remove("boton-seleccionado")
    boton_filtrar_pantalones.nextElementSibling.classList.remove("boton-seleccionado")
    boton_filtrar_zapatillas.nextElementSibling.classList.add("boton-seleccionado")
    boton_filtrar_shores.nextElementSibling.classList.remove("boton-seleccionado")
    boton_filtrar_todos.nextElementSibling.classList.remove("boton-seleccionado")
    let mensaje = ""

    zapatillasCheck =  true
    pantalonesCheck = false
    shortsCheck = false
    todo = false 
    remerasCheck = false

    if(zapatillasCheck){
        productoMostrar = filtrarProducto(productos, "zapatillas")
        if(woman == man){
          mensaje = "Zapatillas"
        }else if(man){
            filtrarGenero("m")
            mensaje = "Zapatillas de hombres"
        }else if(woman){
            filtrarGenero("f")
            mensaje = "zapatillas de mujeres"
        }
    }
        
    
    mostrarFiltrado(mensaje)
    
}

function filtrarPantalones(){
    boton_filtrar_remeras.nextElementSibling.classList.remove("boton-seleccionado")
    boton_filtrar_pantalones.nextElementSibling.classList.add("boton-seleccionado")
    boton_filtrar_zapatillas.nextElementSibling.classList.remove("boton-seleccionado")
    boton_filtrar_shores.nextElementSibling.classList.remove("boton-seleccionado")
    boton_filtrar_todos.nextElementSibling.classList.remove("boton-seleccionado")
    let mensaje = ""
    
    zapatillasCheck =  false
    pantalonesCheck = true
    shortsCheck = false
    todo = false 
    remerasCheck = false

    if(pantalonesCheck) {
        productoMostrar = filtrarProducto(productos, "pantalon")
        if(woman == man){
          mensaje = "Pantalones"
        }else if(man){
            mensaje = "Pantalones de hombre"
            filtrarGenero("m")
        }else if(woman){
            mensaje = "Pantalones de mujer"
            filtrarGenero("f")
        }
    }

    mostrarFiltrado(mensaje)
}

function filtraRemeras(){
    boton_filtrar_remeras.nextElementSibling.classList.add("boton-seleccionado")
    boton_filtrar_pantalones.nextElementSibling.classList.remove("boton-seleccionado")
    boton_filtrar_zapatillas.nextElementSibling.classList.remove("boton-seleccionado")
    boton_filtrar_shores.nextElementSibling.classList.remove("boton-seleccionado")
    boton_filtrar_todos.nextElementSibling.classList.remove("boton-seleccionado")
    let mensaje = ""

    zapatillasCheck =  false
    pantalonesCheck = false
    shortsCheck = false
    todo = false 
    remerasCheck = true


    console.log("remera: " + remerasCheck)
    if(remerasCheck) {
        productoMostrar = filtrarProducto(productos, "remera")
        console.log(productoMostrar)
        if(woman == man){
          mensaje = "Remeras"
        }else if(man){
            filtrarGenero("m")
            mensaje = "Remeras de hombre"
        }else if(woman){
            mensaje = "Remeras de mujer"
            filtrarGenero("f")
        }
    }

    mostrarFiltrado(mensaje)
}

function filtrarShort(){
    boton_filtrar_remeras.nextElementSibling.classList.remove("boton-seleccionado")
    boton_filtrar_pantalones.nextElementSibling.classList.remove("boton-seleccionado")
    boton_filtrar_zapatillas.nextElementSibling.classList.remove("boton-seleccionado")
    boton_filtrar_shores.nextElementSibling.classList.add("boton-seleccionado")
    boton_filtrar_todos.nextElementSibling.classList.remove("boton-seleccionado")
    let mensaje = ""

    zapatillasCheck =  false
    pantalonesCheck = false
    shortsCheck = true
    todo = false 
    remerasCheck = false

    if(shortsCheck) {
        productoMostrar = filtrarProducto(productos, "short")
        if(woman == man){
          mensaje = "Shorts"
        }else if(man){
            mensaje = "Shorts de hombres"
            filtrarGenero("m")
        }else if(woman){
            mensaje = "Shorts de mujeres"
            filtrarGenero("f")
        }
    }

    mostrarFiltrado(mensaje)
}

function filtrarTodos(){
    boton_filtrar_remeras.nextElementSibling.classList.remove("boton-seleccionado")
    boton_filtrar_pantalones.nextElementSibling.classList.remove("boton-seleccionado")
    boton_filtrar_zapatillas.nextElementSibling.classList.remove("boton-seleccionado")
    boton_filtrar_shores.nextElementSibling.classList.remove("boton-seleccionado")
    boton_filtrar_todos.nextElementSibling.classList.add("boton-seleccionado")
    let mensaje = ""

    zapatillasCheck =  false
    pantalonesCheck = false
    shortsCheck = false
    todo = true 
    remerasCheck = false

    if(todo){
        productoMostrar = productos
         if(woman == man){
            mensaje = "Todos"
         }else if(man){
            mensaje = "Hombres"
            filtrarGenero("m")
         }else if(woman){
            mensaje = "Mujeres"
            filtrarGenero("f")
         }
    }

    mostrarFiltrado(mensaje)
}

function filtrarMujer(){
    woman = woman == false
    let mensaje = ""
    if(woman && man == false) {
        filtrarGenero("f")
        mensaje = "Mujeres"

    }else if (man && woman == false){
        mensaje = "Hombres"
       filtrarGenero("m")
    }
    else if(man == woman && todo){
          productoMostrar = productos
          mensaje = "Todo"
    }
    else if (man == woman && todo == false){
        if(zapatillasCheck){
          productoMostrar = filtrarProducto(productos, "zapatillas")
        } else if(remerasCheck){
            productoMostrar =   filtrarProducto(productos, "remera")
        } else if(shortsCheck){
            productoMostrar =  filtrarProducto(productos, "short")
        } else if(pantalonesCheck){
            productoMostrar =  filtrarProducto(productos, "pantalon")
        }
    }
    mostrarFiltrado(mensaje)
}

function filtrarHombre(){
    man = man == false
    let mensaje = ""
    if(man && woman == false) {
      filtrarGenero("m")
        mensaje = "Hombre"
   
    }else if (man == false && woman){
      filtrarGenero("f")
      mensaje = "Mujer"

    }else if(man == woman && todo){
        productoMostrar = productos
        mensaje = "Todo"
    }
    else if (man == woman && todo == false){
        if(zapatillasCheck){
            productoMostrar =   filtrarProducto(productos, "zapatillas")
        } else if(remerasCheck){
            productoMostrar =  filtraProducto(productos, "remera")
        } else if(shortsCheck){
            productoMostrar = filtrarProducto(productos, "short")
        } else if(pantalonesCheck){
            productoMostrar = filtrarProducto(productos, "pantalon")
        }
    }
    mostrarFiltrado(mensaje)
}



//funcion para dibujar
function mostrarFiltrado(mensaje){
    console.log(productoMostrar)
    borrarProductosMain()
    productoMostrar.forEach((item) => {
        let div = document.createElement("div")
        div.classList.add("producto")
        div.setAttribute("producto", `${item.producto}`)
        div.setAttribute("genero", `${item.genero}`)
        div.setAttribute("data-id", `${item.id}`)
        div.innerHTML = `
                            <section class="seccion_imagen">
                                <img src="${item.img}" alt="" class="imagen">
                            </section>

                            <section class="seccion_nombreProducto">
                                    <p class="nombreProducto w-100">${item.nombre}</p>
                                    <p class="precioProducto w-100">${item.precio}</p>
                                    <button  class="botonAgregar dt">Agregar <i class="fas fa-plus"></i></button>
                            </section> 
        `
        contenedor_productos.append(div)
    })

    
}

function borrarProductosMain(){
    while(contenedor_productos.firstChild){
        contenedor_productos.removeChild(contenedor_productos.firstChild)
    }
}

//funcion para recuperar los productos
function recuperarProductos(){
    classProductos.forEach((item) => {
        let img = item.querySelector("img").src
        let nombre_p = item.querySelector(".nombreProducto").textContent
        let precio = item.querySelector(".precioProducto").textContent
        let id = item.getAttribute("data-id")
        let genero = item.getAttribute("genero")
        let tipoProducto = item.getAttribute("producto")

        const p = {
            nombre: nombre_p,
            img: img,
            precio: precio,
            id: id, 
            genero: genero,
            producto: tipoProducto
        }

        productos.push(p)
        productoMostrar.push(p)
    })
}

function filtrarProducto(arr, str){
    return arr.filter((item) => item.producto == str)
}

function filtrarGenero(str){
    productoMostrar =  productoMostrar.filter((item) => item.genero == str)
}


