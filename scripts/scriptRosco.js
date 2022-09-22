const seccionJugador = document.getElementById("sectJugador")
const holaJugador = document.createElement("div")
const puntosJugador = document.createElement("div")
const botonLetra = document.createElement("div")

let puntos = ""

/* Muestra y Saludo al jugador*/
const jugadorStorage = JSON.parse(localStorage.getItem("players"))
holaJugador.innerHTML = `<p class = "saludoJugador">Hola ${(jugadorStorage.nombre).toUpperCase()}, vamos a divernirnos!!!</p>`
seccionJugador.append(holaJugador)

/* Llamado al archivo JSON*/
const traerRoscoVocales = async () => {
    const response = await fetch("../json/vocales.json")
    const vocales = await response.json()
    return vocales
}

/*  crea los botones con las letras de las vocale  */
traerRoscoVocales().then(secctionPlayers => {
    botonLetra.classList.add("divLetras")
    secctionPlayers.forEach((palabra) =>{
        botonLetra.innerHTML += `
            <button type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" class="btnLetra" id="botonLetra${palabra.id}"onclick="asignarLetraBoton('${palabra.letra}')">${palabra.letra}</button> 
            `      
    })      
        seccionJugador.append(botonLetra)
})


const botResp = document.getElementById("buttResp")
botResp.addEventListener("click",() => {
    const respPlayer = document.getElementById("respuesta").value.toLowerCase()
    obtenerRespuesta(respPlayer)
    puntos = `<p class ="puntosJugador">Tenes ganados ${jugadorStorage.puntos} puntos</p>`
    puntosJugador.innerHTML = puntos
    seccionJugador.append(puntosJugador)
})