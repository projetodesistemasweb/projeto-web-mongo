const express = require('express');
const mongoose = require('mongoose');
const rotas = express.Router();

//load Aluno model
require('../models/Aluno');
const Aluno = mongoose.model('alunos');

 //Alunos index page
 rotas.get('/', (req, res)=>{
    Aluno.find({})
        .sort({date : 'desc'})
        .then(alunos => {
            res.render('alunos/index', {
                alunos : alunos
            })
        })
    
});

//add aluno form
rotas.get('/add', (req, res)=>{const title = 'Cadastro de Alunos'; res.render('alunos/add',{title : title});
});


//edit aluno form
rotas.get('/edit/:id', (req, res)=>{
    const pageTitle = 'Editar Aluno';
    Aluno.findOne({
        _id : req.params.id
    })
    .then(aluno => {
        res.render('alunos/edit', {
            pageTitle : pageTitle,
            aluno : aluno
        });
    })
    .catch(err => console.log(err));
        
});

//process form
rotas.post('/', (req, res)=>{
    pageTitle = 'Cadastro de Alunos';
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
    if(!req.body.nomepais){
        errors.push({text : 'please add nome dos pais'})
    }
    if(!req.body.endereco){
        errors.push({text : 'please add nome dos endereço'})
    }
    if(!req.body.data){
        errors.push({text : 'please add nome dos data de entrada'})
    }     

    if(errors.length > 0){
        res.render('/add', {
            pageTitle : pageTitle,
            errors : errors,
            nome : req.body.nome,
            datanascimento : req.body.datanascimento,
            foto : req.body.foto,
            nomepais : req.body.nomepais,
            endereco : req.body.endereco,
            data : req.body.data
        })
    }else{
        const newUser = {
                nome : req.body.nome,
                datanascimento : req.body.datanascimento,
                foto : req.body.foto,
                nomepais : req.body.nomepais,
                endereco : req.body.endereco,
                data : req.body.data
                    };
                    new Aluno(newUser)
                        .save()
                        .then(aluno => {
                            req.flash('success_msg', 'Alunos Adicionado');
                            res.redirect('/alunos')
                        })
                        .catch(err => console.log(err));
    }
});

//edit form process
rotas.put('/:id', (req, res)=>{
    Aluno.findOne({
        _id : req.params.id
    })
    .then(aluno => {
        //new values from form
        aluno.nome = req.body.nome;
        aluno.datanascimento = req.body.datanascimento;
        aluno.foto = req.body.foto;
        aluno.nomepais = req.body.nomepais;
        aluno.endereco = req.body.endereco;
        aluno.data = req.body.data;

        aluno.save()
            .then(aluno => {
                req.flash('success_msg', 'Alunos Alterado');
                res.redirect('/alunos');
            })
    });
});

//delete form process
rotas.delete('/:id', (req, res)=>{
    Aluno.remove({
        _id : req.params.id})
    .then(() => {
        req.flash('success_msg', 'Aluno Removido');
        res.redirect('/alunos');
    });
});


module.exports = rotas;