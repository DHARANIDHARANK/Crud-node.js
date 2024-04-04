const userSchema= require('../model/model');

// create and save user
exports.create=(req,res)=>
{
    if(!req.body)
    {
        res.status(500).send({message: 'Creating field should not be empty'})
    }
const user = new userSchema({
    name: req.body.name,
    email: req.body.email,
    gender: req.body.gender,
    status: req.body.status
})
user.save()
.then(data=>{
    //res.send(data);
    res.redirect('/add-user')
}) 
.catch(err =>{
    res.status(500).send({message: err.message || 'Having internal issue'})
});

}
// finding a single user or multiple user
exports.find = (req, res) => {
    const userID = req.query.id;

    if (userID) {
        userSchema.findById(userID)
            .then(user => {
                if (!user) {
                    return res.status(404).send({ message: "User not found" });
                }
                res.send(user);
            })
            .catch(err => {
                console.error("Error finding user by ID:", err);
                res.status(500).send({ message: "Error retrieving user" });
            });
    }
     else {
        userSchema.find()
            .then(users => {
                if (!users || users.length === 0) {
                    return res.status(404).send({ message: "No users found" });
                }
                res.send(users);
            })
            .catch(err => {
                res.status(500).send({ message: err.message || "Error retrieving users" });
            });
    }
};


exports.update=(req,res)=>{
const id= req.params.id;

    userSchema.findByIdAndUpdate(id, req.body,{userFindAndModify: false} )
    .then(data=>{
        if(!data)
        {
            res.status(404).send({message: err.message})
        }
        else
        {
            res.send(data)
        }
    }).catch(err=>{
        res.status(500).send({message: err.message || "There is no data in the database"})
    })


}
exports.delete=(req,res)=>{
    const id = req.params.id;

    userSchema.findByIdAndDelete(id)
    .then(data=>{
        if(!data)
        {
            res.status(500).send({message:err.message})
        }
        else{
            res.send("deleted successfully")
        }
    }).catch(err=>{
        res.status(500).send({message: "Error deleting a data"+ " "+id})
    });

}