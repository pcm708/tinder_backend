const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    gender: String,
    age: Number,
    location: {
        type: { type: String },
        coordinates: []
    },
    preferences: {
        minAge: Number,
        maxAge: Number,
        gender: []
    }
});

userSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('User', userSchema);