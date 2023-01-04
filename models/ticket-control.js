const path = require('path');
const fs = require('fs');


class Ticket {
    constructor (number, desktop) {
        this.number = number;
        this.desktop = desktop;
    }
}



class TicketControl {

    constructor (){
        this.last = 0;
        this.today = new Date().getDate();
        this.tickets = [];
        this.last_4 = [];
        
        
        this.init();

    }

    get toJSON() {
        return {
            last: this.last,
            today: this.today,
            tickets: this.tickets,
            last_4: this.last_4
        }
    }

    init(){
        const {today, tickets, last, last_4} = require("../db/data.json");
        if  ( today === this.today){
            this.tickets = tickets;
            this.last = last;
            this.last_4 = last_4;

        }else{
            //Es otro dia
            this.saveDB();
        }
    }
    
    saveDB(){

        const dbPath = path.join(__dirname, '../db/data.json');
        fs.writeFileSync(dbPath, JSON.stringify( this.toJSON ));

    }

    next(){
        this.last +=1; 
        const ticket = new Ticket(this.last, null);
        this.tickets.push(ticket);
        this.saveDB();

        return 'Ticket' + ticket.number;

    }

    listenTicket(desktop){

        //No tenemos tickets
        if (this.tickets.length === 0){
            return null;
        }

        const ticket = this.tickets.shift();
        ticket.desktop = desktop;
        
        
        this.last_4.unshift(ticket);
        if(this.last_4.length > 4){
            this.last_4.splice(-1,1);

        }
        this.saveDB();

        return ticket;


    }


}

module.exports = TicketControl;