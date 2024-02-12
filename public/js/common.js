const socket = io();
const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector(".messages-container");
// const live = document.querySelector(".live-box");

function goBack() {
  window.history.back();
}

const appendNotification = (message) =>{
    const messageElement = document.createElement('div')
    messageElement.innerText = message
    messageElement.classList.add('message')
    messageContainer.append(messageElement)
}

const append = (message,position) =>{
    const messageElement = document.createElement('div')
    messageElement.innerText = message
    messageElement.classList.add('message-box')
    messageElement.classList.add(position)
    messageContainer.append(messageElement)
}

// const appendLive = (message) =>{
//     const messageElement = document.createElement('div')
//     messageElement.innerText = message
//     messageElement.classList.add('live')
//     live.append(messageElement)
// }

form.addEventListener('submit', (e) =>{
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, 'right')
    socket.emit('send', message)
    messageInput.value =''
})

const name = prompt("Enter Your Name To Join");



document.addEventListener("DOMContentLoaded", function () {
  // Check if the browser supports notifications
  if ("Notification" in window) {
    // Request permission to display notifications
    Notification.requestPermission().then(function (permission) {
      if (permission === "granted") {
        // Create a new notification
        var notification = new Notification("Hello, world!", {
          body: "This is a notification from your website.",
          icon: "path/to/icon.png" // Optional
        });

        // Handle click event on notification
        notification.onclick = function () {
          // Code to execute when notification is clicked
          window.focus(); // Bring focus to the window
          notification.close(); // Close the notification
        };
      }
    });
  } else {
    console.error("This browser does not support notifications.");
  }
});

var selectedUser = null; // Initialize selectedUser with a default value
var currentUser = null; // Initialize currentUser with a default value

// Function to handle user selection
function selectUser(selectedUserId, currentUserId, selectedUserName) {
  // Save the selected user ID and current user ID
  selectedUser = selectedUserId;
  currentUser = currentUserId;

  // Emit a request to fetch messages between the current user and the selected user
  socket.emit('fetchMessages', { sender: currentUser, recipient: selectedUser });

  // Listen for messages received from the server
  socket.on('messagesReceived', messages => {
    // Handle the received messages
    console.log('Received messages:', messages);

    // Clear previous messages from the conversation area
    const conversationDiv = document.querySelector('.flex.flex-col.h-full.overflow-x-auto.mb-4');
    conversationDiv.innerHTML = '';

    // Append the received messages to the HTML conversation
    messages.forEach(message => {
      // Create a div element for each message
      const messageDiv = document.createElement('div');
      messageDiv.classList.add('grid', 'grid-cols-12', 'gap-y-2');

      // Check if the message was sent by the current user
      if (message.sender === currentUser) {
        // Create div elements for message content and sender
        const messageContentDiv = document.createElement('div');
        messageContentDiv.classList.add('col-start-6', 'col-end-13', 'p-3', 'rounded-lg');
        messageContentDiv.innerHTML = `
          <div class="flex items-center justify-start flex-row-reverse">
            <div class="relative text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl">${message.content}</div>
          </div>`;
        
        // Append message content div to the message div
        messageDiv.appendChild(messageContentDiv);
      } else {
        // Create div elements for message content and sender
        const messageContentDiv = document.createElement('div');
        messageContentDiv.classList.add('col-start-1', 'col-end-8', 'p-3', 'rounded-lg');
        messageContentDiv.innerHTML = `
          <div class="flex flex-row items-center">
            <div class="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">${selectedUserName}</div>
            <div class="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">${message.content}</div>
          </div>`;
        
        // Append message content div to the message div
        messageDiv.appendChild(messageContentDiv);
      }

      // Append the message div to the conversation div
      conversationDiv.appendChild(messageDiv);
    });
  });

  // Perform any other actions needed when a user is selected
  // For example, you might display the selected user's chat history
}






// Function to send a message
function sendMessage() {
    // Get the message from the input field
    const message = document.getElementById('getdata').value;

    // Check if currentUser and selectedUser are defined
    if (currentUser && selectedUser) {
        // Emit the message to the server, along with sender and recipient information
        socket.emit('send', {
            sender: currentUser,
            recipient: selectedUser,
            content: message
        });
        selectedUser = null
        currentUser = null
        
        // Clear the input field after sending the message
        document.getElementById('getdata').value = '';
    } else {
        console.error('currentUser or selectedUser is not defined');
    }
}



// Socket events
// socket.on('new-user-joined', name => {
//   appendNotification(`${name} joined the chat`);
// });

// socket.on('user-joined', name => {
//   appendNotification(`${name} joined the chat`);
// });

// socket.on('send', data => {
//   // Display the received message
//   append(`${data.name}: ${data.message}`, 'left');
// });

// socket.on('leave', name => {
//   appendNotification(`${name} left the chat`);
// });
