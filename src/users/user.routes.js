import { Router } from "express";
import { check } from "express-validator";
import {getUsers,getUserById,updateUser} from "./users.controller.js"
import {existentUserById} from "../helpers/db-validator.js"
import { validarCampos } from "../middlewares/validar-campos.js"; 
import { uploadProfilePricture } from "../middlewares/multer-upload.js";

const router = Router()

// CRUD
// Recibe path,arreglo con config, funcion del controller que ejecuta | Solo pondremos en este proyecto el path
router.get("/",getUsers)

router.get(
    "/findUser/:id", // Se le manda el parametro
    [
        check("id", "Invalid id").isMongoId(), // valida el id para mongo
        check("id").custom(existentUserById),
        validarCampos
    ],
    getUserById
)

router.put(
    '/update/:id',
    uploadProfilePricture.single('profilePicture'),
    [
        check("id", "Invalid id").isMongoId(), // valida el id para mongo
        check("id").custom(existentUserById),
        validarCampos
    ],
    updateUser
)


export default router