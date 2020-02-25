const mongoose = require('mongoose');

const payeeSchema = new mongoose.Schema({
    name: {
        type: String,
        requred: true
    }
}, {
    bufferCommands: false
})

module.exports = mongoose.model('Payee', payeeSchema)