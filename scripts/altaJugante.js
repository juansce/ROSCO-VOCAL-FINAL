class Jugante{
    constructor(nombre, puntos){
        this.nombre = nombre
        this.puntos = puntos
    }
}

let jugadores = JSON.parse(localStorage.getItem("jugadores")) ?? []

localStorage.setItem("players", "jugadores")

const btnJugador = document.getElementById("botonJugar")

btnJugador.addEventListener("click", () => {
    jugadores = new Jugante((document.getElementById("nombre").value),0)
    localStorage.setItem("players", JSON.stringify(jugadores))
    location.href = "./../paginas/juego.html"
})
