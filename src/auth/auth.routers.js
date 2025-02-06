import { Router } from "express";
import { login,register } from "./auth.controller.js";
import { registerValidator,loginValidator } from "../middlewares/validator.js";
import { uploadProfilePricture } from "../middlewares/multer-upload.js";
import { deleteFileOnError } from "../middlewares/deleteFileOnError.js";


const router = Router()

router.post(// Se le manda el path de direccion en donde va a estar alojado
    '/login',
    loginValidator,
    deleteFileOnError,
    login // Controller
) 

// Register (Agregar usuario)
router.post(
    '/register',
    uploadProfilePricture.single("profilePicture"),
    registerValidator,
    deleteFileOnError,
    register
)

export default router