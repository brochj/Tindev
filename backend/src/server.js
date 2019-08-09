const express = require('express');
const mongoose = require('mongoose'); // serve para utilizar a linguagem js para manipular com o banco de dados, ele é basicamente um transpilador


const cors = require('cors');

const routes = require('./routes');
const app = express();

const server = require('http').Server(app); // importando o modulo http padrao do node

const io = require('socket.io')(server);

const connectedUsers = {};

io.on('connection', socket => {
    // console.log('Nova conxeao', socket.id); // Todo cliente q se conecta com o backend, tera um socket.id único
    //A ponte entre backend e front fica basicamente feita por
    // os dois lados podem emitir e receber infos
    // basta usar um socket.on() (para receber) e um socket.emit() (para manda a msg);

    const { user } = socket.handshake.query;
    console.log('user: '+user, 'socket.id: '+ socket.id, 'from backend/src/server.js');
    connectedUsers[user] = socket.id;


});

// conexao com o banco de dados
mongoose.connect('mongodb+srv://brochj:202230@cluster0-atau3.mongodb.net/omnistack8?retryWrites=true&w=majority', { useNewUrlParser: true });

app.use((req, res, next) => {
    req.io = io; // passando infos para dentro do Likecontroller
    req.connectedUsers = connectedUsers; // passando infos para dentro do Likecontroller

    return next();
})

app.use(cors());
app.use(express.json()); // Dizendo ao express, que todas as requisoes serão em JSON
app.use(routes);

server.listen(3333);


