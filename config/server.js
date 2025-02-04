'use strict'

import express from "express"
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"
//Importar conexion del archivo de mongo
import { dbConnection } from "./mongo.js"
import limiter from "../src/middlewares/validar-cant-peticiones.js"
import authRoutes from '../src/auth/auth.routers.js'
import userRouters from "../src/users/user.routes.js"


const middlewares= (app)=>{
    app.use(express.urlencoded({extended: false})) // Para forms
    app.use(express.json()) // Para que JS entienda los JSON
    app.use(cors()) // Dominios que nos pueden acceder
    app.use(helmet()) // Es para la seguridad
    app.use(morgan('dev')) // Muestra mensajes para nuestras rutas (POST,PUT etc)
    app.use(limiter) // Llamamos a nuestro middleware personalizado
}

//Configurar rutas
const routes = (app)=>{
    const authPath = '/adoptionSystem/v1/auth'

    app.use(authPath,authRoutes)
    app.use("/adoptionSystem/v1/users",userRouters)
}

//Cuando nos conectemos
const conectarDB = async ()=>{
    try {
        await dbConnection()
        console.log('Conexion exitosa con la DB')
    } catch (error) {
        console.log('Error al conectarse a la DB',error)
    }
}

//Iniciar server
export const initServer= ()=>{
    const app = express() // Crea el servidor
    const port = process.env.PORT || 3000

    try {
        
        middlewares(app)
        conectarDB()
        routes(app)
        app.listen(port)
        console.log(`Server running on port ${port}`)
    } catch (err) {
        console.log(`Server init failed ${err}`)
    }
}