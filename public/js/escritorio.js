//referencais html
const lblDesktop = document.querySelector('h1');
const btnAttend = document.querySelector('button');
const lblTicket = document.querySelector('small');
const divAlerta = document.querySelector('.alert');
const lblPendientes = document.querySelector('#lblPendientes');

const searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has('escritorio')){
    window.location = 'index.html';
    throw new Error('El escritorio es obligatorio');

}

const desktop = searchParams.get('escritorio');
lblDesktop.innerText = desktop;


divAlerta.style.display = 'none';

const socket = io();



socket.on('connect', () => {
    // console.log('Conectado');

    btnAttend.disabled = false;


});

socket.on('disconnect', () => {
    // console.log('Desconectado del servidor');
    btnAttend.disabled = true;
});


socket.on('unsettled-ticket', (unsettled) => {
    if (unsettled === 0){
        lblPendientes.style.display = 'none';
    } else {
        lblPendientes.style.display = '';
        lblPendientes.innerText = unsettled;
    }

});




btnAttend.addEventListener( 'click', () => {
    
    socket.emit('listen-ticket', {desktop}, ({ok, ticket, msg}) => {
        if( !ok ) {
            lblTicket.innerText = 'Nadie';
            return divAlerta.style.display = '';
        }


        lblTicket.innerText = `Ticket ${ticket.number}`;

    });

    // socket.emit( 'next-ticket', null, ( ticket ) => {
    //     lblNuevoTicket.innerText = ticket;
    // });

});