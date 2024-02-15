const Message =  require('../models/createMessage')

const users = {};

socketController = async (io) => {
    console.log("i am connected")
    io.on('connection', socket => {
  
        socket.on('pushMessages', async messageData => {
            console.log(messageData);
            try {
                // Create a new message instance using the Message schema
                const newMessage = new Message({
                    sender: messageData.sender,
                    recipient: messageData.recipient,
                    content: messageData.content
                });
                // Save the message to the database
                await newMessage.save();
                const messages = await Message.find({
                    $or: [
                        { sender: messageData.sender, recipient: messageData.recipient },
                        { sender: messageData.recipient, recipient: messageData.sender }
                    ]
                });

                // Emit the messages back to the client using a custom event name
                socket.emit('messagesReceived', messages);
            } catch (error) {
                console.error('Error saving message:', error);
            }
        });

        // Another event listener to fetch and emit messages
        socket.on('fetchMessages', async messageData => {
            try {
                // Fetch all messages between the sender and recipient
                const messages = await Message.find({
                    $or: [
                        { sender: messageData.sender, recipient: messageData.recipient },
                        { sender: messageData.recipient, recipient: messageData.sender }
                    ]
                });

                // Emit the messages back to the client using a custom event name
                socket.emit('messagesReceived', messages);
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        });
    
        socket.on('disconnect', message => {
            // You can perform any necessary actions when a user disconnects
            // For example, you could update the user's status in the database
            // Or emit events to inform other users about the user leaving
            socket.broadcast.emit('leave', users[socket.id]);
            delete users[socket.id];
        });
    });
}

module.exports = socketController;




module.exports = {socketController};
