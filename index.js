// Cargar variables de entorno
import { config } from "dotenv";
config() // Carga todas las variables de entorno

import { initServer } from "./config/server.js";
console.log("FLAG")
initServer()