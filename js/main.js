/* 
1 = piedra
2 = papel
3 = tijera 
*/

let mensaje = "Piedra, papel o tijera \n Al mejor de tres  \n 1 = Piedra \n 2 = Papel \n 3 = tijeras \n Elige tu jugada"

let misPuntos = 0;
let tusPuntos = 0;


function getRandomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min) + min)
}

function ganador( num ){
    let miJugada = getRandomInt(1,3);

    if(num == 1){
        switch(miJugada){
            case 1:
                misPuntos+=1
                tusPuntos+=1
                return "Elegiste piedra \nElegi piedra \n EMPATE"
            case 2:
                misPuntos+=1
                return "Elegiste piedra \nElegi papel \n PERDISTE"
            case 3:
                tusPuntos+=1
                return "Elegiste piedra \nElegi tijera \n GANASTE"
        }
    } 
    else if (num == 2){
        switch(miJugada){
            case 1:
                tusPuntos+=1
                return "Elegiste papel \nElegi piedra \n GANASTE"
            case 2:
                misPuntos+=1
                tusPuntos+=1
                return "Elegiste papel \nElegi papel \n EMPATE"
            case 3:
                misPuntos+=1
                return "Elegiste papel \nElegi tijera \n Perdiste"
        }
    } 
    else if(num == 3) {
        switch(miJugada){
            case 1:
                misPuntos+=1
                return "Elegiste tijera \nElegi piedra \n PERDISTE"
            case 2:
                tusPuntos+=1
                return "Elegiste tijera \nElegi papel \n GANASTE"
            case 3:
                misPuntos+=1
                tusPuntos+=1
                return "Elegiste tijera \nElegi tijera \n EMPATE"
        }
    } else {

    }
}

function nadieGano(){
    return (misPuntos < 3 || tusPuntos < 3)
}

function yoGane(){
    return misPuntos == 3
}

function tuGanaste(){
    return tusPuntos == 3
}


while( misPuntos < 3 && tusPuntos < 3) {
    let suJugada = prompt(mensaje)
    alert(ganador(suJugada))
    console.log("Tus puntos: " + tusPuntos);
    console.log("Mis puntos " + misPuntos);
}

if(yoGane() && tuGanaste()){
 alert("Empate")
}
else if(misPuntos == 3){
    alert("Perdiste")
} 
else if (tuGanaste()){
    alert("Ganaste")
} 