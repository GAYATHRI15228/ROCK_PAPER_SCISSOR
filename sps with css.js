let score = JSON.parse(localStorage.getItem('score')) || {
    win: 0,
    lose: 0,
    draw: 0
};
document.body.addEventListener('keydown',(event)=>{
    if(event.key==='r'){
        ourpick('Rock');
    } else if(event.key==='p'){
        ourpick('Paper');
    } else if(event.key==='s'){
        ourpick('Scissor');
    }
});
function pick() {
    const random = Math.random();
    let computer = '';
    if (random < 1/3) {
        computer = 'Rock';
    } else if (random < 2/3) {
        computer = 'Paper';
    } else {
        computer = 'Scissor';
    }
    return computer;
}

let isautoplay = false;
let intervalid;
function autoplay(){
    if(!isautoplay){
        intervalid=setInterval(function(){
            const player = pick();
            ourpick(player);
        },1000);
        isautoplay=true;
    }
    else{
        clearInterval(intervalid);
        isautoplay=false;
    }
}

function ourpick(player) {
    const computer = pick();
    let result = '';
    switch (player) {
        case 'Rock':
            result = computer === 'Rock' ? 'draw' : computer === 'Scissor' ? 'win' : 'lose';
            break;
        case 'Paper':
            result = computer === 'Rock' ? 'win' : computer === 'Paper' ? 'draw' : 'lose';
            break;
        case 'Scissor':
            result = computer === 'Rock' ? 'lose' : computer === 'Scissor' ? 'draw' : 'win';
            break;
    }
    updateScore(result);
    document.querySelector('.js-move').innerHTML = `you <img src="image/${player}.png" class="move-icon">  <img src="image/${computer}.png" class="move-icon"> computer`;
    return result;
}

function updateScore(result) {
    switch (result) {
        case 'win':
            score.win++;
            break;
        case 'lose':
            score.lose++;
            break;
        case 'draw':
            score.draw++;
            break;
    }
    localStorage.setItem('score', JSON.stringify(score));
    updateScoreDisplay();
    document.querySelector('.js-result').innerHTML = result;
}

function updateScoreDisplay() {
    document.querySelector('.js-score').innerHTML = `Win: ${score.win}, Lose: ${score.lose}, Draw: ${score.draw}`;
}

document.addEventListener('DOMContentLoaded', () => {
    updateScoreDisplay();

    document.getElementById('rock').addEventListener('click', () => {
        const computer = pick();
        const result = ourpick('Rock');
        console.log(`Computer choice: ${computer}. Your choice: Rock. Result: ${result}`);
    });

    document.getElementById('paper').addEventListener('click', () => {
        const computer = pick();
        const result = ourpick('Paper');
        console.log(`Computer choice: ${computer}. Your choice: Paper. Result: ${result}`);
    });

    document.getElementById('scissor').addEventListener('click', () => {
        const computer = pick();
        const result = ourpick('Scissor');
        console.log(`Computer choice: ${computer}. Your choice: Scissor. Result: ${result}`);
    });

    document.getElementById('reset').addEventListener('click', () => {
        score = {
            win: 0,
            lose: 0,
            draw: 0
        };
        localStorage.removeItem('score');
        updateScoreDisplay();
    });
});