const mongoose= require('mongoose')


const connectionDb = async()=>{
   try{
    const con = await mongoose.connect(process.env.mongoClient)
    console.log(`Mongo Db connected Successfully:${con.connection.host}`)

   }  catch(err){
    console.log(err.message);
    process.exit(1);
   }

}
module.exports = connectionDb