import { body } from "express-validator"; //Pasa las rutas del routes
import { validarCampos } from "./validar-campos.js";
import { existentEmail, isValidRol } from "../helpers/db-validator.js";

export const registerValidator=[
    body("name").not().isEmpty().withMessage("El nombre es obligatorio"),
    body("surname","THe surename is required").not().isEmpty(),
    body("email", "You must enter a valid email").isEmail(),
    body("email").custom(existentEmail),
    body("rol").custom(isValidRol),
    body("password","Password must be at last 6 characters").isLength({min: 6}),
    validarCampos
]

export const loginValidator=[
    body("email").optional().isEmail().withMessage('Enter a valid email address'),
    body("username").optional().isEmail().isString().withMessage('Enter a valid username'),
    body("password","Password must be at least 6 characters").isLength({min:8}),
    validarCampos
]