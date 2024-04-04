const express = require('express')
const route= express.Router();
const controller= require('../controller/controller')

const services= require('../services/render')
route.get('/',services.homeRoutes);

route.get('/add-user',services.addUser);

route.get('/update-user',services.updateUser);

route.post('/api/users/create',controller.create);
route.get('/api/users',controller.find);
//route.get('/api/users/:id',controller.find);
route.put('/api/users/:id',controller.update);
route.delete('/api/users/:id',controller.delete);

module.exports=route;