const express = require('express');
const path = require('path');
const sequelize = require('./config/database');
const app = express();
const Chat = require('./models/chat');
const Message = require('./models/message');
const bodyParser = require('body-parser');
const server = require('http').Server(app);
const router = express.Router();
const socketio = require('socket.io')(server);
const cors = require('cors');
const open = require('open');
const fs = require('fs');
const { auth } = require('express-openid-connect');


app.use(cors({origin: 'http://localhost:3000'}))

require('./sockets')(socketio);
const urlencodedParser = bodyParser.urlencoded({ extended: false })  
app.set('port',4000);
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', './src/views');
app.set('view engine', 'ejs');
app.set('Access-Control-Allow-Methods','GET,POST');
app.use(bodyParser.json());


const config = {
    authRequired: false,
    auth0Logout: true,
    baseURL: 'http://localhost:4000',
    clientID: '3z2I8rGZNb9BqGiCW90xYVeH19kBWJgZ',
    issuerBaseURL: 'https://dev-f6akw601.us.auth0.com',
    secret: 'LONG_RANDOM_STRING'
};

app.use(auth(config));
const { requiresAuth } = require('express-openid-connect');

app.get('/profile', requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user.sub));
});

app.get('/', (req, res) => {
    res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out')
});

app.get('/chat/:id1/:id2/', requiresAuth(), async (req, res) => {
    const isAuthenticated = await req.oidc.isAuthenticated();
    if(isAuthenticated){
        console.log(req.oidc.user.sub);
        console.log(req.params.id1);
        if (req.oidc.user.sub == req.params.id1){
            const cha = await Chat.findOne({where: {uid1: req.params.id1, uid2: req.params.id2}});
            const cha2 = await Chat.findOne({where: {uid1: req.params.id2, uid2: req.params.id1}});
            if (cha){
                const historial = await Message.findAll({where: {chatId: cha.id}});
                res.render('index.ejs', {id1: req.params.id1, id2: req.params.id2, chatId: cha.id, historial: historial});
            }
            else if (cha2){
                const historial = await Message.findAll({where: {chatId: cha2.id}});
                res.render('index.ejs', {id1: req.params.id1, id2: req.params.id2, chatId: cha2.id, historial: historial});
            }
            else{
                res.render('empty.ejs');
            }
        }
        else{
            res.render('erro.ejs');
        }
    }
    else{
        res.render('erro.ejs');
    }
  });

app.get('/general/:id/', requiresAuth(), async (req, res) => {
    const isAuthenticated = await req.oidc.isAuthenticated();
    if(isAuthenticated){
        console.log(req.oidc.user.sub);
        console.log(req.params.id);
        if (req.oidc.user.sub == req.params.id){
            // const historial = await Message.findAll({where: {chatId: 9999}});
            res.render('general.ejs', {id1: req.params.id, id2: '9999', chatId: 999});
            // res.render('general.ejs', {id1: req.params.id1, chatId: 9999});
        }
        else{
            res.render('erro.ejs');
        }
    }
    else{
        res.render('erro.ejs');
    }
});

  app.post('/chat/new', urlencodedParser, async (req, res) => {
    console.log(req.body);
    const cha = await Chat.findOne({where: {uid1: req.body.uid1, uid2: req.body.uid2}});
    const cha2 = await Chat.findOne({where: {uid1: req.body.uid2, uid2: req.body.uid1}});
    if (!cha && !cha2) {
        nuevo_chat = Chat.build({ uid1: req.body.uid1, uid2: req.body.uid2, name1: 'U1', name2: 'U2' })
        await nuevo_chat.save();
        res.body = 'Chat existente';
        return 'Chat existente'
    }
    else{
        res.body = 'Nuevo CHat';
        res.status(200).send('Nuevo chat');
    }
  });

(async () => {
    try {
        await sequelize.sync(
            {force: false}
        );
    server.listen(4000, () => console.log('Server listening on por 4000'));
    // app.listen(3000)
    }
    catch (err) {
        console.log(err)
    }
})()

app.use("/", router);

module.exports = server;



