const socket = io();
const form = document.getElementById("send-container");
const messageInput = document.getElementById("messageInp");
const messageContainer = document.getElementById("messages");


// Request permission to display notifications when the DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
    // Check if the browser supports notifications
    if ("Notification" in window) {
        Notification.requestPermission().then(function (permission) {
            if (permission === "granted") {
                console.log("Notification permission granted.");
            }
        });
    } else {
        console.error("This browser does not support notifications.");
    }
});

// Function to send a notification
function sendNotification(title, body, icon = "") {
    if ("Notification" in window && Notification.permission === "granted") {
        // Create a new notification
        var notification = new Notification(title, {
            body: body,
            icon: icon,
        });

        // Handle click event on notification
        notification.onclick = function () {
            // Code to execute when notification is clicked
            window.focus(); // Bring focus to the window
            notification.close(); // Close the notification
        };
    }
}

// Function to append notifications to the message container
const appendNotification = (message) => {
    const messageElement = document.createElement("span");
    messageElement.innerText = message;
    messageElement.classList.add(
        "capitalize",
        "flex",
        "justify-center",
        "text-sm",
        "text-rose-500"
    );
    messageContainer.appendChild(messageElement);
};

// Function to append chat messages to the message container
const append = (message, position) => {
    const messageElement = document.createElement("div");
    messageElement.classList.add("chat-message");

    const flexContainer = document.createElement("div");
    flexContainer.classList.add("flex", "items-end");

    if (position === "left") {
        flexContainer.classList.add("justify-start");

        const flexColumn = document.createElement("div");
        flexColumn.classList.add(
            "flex",
            "flex-col",
            "space-y-2",
            "text-xs",
            "max-w-xs",
            "mx-2",
            "order-2",
            "items-start"
        );

        const spanElement = document.createElement("span");
        spanElement.classList.add(
            "px-4",
            "py-2",
            "rounded-lg",
            "inline-block",
            "rounded-bl-none",
            "bg-gray-300",
            "text-gray-600"
        );
        spanElement.innerText = message;

        flexColumn.appendChild(spanElement);
        flexContainer.appendChild(flexColumn);
        messageElement.appendChild(flexContainer);
    } else if (position === "right") {
        flexContainer.classList.add("justify-end");

        const flexColumn = document.createElement("div");
        flexColumn.classList.add(
            "flex",
            "flex-col",
            "space-y-2",
            "text-sm",
            "max-w-xs",
            "mx-2",
            "order-1",
            "items-end"
        );

        const spanElement = document.createElement("span");
        spanElement.classList.add(
            "px-4",
            "py-2",
            "rounded-lg",
            "inline-block",
            "rounded-br-none",
            "bg-blue-600",
            "text-white"
        );
        spanElement.innerText = message;

        flexColumn.appendChild(spanElement);
        flexContainer.appendChild(flexColumn);
        messageElement.appendChild(flexContainer);
    }

    messageContainer.appendChild(messageElement);
};

// Event listener for the form submission
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const message = messageInput.value;
    append(`${message}`, "right");
    socket.emit("send", message);
    messageInput.value = "";
});

// Function to update active users
const updateActiveUsers = (users) => {
    const activeUsersElement = document.getElementById("activeUsers");
    activeUsersElement.innerHTML = ""; // Clear previous content

    users.forEach((user) => {
        const userElement = document.createElement("span");
        userElement.className =
            "capitalize inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10";

        const statusDot = document.createElement("span");
        statusDot.className = "h-2 w-2 bg-green-400 rounded-full mr-1";
        userElement.appendChild(statusDot);

        const username = document.createTextNode(user);
        userElement.appendChild(username);

        activeUsersElement.appendChild(userElement);
    });
};

// Event listener for receiving active users
socket.on("active-users", (activeUsers) => {
    updateActiveUsers(activeUsers);
});

// Event listener for handling "user-joined" notifications
socket.on("user-joined", (name, activeUsers) => {
    appendNotification(`${name} joined the chat`);
    updateActiveUsers(activeUsers);
});

// Event listener for handling "leave" notifications
socket.on("leave", (name, activeUsers) => {
    if (name) {
        appendNotification(`${name} left the chat`);
    }
    updateActiveUsers(activeUsers);
});

// Event listener for receiving messages from other users
socket.on("receive", (data) => {
    const name = data.name.charAt(0).toUpperCase() + data.name.slice(1); // Uppercase the name
    append(`${name}: ${data.message}`, "left");
    sendNotification(name, data.message, "path/to/icon.png");
});

// Function to handle form submission for entering name
function submitName() {
    // Get the value of the input box
    const nameValue = document.getElementById("name").value.trim();

    // Check if the name is empty or contains numbers
    if (nameValue === "" || /\d/.test(nameValue)) {
        // Show an error message
        showError(document.getElementById("name"), "Please enter a valid name.");
        return; // Stop execution
    }

    // Assign the value to a constant
    const name = nameValue;
    $("#userName").append(name);
    socket.emit("new-user-joined", name);
    closeModal();
}

// Function to show error messages
function showError(element, message) {
    const errorId = element.id + "_error";
    let errorElement = document.getElementById(errorId);
    if (!errorElement) {
        errorElement = document.createElement("span");
        errorElement.id = errorId;
        errorElement.className = "text-sm text-rose-500"; // Set error message style
        element.parentNode.insertBefore(errorElement, element.nextSibling);
    }
    errorElement.textContent = message;
}

// Function to close the modal
function closeModal() {
    console.log("Modal closed");
    document.getElementById("namePopup").style.display = "none";
}

// Code to automatically scroll to the bottom of the message container
const el = document.getElementById("messages");
el.scrollTop = el.scrollHeight;
