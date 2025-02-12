import { Router } from "express";
import { check } from "express-validator";
import {getUsers,getUserById,updateUser, updatePass} from "./users.controller.js"
import {existentUserById} from "../helpers/db-validator.js"
import { validarCampos } from "../middlewares/validar-campos.js"; 
import { uploadProfilePricture } from "../middlewares/multer-upload.js";

const router = Router()

// CRUD
// Recibe path,arreglo con config, funcion del controller que ejecuta | Solo pondremos en este proyecto el path
router.get("/",getUsers)

router.get(
    "/findUser/:id", // Se le manda el parametro, el id del user
    [
        check("id", "Invalid id").isMongoId(), // valida el id para mongo
        check("id").custom(existentUserById), // helper
        validarCampos
    ],
    getUserById
)

router.put(
    '/:id', // Path
    uploadProfilePricture.single('profilePicture'),
    [
        check("id", "Invalid id").isMongoId(), // valida el id para mongo
        check("id").custom(existentUserById),
        validarCampos
    ],
    updateUser
)

router.put(
    '/updatePassword/:id', // Path
    [
        check("id", "Invalid id").isMongoId(), // valida el id para mongo
        check("id").custom(existentUserById),
        validarCampos
    ],
    updatePass
)


export default router