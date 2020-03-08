import {Howl, Howler} from 'howler';
import {sounds} from './soundList'
var WebSocketClient = require('websocket').client;

var client = new WebSocketClient();
var current_connection=null;

function read(message){
document.getElementById("message_area").innerHTML=message;
}

function processMessage(message){
const m=JSON.parse(message);
if(m['command']=='play'){
var sound = new Howl({src: ['sounds/'+m['filename']+'.ogg']});
sound.play();
}
}

client.on('connectFailed', function(error) {
    read('cannot connect to server: ' + error.toString());
});

client.on('connect', function(connection) {
    read('Connected');
    current_connection=connection;
    connection.on('error', function(error) {
        read("Connection Error: " + error.toString());
    });
    connection.on('close', function() {
    });
    connection.on('message', function(message) {
        if (message.type === 'utf8') {
            processMessage(message.utf8Data);
        }
    });
});

client.connect('ws://localhost:3000', 'karuta-protocol');

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
current_connection.sendUTF(send);
}
