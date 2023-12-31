//variables
let mes = "00"
let año = "00"



//Elemntos

const form_nombre = document.querySelector("#name")
const form_number = document.querySelector("#number")
const form_pin = document.querySelector("#form-pin")
const form_month = document.querySelector("#month")
const form_year = document.querySelector("#year")
const name_card = document.querySelector(".card-front-name")
const number_card = document.querySelector(".card-front-number")
const month_card = document.querySelector(".card-front-date")
const pin_card = document.querySelector(".card-pin")
const btn = document.querySelector("#btn-confirmarCompra")
const forms = document.querySelectorAll("#form")
const terminando = document.querySelector(".seccion-terminado")
const btn_atras = document.querySelector("#volverAtras")

//eventos

form_nombre.addEventListener("input", cambiarNombre);
form_number.addEventListener("input", cambiarNumber);
form_month.addEventListener("input", cambiarMes)
form_year.addEventListener("input", cambiarAño)
form_pin.addEventListener("input", cambiarPin);
btn.addEventListener("click", comprar)
btn_atras.addEventListener("click", volver)


//Funciones
//Name
function cambiarNombre(){
    let nombre = form_nombre.value
    if(nombre){
        name_card.textContent = nombre
    }else {
        name_card.textContent = "Nazareno Salvatierra"
    }
    
}

//Number

function cambiarNumber(){
    let number = form_number.value
    if(number){
        let n = agregarCeros(number, 16)
        number_card.textContent = agregarEspacios(n)
    }else {
        number_card.textContent = "0000 0000 0000 0000"
    }
    
}

//Mes

function cambiarMes(){
    mes = form_month.value
    if(mes){
        month_card.textContent = mes + "/" + año
    }else{
        month_card.textContent = "00/" + año
        mes = "00"
    }
    
}

//ano
function cambiarAño(){
    año = form_year.value
    if(año){
        month_card.textContent = mes + "/" + año
    }else{
        month_card.textContent = mes + "/00"
        año = "00"
    }
}

//pin
function cambiarPin(){
    let pin = form_pin.value
    if(pin){
        pin_card.textContent = agregarCeros(pin, 3)
    }else {
        pin_card.textContent = "000"
    }
}

//button
function comprar(){
    if(form_nombre.value.length == 0){
        form_nombre.value = form_nombre.getAttribute("placeholder")
        cambiarNombre()
    }
    if(form_number.value.length == 0){
        form_number.value = form_number.getAttribute("placeholder")
        cambiarNumber()
    }if(form_month.value.length == 0){
        form_month.value = "06"
        cambiarMes()
    }if(form_year.value.length == 0){
         form_year.value = "23"
         cambiarAño()
    }if(form_pin.value.length == 0){
        form_pin.value = form_pin.getAttribute("placeholder")
        cambiarPin()
    }


   forms.forEach((item) => {
        item.classList.add("d-none")
    })

    btn.classList.add("desaparece")
    btn.disabled = true

    btn_atras.setAttribute("disabled", "")

    document.querySelector(".div-carga").classList.remove("d-none")

    setTimeout(() => {
        document.querySelector(".div-carga").classList.add("d-none")
        btn_atras.removeAttribute("disabled")
        terminando.classList.remove("d-none")
    }, 3000)
   
    document.querySelector(".ancla").addEventListener("click", ()=>{
        articulosCarrito = [];
        agregarStorage()
        cntProductosCarrito()
        volver() 
        

        forms.forEach((item) => {
            item.classList.remove("d-none")
        })

        terminando.classList.add("d-none")
    })
    
}


//Volver
function volver(){
        seccionPrincipal.classList.remove("d-none")
        seccionTarjetas.classList.add("d-none")
}


//Funciones para cambiar el texto

function agregarEspacios(number){
    let numero = ""
    let contador = 0
    for(n of number){
        if(contador == 4 || contador== 8 || contador == 12 || contador == 16){
            numero += ` ${n}`
        }else {
            numero += n
        }
        contador++
    }

    return numero
}

function agregarCeros(number, max){
    let nuevoNumber = number
    let faltan = max - (number.length)

    if(faltan > 0){
        for(let i = 0; i<faltan; i++) {
            nuevoNumber += "0"
        }
    }

    return nuevoNumber
}
