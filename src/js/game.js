import {Howl, Howler} from 'howler';
import {sounds} from './soundList'

var howls={};
var startSound=new Howl({src: ['sounds/start.mp3']});
var sounds_loaded=false;
var current_mode=-1;//-1: not selected, 0:remote control, 1:receiver

function read(message){
document.getElementById("message_area").innerHTML=message;
}

function sendMessage(message){
m=JSON.stringify(message);
current_connection.send(m);
}

function processMessage(message){
const m=JSON.parse(message);
if(m['command']=='play'){
howls[m['filename']].play();
return;
}

if(m['command']=='player_count'){
read("参加者: "+m['number']+"人");
return;
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
sendMessage(send);
}

window.onStartButtonPress=function(mode){
if(current_mode==mode) return;
startSound.play();
if(!sounds_loaded){
sounds.forEach((elem)=>{
howls[elem]=new Howl({src: ['sounds/'+elem+'.mp3']});
});
sounds_loaded=true;
}
if(mode==0){
sendMessage({'command': 'remote_control_request'});
}else{
document.getElementById("remote_control_button").setAttribute("aria-pressed","false");
document.getElementById("card_button").setAttribute("aria-pressed","true");
if(current_mode==0){
sendMessage({'command': 'remote_control_exit'});
}
}
current_mode=mode;
}
