    import {Schema,model} from "mongoose"

    const DateSchema = Schema({
        date:{
            type: Date,
            required: [true,"Date is required!!!!!!!!!!!!!"]
        },
        description:{
            type:String,
            required: [true,"Description is required!!!!!!"]
        },
        email:{
            type: String,
            required:true
        },
        status: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps:true, // Agrega createdAt y updatedAt automáticamente -> Fecha de creacion del documento y última actualizacion
        versionKey:false // No agrega el campo __v (version de mongoose)
    })

    DateSchema.methods.toJSON= function(){
        const {_id,...date} = this.toObject() // Convierte el schema a objeto JS
        date.uid = _id
        return date
    }

    export default model('DateModel',DateSchema)