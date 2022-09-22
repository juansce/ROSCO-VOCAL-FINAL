const botonNull = document.getElementById("buttResp")
const alertPlaceholder = document.getElementById("liveAlertPlaceholder")
const ayudaModal = document.getElementById("modalAyuda")
const botonAyda = document.getElementById("buttayuda")
const imgAyuda = document.createElement("div")
let letraSelect = ""
let contador = 0


function resetAlert() {
    alertPlaceholder.innerHTML = ""
}

function setContador() {
    contador = 0
}

function setLetra(letra) {
    letraSelect = letra
}

function asignarLetraBoton(letra) {
    setLetra(letra)
    setContador()
    resetAlert()
    botonNull.disabled = false

    /*  carga en el modal las preguntas, la imgen y la letra */
    traerRoscoVocales().then(vocales => {
        vocales.forEach(palabra => {
            if (letra === palabra.letra) {
                const titulo = document.getElementById("exampleModalLabel")
                titulo.innerHTML = palabra.letra
                const pregunta = document.getElementById("pregunta")
                pregunta.innerHTML = palabra.pregunta
                let imagen = palabra.img
                ayuda(imagen)
            }
        });
    })
    
}

function ayuda(imagen){
    imgAyuda.innerHTML = ""
    botonAyda.addEventListener("click", () => {
        imgAyuda.innerHTML = `<img class = "imgModal" src = "../img/${imagen}"></img>`
        ayudaModal.append(imgAyuda)
        jugadorStorage.puntos -= 10
    })
}

/* crea las Alertas de las Respuestas */
function alert(message, type) {
    resetAlert()
    const wrapper = document.createElement('div')
    wrapper.innerHTML = `
        <div class="alert alert-${type} alert-dismissible" role="alert">
            <div>${message}</div>
        `
    alertPlaceholder.append(wrapper)
    setTimeout(() => {
        wrapper.remove()
    }, 1200)
}

/* Bloquea los botonos de las letras luego de que la respuesta sea verdadera o falsa  */
function bloquearBtn(letra) {
    const vocales = {
        "a": document.getElementById("botonLetra1"),
        "e": document.getElementById("botonLetra2"),
        "i": document.getElementById("botonLetra3"),
        "o": document.getElementById("botonLetra4"),
        "u": document.getElementById("botonLetra5")
    }
    return vocales[letra].disabled = true
}

/* define que tipo de alerta debe mostrar segun la respuesta y chance en la que se encuentra el jugador - tambien aumenta o disminuye el putaje  */
function obtenerRespuesta(respFunc) {
    let msjCorrecto = "CORRECTO"
    let msjCuidado = "ICORRECTO. Prueba otra vez..."
    let msjIncorrecto = "Lo siento, perdiste un punto."
    let tipoS = "success"
    let tipoD = "danger"
    let tipoW = "warning"

    traerRoscoVocales().then(vocales => {
        let respuesta = vocales.some(vocales => (vocales.respuesta == respFunc && letraSelect == vocales.letra))

        if (respuesta == false) {
            if (contador < 2) {
                jugadorStorage.puntos -= 10

                contador++
                alert(msjCuidado, tipoW)
                document.getElementById("respuesta").value = ""
            } else {
                alert(msjIncorrecto, tipoD)
                jugadorStorage.puntos -= 10
                document.getElementById("respuesta").value = ""
                botonNull.disabled = true
                bloquearBtn(letraSelect)
            }
        } else {
            alert(msjCorrecto, tipoS)
            jugadorStorage.puntos += 50
            document.getElementById("respuesta").value = ""
            botonNull.disabled = true
            bloquearBtn(letraSelect)
        }
    })
}