const express = require('express');
const mongoose = require('mongoose');
const rotas = express.Router();

//load Profissional model
require('../models/Profissional');
const Profissional = mongoose.model('profissionais');

//Index profissionais page
rotas.get('/', (req, res)=>{
    Profissional.find({})
        .sort({date : 'desc'})
        .then(profissionais => {
            res.render('profissionais/index', {
                profissionais : profissionais
            })
        })
    
});

//add profissional form
rotas.get('/add', (req, res)=>{const title = 'Cadastro de Profissionais'; res.render('profissionais/add',{title : title});
});


//edit profissional form
rotas.get('/edit/:id', (req, res)=>{
    const pageTitle = 'Editar Profissional';
    Profissional.findOne({
        _id : req.params.id
    })
    .then(Profissional => {
        res.render('profissionais/edit', {
            pageTitle : pageTitle,
            profissional : profissional
        });
    })
    .catch(err => console.log(err));
        
});

//process form
rotas.post('/', (req, res)=>{
    pageTitle = 'Cadastro de Profissionais';
    let errors = [];
    if(!req.body.nome){
        errors.push({text : 'please add a nome'})
    }
    if(!req.body.datanascimento){
        errors.push({text : 'please add data de nascimento'})
    } 
    if(!req.body.foto){
        errors.push({text : 'please add foto'})
    } 
    if(!req.body.formacaoacad){
        errors.push({text : 'please add formacao acad'})
    }
    if(!req.body.endereco){
        errors.push({text : 'please add nome dos endereço'})
    }
    if(!req.body.telefone){
        errors.push({text : 'please add nome dos data de entrada'})
    }     
    if(!req.body.atividade){
        errors.push({text : 'please add nome dos data de atividade'})
    } 

    if(errors.length > 0){
        res.render('/add', {
            pageTitle : pageTitle,
            errors : errors,
            nome : req.body.nome,
            datanascimento : req.body.datanascimento,
            foto : req.body.foto,
            formacaoacad : req.body.formacaoacad,
            endereco : req.body.endereco,
            telefone : req.body.telefone,
            atividade : req.body.atividade,
        })
        }else{
            const newUser = {
                nome : req.body.nome,
                datanascimento : req.body.datanascimento,
                foto : req.body.foto,
                formacaoacad : req.body.formacaoacad,
                endereco : req.body.endereco,
                telefone : req.body.telefone,
                atividade : req.body.atividade,
                };
                    new Profissional(newUser)
                        .save()
                        .then(profissional => {
                            req.flash('success_msg', 'Profissional Adicionado');
                            res.redirect('/profissionais')
                            })
                                .catch(err => console.log(err));
                            }
});

//edit form process
rotas.put('/:id', (req, res)=>{
    Profissional.findOne({
        _id : req.params.id
    })
    .then(profissional => {
        //new values from form
        profissional.nome = req.body.nome;
        profissional.datanascimento = req.body.datanascimento;
        profissional.foto = req.body.foto;
        profissional.formacaoacad = req.body.formacaoacad;
        profissional.endereco = req.body.endereco;
        profissional.telefone = req.body.telefone;
        profissional.atividade = req.body.atividade;

        profissional.save()
            .then(profissional => {
                req.flash('success_msg', 'Profissional Alterado');
                res.redirect('/profissionais');
            })
    });
});

//delete form process
rotas.delete('/:id', (req, res)=>{
    Profissional.remove({_id : req.params.id})
    .then(() => {
        req.flash('success_msg', 'Profissional Removido');
        res.redirect('/profissionais');
    });
});

module.exports = rotas;