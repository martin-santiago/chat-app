const Chat = require('./models/chat');
const Message = require('./models/message');

module.exports = (io) => {
    io.on('connection', socket => {
        console.log('Nuevo ususario conectado');
        //Recibiendo mensaje y datos 

        socket.on('user', (id) => {
            socket.nickname = id;
        })

        socket.on('Mensaje enviado', async (data, callback) => {
            if (data['chatId'] != 9999){
                const me = Message.build({chatId: data['chatId'], uid: data['id'], text: data['mensaje']})
                await me.save();
            }
            io.sockets.emit('emitido', {
                msg:data['mensaje'],
                id:data['id'],
                chatId:data['chatId']
            })

        });
    });
    
}