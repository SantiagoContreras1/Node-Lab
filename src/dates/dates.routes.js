import { Router } from "express";
import { check } from "express-validator";
import { addDate, getDates, searchDate, deleteDate,updateDate } from "./dates.controller.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";

const router = Router()

router.post(
    "/",
    [
        validarJWT,
        check('email', 'Este no es un email válido').not().isEmpty(),
        validarCampos
    ],
    addDate
)

router.get("/",getDates)

router.get(
    "/forOne/:id",
    [
        validarJWT,
        check('id', 'Este no es un id válido').isMongoId(),
        validarCampos
    ],
    searchDate
)

router.put(
    "/put/:id",
    [
        validarJWT,
        check("id", "No es un ID válido").isMongoId(),
        validarCampos
    ],
    updateDate
)

router.delete(
    "/delete/:id",
    [
        validarJWT,
        check("id", "No es un ID válido").isMongoId(),
        validarCampos
    ],
    deleteDate
)

export default router