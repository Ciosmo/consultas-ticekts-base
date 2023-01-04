# Basic socket server with other features

This is a webSocket project, using Node with express and working with socket.io


-----------------------------------------------------------------------------------------------------------------------------------
Welcome to the socketController project!

This project provides a socket controller module for managing tickets in a queue using a TicketControl class and a socketController function. The TicketControl class keeps track of the tickets and includes methods for creating and serving tickets. The socketController function provides a set of Socket.io events for interacting with the ticket queue.

The TicketControl class has the following methods:

next(): Creates a new ticket and adds it to the queue. Returns the ticket number.
listenTicket(desktop): Marks the next ticket in the queue as being served by the specified desktop. Removes the ticket from the queue and adds it to the list of the last four tickets served.
The socketController function emits the following events:

last-ticket: Emits the last ticket number in the queue.
current-state: Emits the current state of the ticket queue, including the last four ticket numbers called.
unsettled-ticket: Emits the number of unsettled tickets in the queue.
The socketController function also listens for the following events:

next-ticket: Listens for a request for the next ticket in the queue and emits the ticket number to the client.
listen-ticket: Listens for a request to mark a ticket as being served by a specific desktop and emits the current state of the ticket queue to all connected clients.
The TicketControl class also includes a toJSON getter that returns an object with the current state of the ticket queue, and a saveDB method that saves the current state of the ticket queue to a JSON file.

Thank you for using the socketController project!
