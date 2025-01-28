import rateLimit from "express-rate-limit";

const limiter = rateLimit({ //Recibe un objeto con configuraciones
    windowMs: 15*60*1000,
    max: 100 // Solo cien peticiones para evitar ataques
})

export default limiter // Asi ya no se deben de poner las llaves