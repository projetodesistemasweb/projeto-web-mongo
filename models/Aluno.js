const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create Schema
const AlunoSchema = new Schema({
    nome : {
        type: String,
        required : true
    },
    date : {
        type : Date,
        default : Date.now
    },
    datanascimento: {
        type: Date,
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
        type: Date,
        required: false
    } 
});

//connect schema to model
mongoose.model('alunos', AlunoSchema); 