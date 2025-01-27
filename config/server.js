'use strict'

import express from "express"
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"
//Importar conexion del archivo de mongo
import { dbConnection } from "./mongo.js"


const configurarMiddlewares= (app)=>{
    app.use(express.urlencoded({extended: false})) // Para forms
    app.use(cors()) // Dominios que nos pueden acceder
    app.use(express.json()) // Para que JS entienda los JSON
    app.use(helmet()) // Es para la seguridad
    app.use(morgan('dev')) // Muestra mensajes para nuestras rutas (POST,PUT etc)
}

//Configurar rutas
const configurarRutas = ()=>{

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
export const iniciarServer= async ()=>{
    const app = express() // Crea el servidor
    const port = process.env.PORT || 3000

    await conectarDB()
    configurarMiddlewares(app) // Se le manda al server
    configurarRutas(app) //Se le manda al server

    app.listen(port, ()=>{
        console.log(`Server running on port ${port}`)
    })
}