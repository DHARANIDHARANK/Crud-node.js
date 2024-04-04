
const User = require('./../models/user')
const jwt= require('jsonwebtoken');
// handle error
const handleErrors= (err)=>
{
    console.log(err.message, err.code)
    let errors={email:'', password:''};

//Incorect email
if(err.message === 'Incorrect email' || err.message === 'Incorrect password')
{
    errors.email= 'That email is not registered';
    errors.password= 'That password is incorrect';
    return errors;
}



    // duplicate  which email already exist
    if(err.code === 11000)

    {
        errors.email= 'That mail ID is already registered'
        return errors;
    }
// validating error
    if(err.message.includes('user validation failed'))
    {
        if(err.errors)
        {
            Object.values(err.errors).forEach(({properties}) =>{
        
      if (properties)
      {
        errors[properties.path]= properties.message;
      }
       });
    }
    }
    return errors;
};

// Token creation
const maxAge= 3 * 24*60*60;
const createToken = (id)=> {
    return jwt.sign({ id }, 'secret payload',{
        expiresIn: maxAge
    });
}

module.exports.signup_get= (req,res)=>{
    res.render('signup');

}
module.exports.login_get= (req,res)=>{
    res.render('login');
    
}
module.exports.signup_post= async (req,res)=>{
    const {email, password} = req.body
   try{

    const user= await User.create({email, password})
    const token = createToken(user._id);
    res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge*1000})
    res.status(200).json({user: user._id});

   } catch(err){
    const errors= handleErrors(err);
    res.status(400).json({ errors });
    
   }
    
}
module.exports.login_post= async (req,res)=>{
    const { email , password} = req.body

    try {
  const user =  await User.login(email , password);
  const token= createToken(user._id);
  res.cookie('jwt',token,{httpOnly: true, maxAge:maxAge* 800 });
  res.status( 200 ).json({user: user._id});


    }
catch(err){
    const errors =  handleErrors(err)
    res.status(400).json({ errors });
}
    // console.log(email,password)
    // res.send('Userlogin');
    
} 

module.exports.logout_get=(req,res)=>
{
   res.clearCookie('jwt', '', {maxAge:1})
   res.redirect('/');
}