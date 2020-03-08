import {Howl, Howler} from 'howler';
import {sounds} from './soundList'

var howls={};

function read(message){
document.getElementById("message_area").innerHTML=message;
}

function processMessage(message){
const m=JSON.parse(message);
if(m['command']=='play'){
howls[m['filename']].play();
}
}

const current_connection = new WebSocket("ws://karutaserver.herokuapp.com","karuta-protocol");
current_connection.addEventListener("open", e => {
read("Connected");
});
current_connection.addEventListener("error", e => {
read("connection error");
});
current_connection.addEventListener("message", e => {
processMessage(e.data);
});

window.onload=function(){
const lst=document.getElementById("soundlist_select");
sounds.forEach((elem)=>{
var e=document.createElement("option");
e.setAttribute("value",elem);
e.innerHTML=elem;
lst.appendChild(e);
});
}

var navigation_opened="false";

window.onNavigationButtonClick=function(){
navigation_opened = navigation_opened=="true" ? "false" : "true";
document.getElementById("navigation_btn").setAttribute("aria-expanded",navigation_opened);
document.getElementById("soundlist").className=navigation_opened=="true" ? "soundlist" : "soundlist closed";
}

window.onSoundListDecide=function(){
const filename=document.getElementById("soundlist_select").value;
var send={'command': 'request', 'filename': filename};
send=JSON.stringify(send);
current_connection.send(send);
}

window.onStartButtonPress=function(){
sounds.forEach((elem)=>{
howls[elem]=new Howl({src: ['sounds/'+elem+'.ogg']});
});
document.getElementById("start_button").disabled=true;
}
