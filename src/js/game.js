import {Howl, Howler} from 'howler';
import {sounds} from './soundList'

var howls={};
var startSound=new Howl({
src: ['sounds/start.mp3'],
loop: true
});
var sounds_loaded=false;
var current_mode=-1;//-1: not selected, 0:remote control, 1:receiver
var now_playing=null;

function read(message){
document.getElementById("message_area").innerHTML=message;
}

function sendMessage(message){
const m=JSON.stringify(message);
current_connection.send(m);
}

function onRemoteControlRequestResult(result){
console.log("onRemoteControlRequestResult");
if(result=='true'){
read("リモコンモードが有効になりました。");
setRemoteControlMode(true);
}else{
read("すでに誰かがリモコンモードを使用しています。2人でリモコンは使えません。");
}
}

function setRemoteControlMode(enabled){
if(enabled){
document.getElementById("remote_control_button").setAttribute("aria-pressed","true");
document.getElementById("card_button").setAttribute("aria-pressed","false");
document.getElementById("soundlist").className="soundlist";
current_mode=0;
}else{
document.getElementById("remote_control_button").setAttribute("aria-pressed","false");
document.getElementById("card_button").setAttribute("aria-pressed","true");
document.getElementById("soundlist").className="soundlist closed";
current_mode=1;
read("カードモードが有効になりました。");
}
}

function processMessage(message){
console.log("ProcessMessage: "+message);
const m=JSON.parse(message);
if(m['command']=='play'){
if(now_playing) now_playing.stop();
howls[m['filename']].play();
now_playing=howls[m['filename']];
return;
}

if(m['command']=='player_count'){
read("参加者: "+m['number']+"人");
return;
}

if(m['command']=='remote_control_request_result'){
onRemoteControlRequestResult(m['result']);
}
}

const current_connection = new WebSocket("ws://karutaserver.herokuapp.com","karuta-protocol");
//const current_connection = new WebSocket("ws://localhost:3000","karuta-protocol");
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
if(current_mode==0){
sendMessage({'command': 'remote_control_exit'});
}
setRemoteControlMode(false);
}
}
