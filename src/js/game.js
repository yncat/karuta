import {Howl, Howler} from 'howler';

window.game_start=function(){
var sound = new Howl({src: ['sounds/cat.ogg']});
sound.play();
}
