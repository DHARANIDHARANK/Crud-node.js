const axios = require('axios');

exports.homeRoutes=(req,res)=>{

    // make a get request to api

    axios.get(`http://localhost:5002/api/users`)
    .then(function(response){
        res.render('index', {users: response.data });
    })
    .catch(err => {
        console.error(err);
        // Handle the error appropriately, e.g., render an error page or send an error response
    });

    }

exports.addUser=(req,res)=>{
    res.render('add_user');
}

exports.updateUser=(req,res)=>{
    axios.get("http://localhost:5002/api/users",{params:{id:req.query.id}})
    .then(function(userdata)
    {
        res.render('update_user',{user: userdata.data})
    })
    .catch(err=>{
        res.send({message: err || 'There is some error in the function'})
    })
}