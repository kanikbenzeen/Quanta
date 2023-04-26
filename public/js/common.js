const socket = io();
const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector(".messages-container");

const appendNotification = (message,position) =>{
    const messageElement = document.createElement('div')
    messageElement.innerText = message
    messageElement.classList.add('message')
    messageElement.classList.add(position)
    messageContainer.append(messageElement)
}

const append = (message,position) =>{
    const messageElement = document.createElement('div')
    messageElement.innerText = message
    messageElement.classList.add('message-box')
    messageElement.classList.add(position)
    messageContainer.append(messageElement)
}

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
    appendNotification(`${name} joined the chat`, 'right')
})

socket.on('receive', data =>{
    append(`${data.name}: ${data.message}`, 'left')
    })

socket.on('leave', name =>{
    appendNotification(`${name} left the chat`, 'right')
    })