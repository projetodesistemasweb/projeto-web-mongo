const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create Schema
const IdeaSchema = new Schema({
    nome : {
        type: String,
        required : true
    },
    date : {
        type : Date,
        default : Date.now
    },
    datanascimento: {
        type: String,
        required: true
    },
    foto: {
        type: String,
        required: true
    },
    nomepais: { 
        type: String,
        required: true
    },
    endereco: {
        type: String,
        required: true
    },
    data: {
        type: String,
        required: true
    } 
});

//connect schema to model
mongoose.model('ideas', IdeaSchema); 