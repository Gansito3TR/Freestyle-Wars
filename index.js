const express = require("express")
const cors = require("cors")

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static('front'))

const jugadores = []

class Jugador {
    constructor(id) {
        this.id = id
    }
    asignarRapero(raperoAka){
        this.raperoAka = raperoAka
    }
    actualizarPosicion(x, y){
        this.x = x
        this.y = y
    }
    asignarAtaques(ataques){
        this.ataques = ataques
    }
}

class Rapero {
    constructor(aka){
        this.aka = aka 
    }
}

app.get("/unirse", (req, res) => {
    const id = `${Math.random()}`
    const jugador = new Jugador(id)

    jugadores.push(jugador)

    res.setHeader("Access-Control-Allow-Origin", "*")

    res.send(id)
})

app.post("/freestyleWars/:jugadorId", (req,res) => {
    const jugadorId = req.params.jugadorId || ""
    const akaNombre = req.body.raperoAka || ""
    const raperoAka = new Rapero (akaNombre)
    const jugadorIndex = jugadores.findIndex((jugador) => jugadorId === jugador.id)

    if (jugadorIndex >= 0) {
        jugadores[jugadorIndex].asignarRapero(raperoAka)
    }
    console.log(jugadores);
    console.log(jugadorId);
    res.end()
})

app.post("/freestyleWars/:jugadorId/posicion", (req,res) => {
    const jugadorId = req.params.jugadorId || null
    const x = req.body.x || 0
    const y = req.body.y || 0

    const jugadorIndex = jugadores.findIndex((jugador) => jugadorId === jugador.id)
    if (jugadorIndex >= 0) {
        jugadores[jugadorIndex].actualizarPosicion(x, y)
    }

    const enemigos = jugadores.filter((jugador) => jugadorId !== jugador.id)

    res.send({
        enemigos
    })
})

app.post("/freestyleWars/:jugadorId/ataques", (req,res) => {
    const jugadorId = req.params.jugadorId || null;
    const ataques = req.body.ataques || []

    const jugadorIndex = jugadores.findIndex((jugador) => jugadorId === jugador.id)

    if (jugadorIndex >= 0) {
        jugadores[jugadorIndex].asignarAtaques(ataques)
    }
    console.log(jugadores);
    console.log(jugadorId);
    res.end()
})


app.get("/freestyleWars/:jugadorId/ataques", (req, res) => {
    const jugadorId = req.params.jugadorId || null;
    const jugador = jugadores.find((jugador) => jugador.id === jugadorId)

    res.send({
        ataques : jugador.ataques || []
    })
})

app.listen(8080, () => {
    console.log("Servidor funcionando, bitches!");
})
