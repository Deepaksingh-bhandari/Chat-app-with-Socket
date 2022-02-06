// To connect to the socket-io at port 8000
const socket = io('http://localhost:8000')

const form=document.getElementById("send-container");
const messageInput= document.getElementById("send-text")
const messageContainer= document.getElementById('message-container')

var audio = new Audio('./assets/notification.mp3')
// To append the Chats from users in the message box
const append=(message,position)=>{
   const messageElement= document.createElement('div');
    messageElement.innerText=message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position=="left")
    audio.play();
}

const user= prompt("Enter your name");
socket.emit('new-user-joined',user)

// 
socket.on('user-joined',user=>{
  append(`${user} joined the chat`,"left");  
})
socket.on('receive',data=>{
  append(`${data.user}: ${data.message}`,"left");  
})


form.addEventListener('submit',(e)=>{
    e.preventDefault(); //avoids page reload on form submit
    const text=messageInput.value;
    append(`${text}`,"right");  
    socket.emit('send',text);
    messageInput.value="";
})

socket.on('user-disconnected',user=>{
    append(`${user} left the chat`,"left");  
  })