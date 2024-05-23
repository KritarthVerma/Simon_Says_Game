let gameSeq = [];
let userSeq = [];
let btns = ["yellow","red","blue","green"];

let started = false;
let level = 0;
let highScore = 0;
let currScore = 0;

let h2 = document.querySelector(".message");
let currScoreHeading = document.querySelector(".current-score");
let highScoreHeading = document.querySelector(".highest-score")

document.addEventListener("keypress",function (){
    if(started==false){
        started = true;
        levelUp();
    }
})

function gameFlash(btn){
    if(btn.classList[1]=="green"){
        btn.classList.add("green-flash");
        setTimeout(function(){
            btn.classList.remove("green-flash");
        }, 250);
    } else if(btn.classList[1]=="yellow"){
        btn.classList.add("yellow-flash");
        setTimeout(function(){
            btn.classList.remove("yellow-flash");
        }, 250);
    } else if(btn.classList[1]=="blue"){
        btn.classList.add("blue-flash");
        setTimeout(function(){
            btn.classList.remove("blue-flash");
        }, 250);
    } else if(btn.classList[1]=="red"){
        btn.classList.add("red-flash");
        setTimeout(function(){
            btn.classList.remove("red-flash");
        }, 250);
    }
}

function levelUp(){
    currScore++;
    if(currScore>highScore)highScore++;
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;
    currScoreHeading.innerText = `Current Score : ${currScore-1}`;
    highScoreHeading.innerText = `Highest Score : ${highScore-1}`;
    let randIdx = Math.floor(Math.random() * 3);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    gameFlash(randBtn);
}

function btnPress(){
    let btn = this;
    userSeq.push(btn.getAttribute("id"));
    checkSeq(userSeq.length-1,btn);
}

let allBtns = document.querySelectorAll(".btn");

for(btn of allBtns){
    btn.addEventListener("click",btnPress)
}

function checkSeq(idx,btn){
    if(userSeq[idx]==gameSeq[idx]){
        gameFlash(btn);
        if(userSeq.length == gameSeq.length){
            setTimeout(levelUp,1000);
        }
    } else {
        gameFlash(btn);
        h2.innerHTML = `<b style="color:red;">Game Over!</b> Your score was : ${level-1}<br>Press any key to restart.`;
        currScoreHeading.innerText = "";
        highScoreHeading.innerText = "";
        reset();
    }
}

function reset(){
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
    currScore = 0;
}