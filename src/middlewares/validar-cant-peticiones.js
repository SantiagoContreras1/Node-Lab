import rateLimit from "express-rate-limit";

const limiter = rateLimit({ //Recibe un objeto con configuraciones
    windowMs: 15*60*1000, // 15 minutos
    max: 100, // Solo cien peticiones para evitar ataques
    message:{
        succes:false,
        msg: "Demasiadas solicitudes de esta IP"
    }
})

export default limiter // Asi ya no se deben de poner las llaves