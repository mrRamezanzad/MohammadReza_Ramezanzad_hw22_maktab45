const mongoose = require('mongoose')

// TODO: Check for neccessary fields in article 
const articleSchema = new mongoose.Schema({
    title: {
        type: String, 
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 100
    },
    content: {
        type: String, 
        required: true,
        trim: true,
        minlength: 10,
        // maxlength: 1000
    },
    picture: {
        type: String,
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
    lastUpdate: {
        type: Date,
        default: Date.now
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refrence: 'User'
    }
})

module.exports = mongoose.model("Article", articleSchema)