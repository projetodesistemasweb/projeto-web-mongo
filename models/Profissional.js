const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema Profissional
const ProfissionalSchema = new Schema({

    nome: {
        type: String,
        required: true
    },
    datanascimento:{
        type: String,
        required: true
    },
    foto: {
        type: String,
        required: true
    },
    formacaoacad: {
        type: String,
        required: true
    },
    endereco:{
        type: String,
        required: true
    },
    telefone: {
        type: String,
        required: true
    },
    atividade: {
        type: String,
        required: true
    },
});
mongoose.model('profissionais', ProfissionalSchema);