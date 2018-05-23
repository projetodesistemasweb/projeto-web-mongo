const express = require('express');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
 
 //initialize app
 const app = express();

 //Carregando rotas
const alunos = require('./rotas/alunos');
const profissionais = require('./rotas/profissionais');
const classes = require('./rotas/classes');

// Handlebars Helpers
const {
    formatDate
}= require('./helpers/hbs');

 // Connect to mongoose
mongoose.connect('mongodb://localhost:27017/projetoWeb-dev')
    .then(()=>  console.log('MongoDB connected'))
    .catch(err => console.log(`could not connect ${err}`));

//handlebars middleware
app.engine('handlebars', exphbs({
    helpers:{
        formatDate:formatDate
    },
    defaultLayout: 'main'}));  
app.set('view engine', 'handlebars');

// body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// method override middleware
app.use(methodOverride('_method'));

//Express session midleware
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitalized: true
}));

app.use(flash());

//Global variables
app.use(function(req, res, next){
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
})

 //index route
 app.get('/', (req, res)=>{
    const title = 'LMP SCHOOL'; res.render('index', {title : title});
 });
 
 //about route
 app.get('/about', (req, res)=>{const title = 'About'; res.render('about', {title : title});
 });
 

//Use rotas
app.use('/alunos', alunos);
app.use('/profissionais', profissionais);
app.use('/classes', classes);

const port = 5000;
app.listen(port, ()=>{
   console.log(`App started at port ${port}`);
});