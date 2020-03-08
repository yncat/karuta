import {Howl, Howler} from 'howler';

export function init(){
var sound = new Howl({src: ['sounds/cat.ogg']});
sound.play();
}
