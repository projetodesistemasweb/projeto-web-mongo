const express = require('express');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
 
 //initialize app
 const app = express();

 // Connect to mongoose
mongoose.connect('mongodb://localhost:27017/projetoWeb-dev')
    .then(()=>  console.log('MongoDB connected'))
    .catch(err => console.log(`could not connect ${err}`));

//load Idea model
require('./models/Idea');
const Idea = mongoose.model('ideas');
 
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
    const title = 'index'; res.render('index', {title : title});
 });
 
 //about route
 app.get('/about', (req, res)=>{const title = 'About'; res.render('about', {title : title});
 });

 //render ideas page
app.get('/ideas', (req, res)=>{
        Idea.find({})
            .sort({date : 'desc'})
            .then(ideas => {
                res.render('ideas/index', {
                    ideas : ideas
                })
            })
        
    });

 //add idea form
app.get('/ideas/add', (req, res)=>{const title = 'Add new video idea'; res.render('ideas/add',{title : title});
});


//edit idea form
app.get('/ideas/edit/:id', (req, res)=>{
        const pageTitle = 'Edit video idea';
        Idea.findOne({
            _id : req.params.id
        })
        .then(idea => {
            res.render('ideas/edit', {
                pageTitle : pageTitle,
                idea : idea
            });
        })
        .catch(err => console.log(err));
            
    });

//process form
app.post('/ideas', (req, res)=>{
        pageTitle = 'Add new video idea';
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
            res.render('ideas/add', {
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
                        new Idea(newUser)
                            .save()
                            .then(idea => {
                                res.redirect('/ideas')
                            })
                            .catch(err => console.log(err));
        }
    });

//edit form process
app.put('/ideas/:id', (req, res)=>{
        Idea.findOne({
            _id : req.params.id
        })
        .then(idea => {
            //new values from form
            idea.nome = req.body.nome;
            idea.datanascimento = req.body.datanascimento;
            idea.foto = req.body.foto;
            idea.nomepais = req.body.nomepais;
            idea.endereco = req.body.endereco;
            idea.data = req.body.data;
    
            idea.save()
                .then(idea => {
                    res.redirect('/ideas');
                })
        });
    });

//delete form process
app.delete('/ideas/:id', (req, res)=>{
        Idea.remove({
            _id : req.params.id})
        .then(() => {
            res.redirect('/ideas');
        });
    });

const port = 5000;
app.listen(port, ()=>{
   console.log(`App started at port ${port}`);
});