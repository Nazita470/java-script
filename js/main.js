//console.log(productos);

let mensaje = 
    "Bienvenido al negocio \n" +
    "1: Ver todos los productos \n" +
    "2: Ver productos mujeres \n" +
    "3: Ver productos hombres \n" +
    "4: Ver que productos hay \n" +
    "5: Agregar producto \n" + 
    "6: Cerrar"

let seguir = true;

function desarmar(ar){
    let mensaje = ""
    ar.forEach(producto => mensaje += "\n Producto: " + producto.nombre + "  Genero: " + producto.genero + "       Precio: " + producto.precio);
    return mensaje;
}

function mostrarGenero(genero){
    const filtrado = productos.some(producto => producto.genero == genero) ?  productos.filter( producto => producto.genero == genero) : alert("No tenemos preoductos de ese genero")

    alert(desarmar(filtrado))
}

function mostrarProductos(){
    let mensaje = ""; 
    let nombres = [];
    productos.forEach(producto => nombres.includes(producto.nombre) ? console.log("repe") : nombres.push(producto.nombre))
    nombres.forEach(nombre => mensaje += nombre + "\n")
    alert(mensaje)
}

function agregarProductos(){
    const nombre = prompt("Nombre")
    let genero = "";

    while(!(genero == "m" || genero == "f")) {

        let g = prompt("Genero");
        console.log(g)
        console.log(g != "m");
        console.log(g != "f");


        if( (g == 'm') || (g == 'f' ) ) {
            genero = g;
        }else{
            alert("Ingresa m o f")
        }

    }

    const precio = +prompt("Precio")
    
    productos.push(
        {
            "nombre": nombre,
            "genero": genero,
            "precio": precio
        }
    )
}

while(seguir){
    const numero = +prompt(mensaje);

    switch(numero){
        case 1:
            alert(desarmar(productos));
        break;
    
        case 2:
            mostrarGenero('f');
        break;
        
        case 3: 
            mostrarGenero('m');
        break;
        
        case 4:
            mostrarProductos();
        break;

        case 5:
            agregarProductos();
            alert("Producto agregado")
        break;

        case 6:
            seguir = false;
        break;    
        
        default:
            alert("Elige un numero del 1 al 5");
        break;    
    }
}
