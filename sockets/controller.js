const TicketControl = require("../models/ticket-control");



const ticketControl = new TicketControl();




const socketController = (socket) => {

    socket.emit('last-ticket', ticketControl.last);
    socket.emit('current-state', ticketControl.last_4);
    socket.emit('unsettled-ticket', ticketControl.tickets.length);





    socket.on('next-ticket', ( payload, callback ) => {
        
    const next = ticketControl.next();
    callback(next); 
    socket.broadcast.emit('unsettled-ticket', ticketControl.tickets.length);


    });

    socket.on('listen-ticket',( {desktop}, callback) =>{
        if(!desktop){
            return callback({
                ok:false,
                msg: 'El desktop es obligatorio'
            });
        }

    const ticket = ticketControl.listenTicket(desktop);

    socket.broadcast.emit('current-state', ticketControl.last_4);
    socket.emit('unsettled-ticket', ticketControl.tickets.length);
    socket.broadcast.emit('unsettled-ticket', ticketControl.tickets.length);

    if (!ticket){
        callback({
            ok:false,
            msg:'Ya no hay tickets pendientes'
        });
    }else{
        callback({
            ok:true,
            ticket
        })
    }

    })
}




module.exports = {
    socketController
}

