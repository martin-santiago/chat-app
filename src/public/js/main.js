$(function() {
    const socket = io();

    const mensajes = $('#mensajes');
    const input = $('#input-chat');
    const form = $('#form');

    var data;
    var params = $('#llamada');
    var param_a = params[0].classList[0];
    var param_b = params[0].classList[1];
    var param_c = params[0].classList[2];

    console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', param_b);
    console.log('bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb', param_b);
    console.log('cccccccccccccccccccccccccccccccccccc', param_c);
    const chat = [param_a, param_b];

    form.submit( e => {
        e.preventDefault();
        data = {
            'mensaje': input.val(),
            'id': param_a,
            'chatId': param_c
        };
        socket.emit('Mensaje enviado', data);
        input.val('');
    })

    socket.on('emitido', function(mensaje){
        if (mensaje.chatId == 999){
            if(mensaje.id == chat[0]){
                mensajes.append(`
                <div class="l">
                    <div class="m">
                        <div class="text">${mensaje.msg}</div>
                        <div id="l-m"></div>
                    </div>
                </div>
                `);
            }
            else{
                    mensajes.append(`
                    <div class="r">
                        <div class="m">
                            <div class="text">${mensaje.id}: ${mensaje.msg}</div>
                            <div id="r-m"></div>
                        </div>
                    </div>
                    `);
            }
        }
        else{
            if(param_a == mensaje.id){
                if(mensaje.id == chat[0] || mensaje.id == chat[1]){
                    mensajes.append(`
                    <div class="l">
                        <div class="m">
                            <div class="text">${mensaje.msg}</div>
                            <div id="l-m"></div>
                        </div>
                    </div>
                    `);
                }
                }
                else if(mensaje.chatId == param_c){
                    if(mensaje.id == chat[0] || mensaje.id == chat[1]){
                        mensajes.append(`
                        <div class="r">
                            <div class="m">
                                <div class="text">${mensaje.msg}</div>
                                <div id="r-m"></div>
                            </div>
                        </div>
                        `);
                    }
                }
        }
    })


})


