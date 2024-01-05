/*
Created By Rafael Pitas
©PitasCompany
*/

// Load Audio
let C = new Audio();
let D = new Audio();
let E = new Audio();
let F = new Audio();
let G = new Audio();
let A = new Audio();
let H = new Audio();

C.src = "audio/C.mp3"
D.src = "audio/D.mp3"
E.src = "audio/E.mp3"
F.src = "audio/F.mp3"
G.src = "audio/G.mp3"
A.src = "audio/A.mp3"
H.src = "audio/H.mp3"

// Keys
let k;

$(document).keypress(function(press){
    if(press.wich == 81) $('#C').click();
});


