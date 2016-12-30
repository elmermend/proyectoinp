// Pulls Mongoose dependency for creating schemas
var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

// Creates a User Schema. This will be the basis of how user data is stored in the db
var UserSchema = new Schema({
    nombreevento: {type: String, required: true},
    organizador: {type: String, required: true},
    edad: {type: Number, required: true},
    descripcion: {type: String, required: true},
    location: {type: [Number], required: true}, // [Long, Lat]
    htmlverified: String,
    fecha: {type: Date, default: Date.now},
    creado: {type: Date, default: Date.now},
    actualizado: {type: Date, default: Date.now}
});

// Sets the created_at parameter equal to the current time
UserSchema.pre('save', function(next){
    now = new Date();
    this.actualizado = now;
    if(!this.creado) {
        this.creado = now
    }
    next();
});

// Indexes this schema in geoJSON format (critical for running proximity searches)
UserSchema.index({location: '2dsphere'});

// Exports the UserSchema for use elsewhere. Sets the MongoDB collection to be used as: "scotch-user"
module.exports = mongoose.model('usuarios', UserSchema);
