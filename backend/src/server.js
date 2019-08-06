const express = require('express');
const mongoose = require('mongoose'); // serve para utilizar a linguagem js para manipular com o banco de dados, ele é basicamente um transpilador
const cors = require('cors'); 

const routes = require('./routes');
const server = express();
// conexao com o banco de dados
mongoose.connect('mongodb+srv://brochj:202230@cluster0-atau3.mongodb.net/omnistack8?retryWrites=true&w=majority', {useNewUrlParser: true});

server.use(express.json()); // Dizendo ao express, que todas as requisoes serão em JSON

server.use(cors());
server.use(routes);
server.listen(3333);


