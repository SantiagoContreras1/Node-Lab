import {Schema,model} from "mongoose"

const DatesSchema = Schema({
    date:{
        type: Date,
        required: [true,"Date is required!!!!!!!!!!!!!"]
    }
})

DatesSchema.methods.toJSON= function(){

}