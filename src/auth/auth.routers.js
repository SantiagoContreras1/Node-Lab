import { Router } from "express";
import { check } from "express-validator";
import { login,register } from "./auth.controller.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { existentEmail,isValidRol } from "../helpers/db-validator.js";


const router = Router()

router.post(// Se le manda el path de direccion en donde va a estar alojado
    '/login',
    [
        check('correo','Este no es un correo válido').isEmail(),
        check('password','La contraseña es obligatoria').not().isEmpty(),
        validarCampos

    ]
    ,login // Controller
) 

// Register (Agregar usuario)
router.post(
    '/register',
    [
        check('nombre','El nombre es obligatorio').not().isEmpty(),
        check('password','La contraseña debe ser mayor a seis carácteres').isLength({min:6}),   // Longitud del pass minimo de 6 chers
        check('correo','Este correo no es valido').isEmail(),
        check('correo','Correo no valido').custom(existentEmail),
        check('rol','Rol no valido').custom(isValidRol),
        check('phone','Celu no valido').isLength({min:8,max:8}),
        validarCampos
    ],
    register
)

export default router