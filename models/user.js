const { string } = require('i/lib/util');
const {isEmail} = require ('validator')
const mongoose = require('mongoose');
const bcrypt= require('bcrypt');
const userSchema= new mongoose.Schema({
    email:{
        type: String,
        required: [true, 'User need a email'],
        unique: true,
        lowercase: true,
        validate: [ isEmail,'please enter a valid email']
    },
    password:{
        type: String,
        required: [true, "please enter an password "],
        minlength: [6, "Minimum password would be 6character"]
    }
});
// fire a function after doc saved to db
userSchema.post('save', function(doc , next){
    console.log('new user have been saved successfully', doc)
    next()
});

// fire a function before saving
userSchema.pre('save',async function(next){
    const salt=  await bcrypt.genSalt();
    this.password= await bcrypt.hash(this.password, salt);
    next();
});

// static metho to log-in user
userSchema.statics.login= async function (email, password){
    const user= await this.findOne({email:email});
    if(user){
 
        const auth = await bcrypt.compare(password, user.password);
        
    if(auth)
    {
        return user;
    }
    throw Error("Incorrect password")
    }
    throw Error("Incorrect email")
} 

const User= mongoose.model('users' , userSchema)

module.exports= User;