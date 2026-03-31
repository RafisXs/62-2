const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

// Configurações
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

// Rotas
const produtoRoutes = require('./routes/produtoRoutes');
app.use('/produtos', produtoRoutes);

// Páginas principais
app.get('/', (req, res) => res.render('home'));
app.get('/sobre', (req, res) => res.render('sobre'));
app.get('/contato', (req, res) => res.render('contato'));

// Servidor
app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});