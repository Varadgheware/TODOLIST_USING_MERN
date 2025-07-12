import mongoose, { mongo } from "mongoose";

const todoSchema = new mongoose.Schema({
task:{
    type:"string"
},
done:{
    type:Boolean,
    default:false
}
})

const Todomodel =mongoose.model("Todomodel",todoSchema)

export default Todomodel