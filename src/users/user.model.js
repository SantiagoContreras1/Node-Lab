import mongoose from "mongoose";

// Definir schema (Antiguamente modelo)
const UserSchema = mongoose.Schema({
    // Se crea un objeto por cada dato
    nombre:{
        type: String,
        required: [true,'El campo es obligatorio'], // Crea un campo obligatorio
    },
    correo:{
        type: String,
        unique: true
    },
    password:{
        type: String,
        required: [true,'Este campo es obligatorio']
    },
    img:{
        type: String // Es String pq se le pasa la direccion de la imagen
    },
    phone:{
        type: String,
        minLength: 8,
        maxLength:8,
        required: [true,'Este campo es requerido']
    },
    // Roles Admin y User
    rol:{
        type: String,
        required: true,
        enum: ['ADMIN_ROLE','USER_ROLE']
    },
    estado:{
        type: Boolean,
        default: true
    },
    // Log que indica si se logueo con google o no
    google:{
        type: Boolean,
        default: false
    }
})

// Similar al ToString
UserSchema.methods.toJSON= function(){
    const {__v,password,_id,...usuario} = this.toObject() // todos los que no se usan
    usuario.uid = _id
    return usuario
}

// Exportacion por default
export default mongoose.model('User',UserSchema)