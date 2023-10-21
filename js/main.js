
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

    fetch("./data.json")
    .then((res) => res.json())
    .then((json) => {
         mostrarFiltrado("", json)
        recuperarProductos(json)
    })
    .catch((err) => err)
   
   
    cntProductosCarrito()
})

//Declarar constantes
const boton_carrito = document.querySelector("#boton-carrito")
const barra_carrito = document.querySelector(".carrito")
const boton_cierreCarrito = document.querySelector("#boton_cierre")
const contenedor_productos = document.querySelector(".seccion_productos .contenedor_p")
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
const totalCarrito = document.querySelector("#totalCarrito")
const btn_comprar = document.querySelector("#comprar")
console.log(totalCarrito)

//Event
contenedor_productos.addEventListener("click", agregarCarrito)

btn_comprar.addEventListener("click", comprar)

barra_carrito.addEventListener("click", elimina_resta)

botonEliminar.addEventListener("click", vaciarCarrito)

boton_filtrar_zapatillas.addEventListener("change", filtrarZapatillas)

boton_filtrar_pantalones.addEventListener("change", filtrarPantalones)

boton_filtrar_shores.addEventListener("change", filtrarShort)

boton_filtrar_remeras.addEventListener("change", filtraRemeras)

boton_filtrar_todos.addEventListener("change", filtrarTodos)

check_generoMujer.addEventListener("change", filtrarMujer)

check_generoHombre.addEventListener("change", filtrarHombre)

//Barra con la lista de productos
boton_carrito.addEventListener("click", () =>{
    barra_carrito.classList.toggle("activate")
})
boton_cierreCarrito.addEventListener("click", () =>{
    barra_carrito.classList.toggle("activate")
})



//Funciones para agregar, eliminar y vaciar el carrito y localStorage

function agregarCarrito(evt){

    if(evt.target.classList.contains("botonAgregar")){
        const producto = evt.target.parentElement.parentElement
        let img = producto.querySelector("img").src
        let nombre_p = producto.querySelector(".nombreProducto").textContent
        let precio = producto.querySelector(".precioProducto").textContent
        let id = producto.getAttribute("data-id")
        let subTotal = parseInt(eliminarString(precio.slice(1)))
        
       const p = {
            nombre: nombre_p,
            img: img,
            precio: precio,
            id: id, 
            cantidad: 1,
            subTotal: subTotal
        }

        if(articulosCarrito.some( prod => prod.id === p.id)) {
            const productosCorregidos = articulosCarrito.map( item => {
                if(item.id == p.id){
                    let p_cantidad = item.cantidad
                    p_cantidad++
                    p.cantidad = p_cantidad

                    //let precio_numero = eliminarString(p.precio.slice(1))
                    let subTotal = p.subTotal * parseInt(p.cantidad)

                    p.subTotal = subTotal
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

        notificacion()
        
    }

    cntProductosCarrito()

 
}


function vaciarCarrito(){
    while(contenedorProductos.firstChild){
        contenedorProductos.removeChild(contenedorProductos.firstChild)
    }
    articulosCarrito = []
    agregarStorage()
    cntProductosCarrito()
}

function elimina_resta(evt){
    if(evt.target.classList.contains("fas")){
        let idEliminar = (evt.target.parentElement.getAttribute("data-id"))
        articulosCarrito.forEach((item) => {
            if(item.id == idEliminar){
                let index = articulosCarrito.indexOf(item)
                articulosCarrito.splice(index, 1)
                console.log(articulosCarrito)
              
            }
        })
    }
    if(evt.target.classList.contains("btn_cantidad")){
       let funcion = evt.target.getAttribute("data-funcion") 
       console.log(funcion)
       let idProductoModificar = evt.target.parentElement.parentElement.parentElement.parentElement.querySelector(".boton-eliminarProductoCarrito").getAttribute("data-id")
       articulosCarrito.forEach( (item)=>{
        if(item.id == idProductoModificar){
            if(funcion == "resta"){
                if(item.cantidad > 1) {
                    
                    item.cantidad = parseInt(item.cantidad) - 1

                    let precio_numero = eliminarString(item.precio.slice(1))
                    let subTotal = precio_numero * parseInt(item.cantidad)

                    item.subTotal = subTotal
                }else{
                    let index = articulosCarrito.indexOf(item)
                    articulosCarrito.splice(index, 1)
                    console.log(articulosCarrito)
                }
            } else{
                item.cantidad = parseInt(item.cantidad) + 1
                console.log(item.cantidad)
                let precio_numero = eliminarString(item.precio.slice(1))
                let subTotal = precio_numero * parseInt(item.cantidad)
                item.subTotal = subTotal
            }
           
        }
       })

       console.log(articulosCarrito)

    }
   

    agregarAlHTML()
    cntProductosCarrito()
}

function agregarStorage(){
    localStorage.setItem("Carrito", JSON.stringify(articulosCarrito))
}

//funcion para mostrar el alert 
function comprar(){
    const precio = calcularTotal()
    Swal.fire({
        title: 'Pago total $' + precio,
        showDenyButton: true,
        denyButtonText: `Cancel`,
        html: ''
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          Swal.fire('Pago realizado', '', 'success')
          articulosCarrito = []
          agregarAlHTML()
          cntProductosCarrito()
        } 
      })
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
         mensaje = "Zapatillas de mujeres"
        }
    }
        
    console.log(mensaje)
    mostrarFiltrado(mensaje, productoMostrar)
    
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

    mostrarFiltrado(mensaje, productoMostrar)
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

    mostrarFiltrado(mensaje, productoMostrar)
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

    mostrarFiltrado(mensaje, productoMostrar)
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

    mostrarFiltrado(mensaje, productoMostrar)
}

function filtrarMujer(){
    woman = woman == false
    let mensaje = ""
    console.log(woman)
    console.log(man)
    console.log(todo)
    if(woman && man == false) {
        filtrarGenero("f")
        mensaje = "Mujeres"
        
    }else if (man && woman == false){
        mensaje = "Hombres"
       filtrarGenero("m")
    }
    else if(man == woman && todo){
          productoMostrar = productos
          mensaje = "Mujer y Hombre"
          mostrarFiltrado(mensaje, productoMostrar)
    }
    else if (man == woman && todo == false){
        if(zapatillasCheck){
          productoMostrar = filtrarProducto(productos, "zapatillas")
          mensaje = "Zapatillas"
        } else if(remerasCheck){
            productoMostrar =   filtrarProducto(productos, "remera")
            mensaje = "Remera"
        } else if(shortsCheck){
            productoMostrar =  filtrarProducto(productos, "short")
            mensaje = "Shorts"
        } else if(pantalonesCheck){
            productoMostrar =  filtrarProducto(productos, "pantalon")
            mensaje = "Pantalon"
        }else{
            productoMostrar = productos
            mensaje = "Todos"
        }
        }

        mostrarFiltrado(mensaje, productoMostrar) 
}

function filtrarHombre(){
    man = man == false
    let mensaje = ""
    console.log(woman)
    console.log(man)
    console.log(todo)
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
            mensaje = "Zapatillas"
        } else if(remerasCheck){
            productoMostrar =  filtrarProducto(productos, "remera")
            mensaje = "Remera"
        } else if(shortsCheck){
            productoMostrar = filtrarProducto(productos, "short")
            mensaje = "Shorts"
        } else if(pantalonesCheck){
            productoMostrar = filtrarProducto(productos, "pantalon")
            mensaje = "Pantalones"
        }else{
            productoMostrar = productos
            mensaje = "Todos"
        }
    }

    mostrarFiltrado(mensaje, productoMostrar)

    
}

function filtrarProducto(arr, str){
    return arr.filter((item) => item.producto == str)
}

function filtrarGenero(str){
    productoMostrar =  productoMostrar.filter((item) => item.genero == str)
}



//funciones que introducen HTML
function agregarAlHTML(){
    limpiarHTML()
    agregarStorage()
    articulosCarrito.forEach( (item) => {
      let img = item.img
      let nombre = item.nombre
      let precio = item.precio
      let cantidad = item.cantidad
      let subTotal = item.subTotal

      const div_producto = document.createElement("div")
      div_producto.classList.add("productoSeleccionado")
      div_producto.setAttribute("subTotal", subTotal)
      div_producto.innerHTML = `<div class="d-flex flex-column img-producto">
                                    <img src="${img}" alt="">
                                    <p class="nombre">${nombre}</p>
                                </div> 

                                <div class="div_info">
                                    <div class="div_contenedor mb-1">
                                        <p>Precio: </p>
                                        <p class="precio">${precio}</p>
                                    </div>   
                                    
                                    <div class="div_contenedor">
                                        <p>Cant: </p>
                                        <p class="cantidad">
                                        <button data-funcion = "suma" class="me-2 btn_cantidad"> + </button>
                                        ${cantidad} 
                                        <button data-funcion = "resta" class="ms-2 btn_cantidad"> - </button>
                                        </p>
                                    </div>
                                </div>

                                <div class="div_sub_total">
                                    <p class="mb-3">Subtotal: </p>
                                    <p>${subTotal}</p>
                                </div>
                               
                                <button class="boton-eliminarProductoCarrito" data-id="${item.id}"><i class="fas fa-times" style="color: #f00000";></i></button>`
       contenedorProductos.append(div_producto)                       
     
    })
} 

function limpiarHTML(){
    while(contenedorProductos.firstChild){
        contenedorProductos.removeChild(contenedorProductos.firstChild)
 }

}

function mostrarFiltrado(mensaje, arr){
    console.log(productoMostrar)
    borrarProductosMain()
    
    if(mensaje){
        agregarTitulo(mensaje)
    }else {

    }
    arr.forEach((item) => {
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

function agregarTitulo(mensaje) {
    let div_titulo = document.createElement("div")
    div_titulo.classList.add("titulo")
    div_titulo.innerHTML = `<h1>${mensaje}</h1>`
    contenedor_productos.append(div_titulo)
}

function notificacion(){
    Toastify({
        text: "Producto agregado",
        duration: 2000,
        newWindow: true,
        close: true,
        gravity: "bottom",
        position: "right", 
        stopOnFocus: true,
        style: {
          background: "rgb(235, 93, 57)"
        }
      }).showToast();
}

function cntProductosCarrito(){
    if(articulosCarrito.length != 0){
       boton_carrito.querySelector("span").innerText = `${articulosCarrito.length}`
       boton_carrito.querySelector("span").classList.remove("d-none")

       barra_carrito.querySelector(".total").innerText = "Total: " + calcularTotal()
       barra_carrito.querySelector(".total").classList.remove("d-none")

       totalCarrito.innerText = "Total: " + calcularTotal()
       totalCarrito.classList.remove("d-none")

       console.log(document.querySelector("#comprar"))
       document.querySelector("#comprar").classList.remove("d-none")



    }else{
        boton_carrito.querySelector("span").classList.add("d-none")
        barra_carrito.querySelector(".total").classList.add("d-none")
        totalCarrito.classList.add("d-none")
        document.querySelector("#comprar").classList.add("d-none")
    }
   
}



//funcion para recuperar los productos
function recuperarProductos(arr){
    arr.forEach((item) => {
        let img = item.img
        let nombre_p = item.nombre
        let precio = item.precio
        let id = item.id
        let genero = item.genero
        let tipoProducto = item.producto

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



//Funciones de ayuda

function eliminarString(str){
    let nuevoString = ""
    for(let i = 0; i<=str.length; i++){
        if(str[i] == "."){
            nuevoString = str.slice(0, i) + str.slice(i + 1)
        }
       
    }
    return nuevoString
}

function calcularTotal(){
    let total = 0
        articulosCarrito.forEach((item) => {
             total += item.subTotal
        })

        return total;

        
    }




