const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create Schema
const ClasseSchema = new Schema({
  
    nome: {
        type: String,
        required: true
    },
    cor: {
        type: String,
        required: true
    },
    numbersala:{
        type: String,
        required: true
    },
    capacidade: {
        type: String,
        required: true
    },
    professores:{
        type: String,
        required: true
    },
    alunosEscola:{
        type: Schema.Types.ObjectId,
        ref:'alunos'
    },
    aluno:{
        type: Schema.Types.ObjectId,
        ref:'alunos'
    }
    
});
mongoose.model('classes', ClasseSchema);