const sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
const sectionReiniciar = document.getElementById('reinicia')
const botonRaper = document.getElementById('boton-rapero')
const botonReiniciarJuego = document.getElementById('boton-reiniciar')

const sectionSeleccionarRaper = document.getElementById('inicio')
const spanAka = document.getElementById("aka")

const spanRaperoEnemigo = document.getElementById('aka-bitch')

const spanVidasJugador = document.getElementById('vidas-jugador')
const spanVidasEnemigo = document.getElementById('vidas-enemigo')

const sectionMensajes = document.getElementById('resultado')
const ataqueDelJugador = document.getElementById('ataque-del-jugador')
const ataqueDelEnemigo = document.getElementById('ataque-del-enemigo')

const contenedorTarjetas = document.getElementById('contenedorTarjetas')
const contenedorAtaques = document.getElementById('contenedorAtaques')

const sectionVerMapa = document.getElementById('ver-mapa')
const mapa = document.getElementById('mapa')

let jugadorId = null
let enemigoId = null
let ataqueJugador = []
let ataqueEnemigo = []
let vidasJugador = 3
let vidasEnemigo = 3
let victoriasJugador = 0
let victoriasEnemigo = 0
let inputEtr
let inputGamma
let inputVozero
let inputRobel
let inputPando
let inputAnyel
let botonAgua
let botonFuego
let botonTierra
let botones = []
let indexAtaqueJugador
let indexAtaqueEnemigo
let raperoJugador
let raperosEnemigos = []
let raperoJugadorObjeto
let ataquesRapero
let ataquesRaperoEnemigo
let opcionDeRapero
let resultado
let rapers = []
let lienzo = mapa.getContext("2d")
let intervalo
let mapaBackground = new Image()
mapaBackground.src = './assets/Mapa.jpg'
let alturaSolicitada
let anchoSolicitado = window.innerWidth - 20

const anchoMaximoDelMapa = 600
if (anchoSolicitado > anchoMaximoDelMapa) {
    anchoSolicitado = anchoMaximoDelMapa -20
}
alturaSolicitada = anchoSolicitado * 600 / 800

mapa.width = anchoSolicitado
mapa.height = alturaSolicitada

class Rapero {
    constructor(aka, foto, vida, fotoEnMapa, id = null) {
        this.id = id 
        this.aka = aka
        this.foto = foto
        this.vida = vida
        this.ataques = []
        this.ancho = 40
        this.alto = 55
        this.x = aleatorio(0, mapa.width - this.ancho)
        this.y = aleatorio(0, mapa.height - this.alto)
        this.mapaFoto = new Image()
        this.mapaFoto.src = fotoEnMapa
        this.velocidadX = 0
        this.velocidadY = 0
    }
    pintarRaperos() {
        lienzo.drawImage(
            this.mapaFoto,
            this.x,
            this.y,
            this.ancho,
            this.alto
        )
    }
}

let etr = new Rapero('Etr', './assets/ETR.JPG', 5, './assets/ETRFace.jpg')
let gamma = new Rapero('Gamma', './assets/Gamma.JPG', 5, './assets/GammaFace.jpg')
let vozero = new Rapero('Vozero', './assets/Vozero.JPG', 5, './assets/VozeroFace.jpg')
let robel = new Rapero('Robel', './assets/Robel.JPG', 5, './assets/RobelFace.jpg')
let pando = new Rapero('Pando', './assets/Pando.JPG', 5, './assets/PandoFace.jpg')
let anyel = new Rapero('Anyel', './assets/Anyel.JPG', 5, './assets/AnyelFace.jpg')

// Posibles ataques: chiste, doble sentido, pareado, flow, calambur//
etr.ataques.push(
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '💦', id: 'boton-agua' },
    { nombre: '💨', id: 'boton-tierra' },
    { nombre: '💨', id: 'boton-tierra' }
)
gamma.ataques.push(
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '💦', id: 'boton-agua' },
    { nombre: '💦', id: 'boton-agua' },
    { nombre: '💨', id: 'boton-tierra' },
    { nombre: '💨', id: 'boton-tierra' }
)
vozero.ataques.push(
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '💦', id: 'boton-agua' },
    { nombre: '💦', id: 'boton-agua' },
    { nombre: '💨', id: 'boton-tierra' }
)
robel.ataques.push(
    { nombre: '💦', id: 'boton-agua' },
    { nombre: '💦', id: 'boton-agua' },
    { nombre: '💦', id: 'boton-agua' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '💨', id: 'boton-tierra' }
)
pando.ataques.push(
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '💦', id: 'boton-agua' },
    { nombre: '💨', id: 'boton-tierra' }
)
anyel.ataques.push(
    { nombre: '💨', id: 'boton-tierra' },
    { nombre: '💨', id: 'boton-tierra' },
    { nombre: '💨', id: 'boton-tierra' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '💦', id: 'boton-agua' }
)
rapers.push(etr, gamma, vozero, robel, pando, anyel)

function iniciarJuego() {

    rapers.forEach((rapero) => {
        opcionDeRapero = `
            <input type="radio" name="rapers" id=${rapero.aka} />
            <label class="selector-de-raper" for=${rapero.aka} >
                <p>${rapero.aka}</p>
                <img src=${rapero.foto} alt=${rapero.aka} />
            </label>
        `
        contenedorTarjetas.innerHTML += opcionDeRapero

        inputEtr = document.getElementById('Etr')
        inputGamma = document.getElementById('Gamma')
        inputVozero = document.getElementById('Vozero')
        inputRobel = document.getElementById('Robel')
        inputPando = document.getElementById('Pando')
        inputAnyel = document.getElementById('Anyel')
    })
    
    sectionSeleccionarAtaque.style.display = 'none'
    sectionVerMapa.style.display = 'none'
    sectionReiniciar.style.display = 'none'
   
    botonRaper.addEventListener('click', seleccionarRaper)
    
    botonReiniciarJuego.addEventListener('click', reiniciarJuego)

    unirseAlJuego()
}

function unirseAlJuego() {
    fetch("http://192.168.100.12:8080/unirse")
        .then(function (res){
            if(res.ok) {
                res.text()
                    .then(function(respuesta) {
                        console.log(respuesta);
                        jugadorId = respuesta
                    })
            }
        })
}

function nombreImagen(raperoJugador) {
    spanAka.innerHTML = `
        <div>
            <p>${raperoJugador.aka}</p>
            <img src=${raperoJugador.foto} alt=${raperoJugador.aka} width= 100px />
        </div> 
    `
}

function seleccionarRaper() {
    if (inputEtr.checked) {
        alert("Has seleccionado a Etr. 3.. 2... 1... TIEMPO")
        nombreImagen(etr)
        raperoJugador = inputEtr.id
    }
    else if (inputGamma.checked) {
        alert("Has seleccionado a Gamma.  3.. 2... 1... TIEMPO")
        nombreImagen(gamma)
        raperoJugador = inputGamma.id 
    }
    else if (inputVozero.checked) {
        alert("Has seleccionado a Vozero.  3.. 2... 1... TIEMPO")
        nombreImagen(vozero)
        raperoJugador = inputVozero.id 
    }
    else if (inputRobel.checked) {
        alert("Has seleccionado a Robel.  3.. 2... 1... TIEMPO")
        nombreImagen(robel)
        raperoJugador = inputRobel.id 
    }
    else if (inputPando.checked) {
        alert("Has seleccionado a Pando.  3.. 2... 1... TIEMPO")
        nombreImagen(pando)
        raperoJugador = inputPando.id 
    }
    else if (inputAnyel.checked) {
        alert("Has seleccionado a Anyel.  3.. 2... 1... TIEMPO")
        nombreImagen(anyel)
        raperoJugador = inputAnyel.id
    }
    else {
        alert("Elige bien, animal.")
        return
    }

    seleccionarRaperoJugador(raperoJugador)
    sectionSeleccionarRaper.style.display = 'none'
    extraerAtaques(raperoJugador)
    sectionVerMapa.style.display = 'flex'
    iniciarMapa()
}

function seleccionarRaperoJugador(raperoJugador) {
    fetch(`http://192.168.100.12:8080/freestyleWars/${jugadorId}`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            raperoAka: raperoJugador
        })
        
    })
}

function extraerAtaques(raperoJugador) {
    let ataques
    for (let i = 0; i < rapers.length; i++) {
        if (raperoJugador === rapers[i].aka) {
            ataques = rapers[i].ataques
        }
    }
    mostrarAtaques(ataques)
}

function mostrarAtaques(ataques) {
    ataques.forEach((ataque) => {
        ataquesRapero = `
        <button id=${ataque.id} class="boton-de-ataque BAtaque">${ataque.nombre}</button>
        `
        contenedorAtaques.innerHTML += ataquesRapero
    })
    botonAgua = document.getElementById('boton-agua')
    botonFuego = document.getElementById('boton-fuego')
    botonTierra = document.getElementById('boton-tierra')
    botones = document.querySelectorAll('.BAtaque')

}

function secuenciaAtaque() {
    botones.forEach((boton) => {
        boton.addEventListener('click', (e) => {
            if (e.target.textContent === '🔥') {
                ataqueJugador.push('Fuego🔥')
                console.log(ataqueJugador)
                boton.style.background = '#F5EBE0'
                boton.disabled = true
            } else if (e.target.textContent === '💦') {
                ataqueJugador.push('Agua💦')
                console.log(ataqueJugador)
                boton.disabled = true
                boton.style.background = '#F5EBE0'
            } else {
                ataqueJugador.push('Tierra💨')
                console.log(ataqueJugador)
                boton.style.background = '#F5EBE0'
                boton.disabled = true

            }
            //ataqueAleatorioEnemigo()
            if(ataqueJugador.length === 5){
                enviarAtaques()
            }
        })
    })
    
}

function enviarAtaques(){
    fetch(`http://192.168.100.12:8080/freestyleWars/${jugadorId}/ataques`, {
        method: "post",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            ataques: ataqueJugador
        })
    })

    intervaloAtaques = setInterval(obtenerAtaques, 50)
}

function obtenerAtaques(){
    fetch(`http://192.168.100.12:8080/freestyleWars/${enemigoId}/ataques`)
        .then(function (res) {
            if(res.ok){
                res.json()
                    .then(function ({ataques}){
                        if(ataques.length === 5){
                            ataqueEnemigo = ataques
                            combate()
                        }
                    })
            }
        })
}

function imagenEnemigo(raperoJugador) {
    spanRaperoEnemigo.innerHTML = `
        <div>
            <p>${raperoJugador.aka}</p>
            <img src=${raperoJugador.foto} alt=${raperoJugador.aka} width= 100px />
        </div> 
    `
}

function atacarRaperoEnemigo(enemigo) {
    imagenEnemigo(enemigo)
    ataquesRaperoEnemigo = enemigo.ataques
    secuenciaAtaque()
}

function ataqueAleatorioEnemigo() {
    console.log('ataque aleatorio', ataquesRaperoEnemigo)
    let ataqueAleatorio = aleatorio(0, ataquesRaperoEnemigo.length - 1)
    let ataqueSeleccionadoEnemigo = ataquesRaperoEnemigo.splice(ataqueAleatorio, 1)


    if (ataqueSeleccionadoEnemigo[0].nombre == '🔥') {
        ataqueEnemigo.push('Fuego🔥')
    } else if (ataqueSeleccionadoEnemigo[0].nombre == '💦') {
        ataqueEnemigo.push('Agua💦')
    } else if (ataqueSeleccionadoEnemigo[0].nombre == '💨') {
        ataqueEnemigo.push('Tierra💨')
    }
    iniciarPelea()
}

function iniciarPelea() {
    if (ataqueJugador.length === 5) {
        combate()
    }
}

function indexAmbosOponentes(jugador, enemigo) {
    indexAtaqueJugador = ataqueJugador[jugador]
    indexAtaqueEnemigo = ataqueEnemigo[enemigo]
}

function combate() {
    clearInterval(intervaloAtaques)

    for (let index = 0; index < ataqueJugador.length; index++) {
        if (ataqueJugador[index] === ataqueEnemigo[index]) {
            indexAmbosOponentes(index, index)
            resultado = 'Empate'
            crearMensaje()
        } else if (ataqueJugador[index] === 'Fuego🔥' && ataqueEnemigo[index] === 'Tierra💨') {
            indexAmbosOponentes(index, index)
            resultado = '✨Ganaste🎉'
            crearMensaje()
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        } else if (ataqueJugador[index] === 'Tierra💨' && ataqueEnemigo[index] === 'Agua💦') {
            indexAmbosOponentes(index, index)
            resultado = '✨Ganaste🎉'
            crearMensaje()
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        } else if (ataqueJugador[index] === 'Agua💦' && ataqueEnemigo[index] === 'Fuego🔥') {
            indexAmbosOponentes(index, index)
            resultado = '✨Ganaste🎉'
            crearMensaje()
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        } else {
            indexAmbosOponentes(index, index)
            resultado = 'Perdiste'
            crearMensaje()
            victoriasEnemigo++
            spanVidasEnemigo.innerHTML = victoriasEnemigo
        }
    }
    revisarVictorias()
}

function crearMensaje() {

    let nuevoAtaqueDelJugador = document.createElement('p')
    let nuevoAtaqueDelEnemigo = document.createElement('p')

    sectionMensajes.innerHTML = resultado
    nuevoAtaqueDelJugador.innerHTML = indexAtaqueJugador
    nuevoAtaqueDelEnemigo.innerHTML = indexAtaqueEnemigo

    ataqueDelJugador.appendChild(nuevoAtaqueDelJugador)
    ataqueDelEnemigo.appendChild(nuevoAtaqueDelEnemigo)
}

function revisarVictorias() {
    if (victoriasJugador === victoriasEnemigo) {
        crearMensajeFinal('Replica 🙅🏽‍♀️🙅🏽‍♂️🙅🏽‍♀️')
    } else if (victoriasJugador > victoriasEnemigo) {
        crearMensajeFinal('Felicidades! Pasaste el cypher.')
    } else {
        crearMensajeFinal('Tongo. Quéjate con los jueces.')
    }
}

function crearMensajeFinal(resultadoFinal) {
    
    sectionMensajes.innerHTML = resultadoFinal

    sectionReiniciar.style.display = 'block'
}

function reiniciarJuego() {
    location.reload()
}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function pintarCanvas() {
    raperoJugadorObjeto.x = raperoJugadorObjeto.x + raperoJugadorObjeto.velocidadX
    raperoJugadorObjeto.y = raperoJugadorObjeto.y + raperoJugadorObjeto.velocidadY
    lienzo.clearRect(0, 0, mapa.width, mapa.height)
    lienzo.drawImage(
        mapaBackground,
        0,
        0,
        mapa.width,
        mapa.height
    )

    raperoJugadorObjeto.pintarRaperos()

    raperosEnemigos.forEach(function (raperoAka){
        if (raperoAka != undefined){
            raperoAka.pintarRaperos()
            revisarColision(raperoAka)
        }
    })

    enviarPosicion(raperoJugadorObjeto.x, raperoJugadorObjeto.y)
    
    // Esto pintaba a todos los raperos a excepción del que escogía el jugador  |
    // mediante el array "rapers".                                              v

    // for (let i = 0; i < rapers.length; i++) {
    //     rapers[i].pintarRaperos()
    //     if (raperoJugadorObjeto.aka !== rapers[i].aka) {
    //         if (raperoJugadorObjeto.velocidadX !== 0 || raperoJugadorObjeto.velocidadY !== 0) {
    //             enviarPosicion(raperoJugadorrevisarColision(rapers[i])Objeto.x, raperoJugadorObjeto.y)
    //             revisarColision(rapers[i])
    //         }
    //     }
    // }

}

function enviarPosicion(x, y) {
    fetch(`http://192.168.100.12:8080/freestyleWars/${jugadorId}/posicion`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            x,
            y
        })
    })
    .then(function (res){
        if(res.ok){
            res.json()
                .then(function ({ enemigos }){
                    console.log(enemigos)
                    raperosEnemigos = enemigos.map(function (enemigo){
                        let raperoEnemigo = null
                        if(enemigo.raperoAka != undefined) {

                        }
                        const nombreDelEnemigo = enemigo.raperoAka.aka || ""
                        switch(nombreDelEnemigo) {
                            case "Etr": raperoEnemigo = new Rapero('Etr', './assets/ETR.JPG', 5, './assets/ETRFace.jpg', enemigo.id)
                                break
                            case "Gamma": raperoEnemigo = new Rapero('Gamma', './assets/Gamma.JPG', 5, './assets/GammaFace.jpg', enemigo.id)
                                break
                            case "Vozero": raperoEnemigo = new Rapero('Vozero', './assets/Vozero.JPG', 5, './assets/VozeroFace.jpg', enemigo.id)
                                break
                            case "Robel": raperoEnemigo = new Rapero('Robel', './assets/Robel.JPG', 5, './assets/RobelFace.jpg', enemigo.id)
                                break
                            case "Pando": raperoEnemigo = new Rapero('Pando', './assets/Pando.JPG', 5, './assets/PandoFace.jpg', enemigo.id)
                                break
                            case "Anyel": raperoEnemigo = new Rapero('Anyel', './assets/Anyel.JPG', 5, './assets/AnyelFace.jpg', enemigo.id)
                                break
                            default:
                                break
                        }
                        if(enemigo.x == undefined || enemigo.y == undefined){
                            return
                        }
                        raperoEnemigo.x = enemigo.x
                        raperoEnemigo.y = enemigo.y
                        return raperoEnemigo
                    })
                })
        }
    })

}

function moverDerecha() {
    raperoJugadorObjeto.velocidadX = 5
}

function moverArriba() {
    raperoJugadorObjeto.velocidadY = -5
}

function moverIzquierda() {
    raperoJugadorObjeto.velocidadX = -5
}

function moverAbajo() {
    raperoJugadorObjeto.velocidadY = 5
}

function sePresionoUnaTecla(event) {
    switch (event.key) {
        case 'ArrowUp':
            moverArriba()
            break
        case 'ArrowDown':
            moverAbajo()
            break
        case 'ArrowLeft':
            moverIzquierda()
            break
        case 'ArrowRight':
            moverDerecha()
            break
        default:
            break
    }
}

function detenerMovimiento() {
    raperoJugadorObjeto.velocidadX = 0
    raperoJugadorObjeto.velocidadY = 0
}

function iniciarMapa() {
    
    raperoJugadorObjeto = obtenerObjetoRapero(raperoJugador)
    intervalo = setInterval(pintarCanvas, 50)

    window.addEventListener('keydown', sePresionoUnaTecla)
    window.addEventListener('keyup', detenerMovimiento)
}

function obtenerObjetoRapero() {
    for (let i = 0; i < rapers.length; i++) {
        if (raperoJugador === rapers[i].aka) {
            return rapers[i]
        }
    }
}

function revisarColision(enemigo) {
    const arribaEnemigo = enemigo.y
    const abajoEnemigo = enemigo.y + enemigo.alto
    const izquierdaEnemigo = enemigo.x
    const derechaEnemigo = enemigo.x + enemigo.ancho

    const arribaJugador = raperoJugadorObjeto.y
    const abajoJugador = raperoJugadorObjeto.y + raperoJugadorObjeto.alto
    const izquierdaJugador = raperoJugadorObjeto.x
    const derechaJugador = raperoJugadorObjeto.x + raperoJugadorObjeto.ancho

    if (
        abajoJugador < arribaEnemigo ||
        arribaJugador > abajoEnemigo ||
        derechaJugador < izquierdaEnemigo ||
        izquierdaJugador > derechaEnemigo
    ) {
        return
    }
    detenerMovimiento()
    clearInterval(intervalo)
    console.log('Aguas')
    alert(enemigo.aka + " dice: fíjate, babosx.")

    enemigoId = enemigo.id
    sectionSeleccionarAtaque.style.display = 'flex'
    sectionVerMapa.style.display = 'none'
    atacarRaperoEnemigo(enemigo)
}

window.addEventListener("load", iniciarJuego)