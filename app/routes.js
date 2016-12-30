// Dependencias
var mongoose        = require('mongoose');
var User            = require('./model.js');



module.exports = function(app) {

    
    app.get('/users', function(req, res){

       
        var query = User.find({});
        query.exec(function(err, users){
            if(err)
                res.send(err);

           
            res.json(users);
        });
    });

   
    app.post('/users', function(req, res){

        
        var newuser = new User(req.body);

       
        newuser.save(function(err){
            if(err)
                res.send(err);

            
            res.json(req.body);
        });
    });

    
    app.post('/query/', function(req, res){

        
        var lat             = req.body.latitude;
        var long            = req.body.longitude;
        var distance        = req.body.distance;

       
        var query = User.find({});

        
        if(distance){

            
            query = query.where('location').near({ center: {type: 'Point', coordinates: [long, lat]},

                
                maxDistance: distance * 1609.34, spherical: true});

        }

        
        query.exec(function(err, users){
            if(err)
                res.send(err);

           
            res.json(users);
        });
    });

    
    app.delete('/users/:objID', function(req, res) {
        User.remove({_id : req.params.persona_id}, function(err, user) {
            if (err)
                res.send(err);

                // Obtine y devuelve todas las personas tras borrar una de ellas
                User.find(function(err, user) {
                    if (err)
                        res.send(err)
                    res.json(user);
                });
            });
    });









};