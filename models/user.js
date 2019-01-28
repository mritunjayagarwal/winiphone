const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    user: String,
    downlines: { type: Number, default: ''},
    associated: { type: Number, default: ''},
    dateUsed: { type: Date, default: Date.now}
});

module.exports = mongoose.model('User', userSchema);