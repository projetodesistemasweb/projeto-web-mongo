const express = require('express');
const mongoose = require('mongoose');
const rotas = express.Router();

//load Aluno model
require('../models/Classe');
const Classe = mongoose.model('classes');

 //Alunos index page
 rotas.get('/', (req, res)=>{
    Classe.find({})
        .sort({date : 'desc'})
        .then(classes => {
            res.render('classes/index', {
                classes : classes
            })
        })
    
});

//add aluno form
rotas.get('/add', (req, res)=>{const title = 'Cadastro de Classes'; res.render('classes/add',{title : title});
});

// ADD Classe schema
rotas.post('/', (req, res)=>{
    pageTitle = 'Adicionar Classe';
    let errors = [];
    if(!req.body.nome){
        errors.push({text : 'please add a nome'})
    }
    if(!req.body.cor){
        errors.push({text : 'please add Cor da turma'})
    } 
    if(!req.body.numbersala){
        errors.push({text : 'please add Numero da Sala'})
    } 
    if(!req.body.capacidade){
        errors.push({text : 'please add Capacidade da sala'})
    }
    if(!req.body.professores){
        errors.push({text : 'please add Professores'})
    }

    if(errors.length > 0){
        res.render('/add', {
            pageTitle : pageTitle,
            errors : errors,
            nome : req.body.nome,
            cor : req.body.cor,
            numbersala : req.body.numbersala,
            capacidade : req.body.capacidade,
            professores : req.body.professores,
        })
    }else{
        const newUser = {
            nome : req.body.nome,
            cor : req.body.cor,
            numbersala : req.body.numbersala,
            capacidade : req.body.capacidade,
            professores : req.body.professores, 
            aluno: req.aluno.id                   
        };
                    new Classe(newUser)
                    .save()
                    .then(classe => {
                        req.flash('success_msg', 'Classe Adicionado');
                        res.redirect('/classes')
                    })
                    .catch(err => console.log(err));
    }

});

module.exports = rotas;