const express = require('express');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
 
 //initialize app
 const app = express();

 // Connect to mongoose
mongoose.connect('mongodb://localhost:27017/projetoWeb-dev2')
    .then(()=>  console.log('MongoDB connected'))
    .catch(err => console.log(`could not connect ${err}`));

//load Aluno model
require('./models/Aluno');
const Aluno = mongoose.model('alunos');

//load Profissional model
require('./models/Profissional');
const Profissional = mongoose.model('profissionais');
 
//handlebars middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'}));  
app.set('view engine', 'handlebars');

// body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// method override middleware
app.use(methodOverride('_method'));

 //index route
 app.get('/', (req, res)=>{
    const title = 'LMP SCHOOL'; res.render('index', {title : title});
 });
 
 //about route
 app.get('/about', (req, res)=>{const title = 'About'; res.render('about', {title : title});
 });

 //render alunos page
app.get('/alunos', (req, res)=>{
        Aluno.find({})
            .sort({date : 'desc'})
            .then(alunos => {
                res.render('alunos/index', {
                    alunos : alunos
                })
            })
        
    });

 //add aluno form
app.get('/alunos/add', (req, res)=>{const title = 'Cadastro de Alunos'; res.render('alunos/add',{title : title});
});


//edit aluno form
app.get('/alunos/edit/:id', (req, res)=>{
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
app.post('/alunos', (req, res)=>{
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
            res.render('alunos/add', {
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
                                res.redirect('/alunos')
                            })
                            .catch(err => console.log(err));
        }
    });

//edit form process
app.put('/alunos/:id', (req, res)=>{
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
                    res.redirect('/alunos');
                })
        });
    });

//delete form process
app.delete('/alunos/:id', (req, res)=>{
        Aluno.remove({
            _id : req.params.id})
        .then(() => {
            res.redirect('/alunos');
        });
    });


/////////////////////////////////////////////////////////////////
 //render profissionais page
 app.get('/profissionais', (req, res)=>{
    Profissional.find({})
        .sort({date : 'desc'})
        .then(profissionais => {
            res.render('profissionais/index', {
                profissionais : profissionais
            })
        })
    
});

//add profissional form
app.get('/profissionais/add', (req, res)=>{const title = 'Cadastro de Profissionais'; res.render('profissionais/add',{title : title});
});


//edit profissional form
app.get('/profissionais/edit/:id', (req, res)=>{
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
app.post('/profissionais', (req, res)=>{
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
        res.render('profissionais/add', {
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
                            res.redirect('/profissionais')
                        })
                        .catch(err => console.log(err));
    }
});

//edit form process
app.put('/profissionais/:id', (req, res)=>{
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
                res.redirect('/profissionais');
            })
    });
});

//delete form process
app.delete('/profissionais/:id', (req, res)=>{
    Profissional.remove({
        _id : req.params.id})
    .then(() => {
        res.redirect('/profissionais');
    });
});

const port = 5000;
app.listen(port, ()=>{
   console.log(`App started at port ${port}`);
});