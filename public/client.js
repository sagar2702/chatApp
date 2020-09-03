var socket = io();

var name = prompt("enter your name");

socket.emit("newUser", name);
//take message and send to server when submitted 
$('form').submit(function(e) {
    e.preventDefault(); // prevents page reloading
    socket.emit('chat message', $('#msg').val());
    $('#msg').val('');

});


socket.on("chat message", (detail)=>{
  addMessage(detail);
});

socket.on("newUser", (detail)=>{
  addMessage(detail);
});

socket.on("member",(users)=>{
  const count=Object.keys(users).length;
  $("#members").html('');
  for(var user in users){
    // console.log(users[user]);
    $("#members").append($('<li>').text(users[user]));
  }
  $("#count").text(count);
});

function addMessage(data){
  // console.log(data);
  //adding to list of messages
  $("#messages").append($('<li>').html(`<span>${data.username}</span>[${data.time}] :<br>${data.message}`));
   //scroll down
  $(".msgbox").stop().animate({ scrollTop: $(".msgbox")[0].scrollHeight}, 1000);
}