import {Howl, Howler} from 'howler';
import {sounds} from './soundList'

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
}
