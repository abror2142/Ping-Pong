const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
const reset = document.getElementById('resetBtn');
const scoreText = document.getElementById('scoreText')
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;
const paddle1Color = 'red';
const paddleBorder = 'black';
const paddle2Color = 'lightblue';
const boardColor = 'forestgreen'
const ballColor = 'yellow';
const ballRadius = 12.5;
let intervalID
let ballSpeed=0;
let player1Score = 0;
let player2Score = 0; 
let ballX = canvasWidth/2;
let ballY = canvasHeight/2;
let ballXDirection = 0;
let ballYDirection = 0;
let paddle1 = {
    x: 0,
    y: 0,
    width: 25,
    height: 100,
}
let paddle2 = {
    x: canvasWidth-25,
    y: canvasHeight-100,
    width: 25,
    height: 100,
}

var x = 100, y = 100;
ctx.fillStyle = "black";
ctx.fillRect(700, 100, 100, 100);

window.addEventListener('keydown', changeDirection);
reset.addEventListener('click', resetGame);

gameStart();
drawBall()

function gameStart(){
    createBall();
    nextTick();
};
function nextTick(){
    intervalID = setTimeout(()=>{
        clearBoard();
        drawPaddles();
        moveBall();
        drawBall(ballX, ballY);
        checkCollision();
        nextTick();
    })
};
function clearBoard(){
    ctx.fillStyle = boardColor;
    ctx.fillRect(0,0,canvasWidth,canvasHeight)
};
function createBall(){
    ballSpeed = 0.5;
    if(Math.round(Math.random()) == 1){
        ballXDirection = 1;
    }
    else{
        ballXDirection = -1;
    }
    if(Math.round(Math.random()) == 1){
        ballYDirection = 1;
    }
    else{
        ballYDirection = -1;
    }
    ballX = canvasWidth/2;
    ballY = canvasHeight/2;
    drawBall(ballX, ballY)
};
function moveBall(){
    ballX += (ballSpeed * ballXDirection);
    ballY += (ballSpeed * ballYDirection);
};
function drawBall(ballX, ballY){
    ctx.fillStyle = ballColor;
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, Math.PI*2)
    ctx.fill();
};

function drawPaddles(){
    ctx.lineWidth = 3
    ctx.strokeStyle = paddleBorder
    ctx.fillStyle = paddle1Color;
    ctx.fillRect(paddle1.x, paddle1.y, paddle1.width, paddle1.height);
    ctx.strokeRect(paddle1.x, paddle1.y, paddle1.width, paddle1.height);
    ctx.fillStyle = paddle2Color;
    ctx.fillRect(paddle2.x, paddle2.y, paddle2.width, paddle2.height);
    ctx.strokeRect(paddle2.x, paddle2.y, paddle2.width, paddle2.height);
};
function changeDirection(event){
    const keyPressed = event.keyCode
    const player1Up = 87;
    const player1Down = 83;
    const player2Up = 38;
    const player2Down = 40
    switch(true){
        case(keyPressed == player1Up):
            if(paddle1.y > 0){
                paddle1.y -= 50;
            }
            break;
        case(keyPressed == player1Down):
            if(paddle1.y < canvasHeight - 100){
                paddle1.y += 50;
            }
            break;
        case(keyPressed == player2Up):
            if(paddle2.y > 0){
                paddle2.y -= 50;
            }
            break;
        case(keyPressed == player2Down):
            if(paddle2.y < canvasHeight - 100){
                paddle2.y += 50;
            }
            break;
    }
};
function checkCollision(){
    if(ballY <= 0 + ballRadius){
       ballYDirection *= -1 
    }
    else if(ballY >= canvasHeight - ballRadius){
        ballYDirection *= -1 
    }
    if(ballX <= 0){
        player2Score ++;
        updateScore();
        createBall();
        return;
    }
    else if(ballX >= canvasWidth){
        player1Score ++;
        updateScore();
        createBall();
        return;
    }
    if(ballX <= (paddle1.x + ballRadius + paddle1.width)){
        if(ballY > paddle1.y && ballY < paddle1.y +paddle1.height){
            ballX = (paddle1.x + paddle1.width) + ballRadius;
            ballXDirection *= -1;
            ballSpeed+=0.05;
        }
    }
    if(ballX >= (paddle2.x - ballRadius)){
        if(ballY > paddle2.y && ballY < paddle2.y + paddle2.height){
            ballX = paddle2.x - ballRadius;
            ballXDirection *= -1;
            ballSpeed +=0.05;
        }
    }
};
function updateScore(){
    scoreText.textContent = `${player1Score}:${player2Score}`
};
function resetGame(){
    ballXDirection=0;
    ballYDirection=0;
    player1Score =0;
    player2Score =0;
    paddle1 = {
        x: 0,
        y: 0,
        width: 25,
        height: 100,
    }
    paddle2 = {
        x: canvasWidth-25,
        y: canvasHeight-100,
        width: 25,
        height: 100,
    }
    ballSpeed=0
    updateScore();
    clearInterval(intervalID);
    gameStart()  
};
