

var character = document.getElementById("character");
var block = document.getElementById("block");
var block2 = document.getElementById("block2");
var block3 = document.getElementById("block3");

let displayscore = document.getElementById('score');
let score =0;

function jump(){
    if(character.classList == "animate"){return}
    character.classList.add("animate");
    setTimeout(function(){
        character.classList.remove("animate");
    },500);
}
var checkDead = setInterval(function() {
    let characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
    let blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));
    if(blockLeft<20 && blockLeft>-20 && characterTop>=190){
        block.style.animation = "none";
        alert("Game Over. score: "+score);
      
        
        score=0;
        block.style.animation = "block 6s infinite linear";
    }
}, 10);
var checkDead = setInterval(function() {
    let characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
    let block2Left = parseInt(window.getComputedStyle(block2).getPropertyValue("left"));
    if(block2Left<30 && block2Left>-30 && characterTop>=190){
        block2.style.animation = "none";
        alert("Game Over. score: "+score);
       
        score=0;
        block2.style.animation = "block2 6s infinite linear";
    }
}, 10);
var checkDead = setInterval(function() {
    let characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
    let block3Left = parseInt(window.getComputedStyle(block3).getPropertyValue("left"));
    if(block3Left<20 && block3Left>-20 && characterTop>=190){
        block3.style.animation = "none";
        alert("Game Over. score: "+score);
        prompt("Rate this Game out of 10");
        score=0;
        block3.style.animation = "block3 6s infinite linear";
    }
}, 10);

function Showscore(){
    score++;
    displayscore.innerText = score;

}
setInterval(Showscore,50);


