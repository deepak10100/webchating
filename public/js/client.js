console.log("connected")
var socket = io();
var username;
var chat = document.querySelector(".chat")
var user_list = document.querySelector(".user-list")
var user_count = document.querySelector(".user-count")
var send = document.querySelector("#send")
var usermsg = document.querySelector("#user-msg")
do {
    username = prompt("Enter The Your Name : ")
} while (!username);
socket.emit("new-user-joined",username)

socket.on('user-connected', (socket_nanme) => {
  userjoinleft(socket_nanme," joined")
  });
 

  function userjoinleft(name, status) {
      let div = document.createElement("div")
      div.classList.add("user-join")
      let content = ` <p><b>${name}</b> ${status} the chat</p>`
      div.innerHTML=content
      chat.appendChild(div)
    //   chat.scrollTop =chat.scrollHeight
  }

  socket.on('user-disconnect', (user) => {
    userjoinleft(user,"left")
   });
  socket.on('user-list', (users) => {
    user_list.innerHTML=""
    user_arr = Object.values(users)
    for (let i = 0; i < user_arr.length; i++) {
       let p = document.createElement('p')
       p.innerText=user_arr[i]
       user_list.appendChild(p)
        
    }
    user_count.innerHTML=user_arr.length
   });
  send.addEventListener('click',function () {
      let data = {
          user:username,
        msg: usermsg.value
     }
     if (usermsg.value!="") {
         appendMessage(data,'outgoing')
         socket.emit('message',data)
         usermsg.value=""
     }
  })
  function appendMessage(data,status) {
      let div = document.createElement('div')
      div.classList.add('message',status)
      let content = ` <h5>${data.user}</h5>
      <p>${data.msg}</p>
      `
      div.innerHTML=content
      chat.appendChild(div)
    //   chat.scrollTop =chat.scrollHeight
  }
  socket.on('message',function (data) {
      appendMessage(data,"incoming")
  })