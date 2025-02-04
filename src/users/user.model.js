import { Schema,model } from "mongoose"

// Definir schema (Antiguamente modelo)
const UserSchema = Schema({
    // Se crea un objeto por cada dato
    name:{
        type: String,
        required: [true,'Name is required'], // Crea un campo obligatorio
        maxLength: [25,'Name is too long, the limit is 25 characteres']
    },
    surname:{
        type: String,
        required: [true,'Name is required'], // Crea un campo obligatorio
        maxLength: [25,'Cant be overcome 25 characters']
    },
    username:{
        type: String,
        unique:true
    },
    email:{
        type: String,
        required: [true,'Email is required'],
        unique: true
    },
    password:{
        type: String,
        required: [true,'Este campo es obligatorio'],
        minLength: 8
    },
    profilePicture:{
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
        enum: ['ADMIN_ROL','USER_ROL']
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
},

//No lo agregue a la DB
{
    timestamps:true, // Agregar el createAt y updateAt
    versionKey:false //No agrega el campo __v
}

)

// Similar al ToString
UserSchema.methods.toJSON= function(){
    const {__v,password,_id,...usuario} = this.toObject() // todos los que no se usan
    usuario.uid = _id
    return usuario
}

// Exportacion por default
export default model('User',UserSchema)