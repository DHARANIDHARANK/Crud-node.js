const mongoose =  require('mongoose');

const Schema= new mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    gender: String,
    status: String
})
const userSchema= mongoose.model('DATA',Schema)

module.exports = userSchema