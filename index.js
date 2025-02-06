// Cargar variables de entorno
import { config } from "dotenv";
config() // Carga todas las variables de entorno

import { iniciarServer } from "./config/server.js";
iniciarServer()