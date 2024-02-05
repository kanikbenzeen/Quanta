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


// new code
const el = document.getElementById('messages')
el.scrollTop = el.scrollHeight