import {connect} from 'amqplib/callback_api';

const sendMessage = (queue, message) => {
    connect('amqp://localhost', (err, conn) => {
        conn.createChannel((err, ch) => {
            //var q = 'hello';
            ch.assertQueue(queue, {durable: false});
            ch.sendToQueue(queue, new Buffer(message));
            // Se envia correo a partir de este mensaje y SMS
        });
        setTimeout(() => { conn.close(); process.exit(0) }, 500);
    });
};

const receivedMessage= (queue) => {
    connect('amqp://localhost', (err, conn) => {
        conn.createChannel((err, ch) => {
            //var q = 'hello';
            ch.assertQueue(queue, {durable: false});
            ch.consume(queue, msg => {
                console.log("Received ", msg.content.toString());
            }, {noAck: true});
        });
        });
};

export {sendMessage, receivedMessage};