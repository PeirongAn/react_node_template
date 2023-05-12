const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String,
    },
    desc: {
        required: false,
        type: String,
    },
    testAddress: {
        required: true,
        type: String,
    },
    releaseAddress: {
        required: true,
        type: String,
    },
    gitLab: {
        required: true,
        type: String,
    }
})

module.exports = mongoose.model('Data', dataSchema)