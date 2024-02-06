const socket = io();
const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector(".messages-container");
// const live = document.querySelector(".live-box");

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

socket.emit('new-user-joined', name)

socket.on('user-joined', name =>{
    appendNotification(`${name} joined the chat`)
})

socket.on('receive', data =>{
    append(`${data.name}: ${data.message}`, 'left')
    })

socket.on('leave', name =>{
    appendNotification(`${name} left the chat`)
    })

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