let cvs = document.querySelector('#canvas')
let ctx = cvs.getContext("2d")

let box = 32;
let move;
let score = 0;
let sound = true;

// image 
let ground = new Image()
ground.src = "images/ground.jpg"
let food = new Image()
food.src = "images/food.png"
let gameover = new Image()
gameover.src = "images/gameover.png"

// sound effect
let dead = new Audio()
dead.src = "audio/dead.mp3"

let up = new Audio()
up.src = "audio/up.mp3"

let down = new Audio()
down.src = "audio/down.mp3"

let right = new Audio()
right.src = "audio/right.mp3"

let left = new Audio()
left.src = "audio/left.mp3"

let eat = new Audio()
eat.src = "audio/eat.mp3"

let snake = [];
snake[0] = {
    
    x: 4*32,
    y: 7*32,
}

let foodi = {
    x: Math.floor(Math.random() *17 +1) *box,
    y: Math.floor(Math.random() *15 +3) *box
}

document.addEventListener("keydown", function(e){
    console.log("Key pressed:", e.keyCode);
    if(e.keyCode === 37 && move != "right"){
        if(sound){

            left.play()
        }
        move = "left";
    } 
    else if(e.keyCode === 38 && move != "down"){
        if(sound){

            up.play()
        }
        move = "top";
    } 
    else if(e.keyCode === 39 && move != "left"){
        if(sound){

            right.play()
        }
        move = "right";
    }  
    else if(e.keyCode === 40 && move != "top"){
        if(sound){

            down.play()
        }
        move = "down";
    } 
    console.log(move);
});
// document.addEventListener("keydown", function(e){
//     console.log("Key pressed:", e.key);
//     if(e.key === "ArrowLeft"){
//         move = "left";
//     } 
//     else if(e.key === "ArrowUp"){
//         move = "top";
//     } 
//     else if(e.key === "ArrowRight"){
//         move = "right";
//     } 
//     else if(e.key === "ArrowDown"){
//         move = "down";
//     } 
//     console.log(move);
// });


function draw(){
    // console.log("Drawing snake and food");

    
    for (let i = 0; i < snake.length; i++) {
        if (i === 0) {
            // Head styling
            ctx.fillStyle = "black";
            ctx.fillRect(snake[i].x, snake[i].y, box, box);
            ctx.strokeStyle = "#000000";
            ctx.strokeRect(snake[i].x, snake[i].y, box, box);
        } else {
            // Body styling
            ctx.fillStyle = "yellow";

            // Customize body style with round corners
            roundRect(ctx, snake[i].x, snake[i].y, box, box, 10);

            // Optional: Stroke for rounded rectangle
            ctx.strokeStyle = "#000000";
            ctx.stroke();

            // You can adjust the radius (10 in this example) based on your preference
        }
    }
    // for(let i = 0 ; i < snake.length; i++){
    //   ctx.fillStyle = (i ==0) ? "black":"yellow";
    //   ctx.fillRect(snake[i].x,snake[i].y,box,box)

    //   ctx.strokeStyle = "#000000"
    //   ctx.strokeRect(snake[i].x,snake[i].y,box,box)
    // }
     // snake old position

    let snakeX = snake[0].x
    let snakeY = snake[0].y


    if(move == "left"){
        snakeX-=box;
    }
    else if(move == "top" ){
        snakeY-=box;
    }
    else if(move == "right" ){
        snakeX+=box;
    }
// https://www.youtube.com/watch?v=dZVkd4qhaJU
    else if(move == "down" ){
        snakeY+=box;
    }


    let newHead = {
        y: snakeY,
        x: snakeX
    } 
    if(snakeX==foodi.x && snakeY==foodi.y){
        eat.play()
        score++;
        foodi.x= Math.floor(Math.random() *17 +1) * box;
        foodi.y= Math.floor(Math.random() *15 +3) * box;
    } else{
        snake.pop()

    }

    function collision(head, arrey) {
        for (let i = 0; i < arrey.length; i++) {
            if (head.x === arrey[i].x && head.y === arrey[i].y) {
                return true;
            }
        }
        return false;
    }
    

    // Gameover logic
    if(snakeX<box || snakeX> box*17 || snakeY< box*3 || snakeY > box*17 || collision(newHead,snake)){
        dead.play()
        clearInterval(game)
        ctx.drawImage(gameover,0,0,512,371,cvs.width/2-100,cvs.height/2-100,200,200)

        sound=false;

        // console.log(ctx.drawImage(gameover,0,0,512,371,cvs.width/2-100,cvs.height/2-100,200,200))
    }


    snake.unshift(newHead)

    ctx.fillStyle= "white"
    ctx.font = "40px impact"
    ctx.fillText(score,box*2.2,box*1.6)

    ctx.drawImage(food,0,0,box,box,foodi.x,foodi.y,32,32)

}

function roundRect(ctx, x, y, width, height, radius) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.arcTo(x + width, y, x + width, y + height, radius);
    ctx.arcTo(x + width, y + height, x, y + height, radius);
    ctx.arcTo(x, y + height, x, y, radius);
    ctx.arcTo(x, y, x + width, y, radius);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
}

function loop(){

    ctx.drawImage(ground,0,0,608,608,0,0,608,608)
    draw();
}

let game = setInterval(loop,170)

// function restartGame() {
//     // Reset snake position
//     snake = [{
//         x: 4 * box,
//         y: 7 * box
//     }];

//     // Reset food position
//     foodi = {
//         x: Math.floor(Math.random() * 17 + 1) * box,
//         y: Math.floor(Math.random() * 15 + 3) * box
//     };

//     // Reset score
//     score = 0;

//     // Reset sound variable
//     sound = true;

//     clearInterval(game);
//     console.log("Game interval cleared");


//     // Start a new game loop
//     game = setInterval(loop, 100);
// }

// // Add an event listener for key press or touch
// document.addEventListener("keydown", function (e) {
//     console.log("Key pressed:", e.keyCode);

    
//     if (e.keyCode === 82) {
//         restartGame();
//     }
// });

// document.addEventListener("touchstart", function () {
//     restartGame();
// });



// Existing code...

function restartGame() {
    // Reset snake position
    snake = [{
        x: 4 * box,
        y: 7 * box
    }];

    // Reset food position
    foodi = {
        x: Math.floor(Math.random() * 17 + 1) * box,
        y: Math.floor(Math.random() * 15 + 3) * box
    };

    // Reset score
    score = 0;

    // Reset sound variable
    sound = true;

    clearInterval(game);
    console.log("Game interval cleared");

    // Start a new game loop
    game = setInterval(loop, 170);
}

// Add an event listener for key press or touch
document.addEventListener("keydown", function (e) {
    console.log("Key pressed:", e.keyCode);

    if (e.keyCode === 82 || e.keyCode === 8) {
        restartGame();
    }
});

// document.addEventListener("touchstart", function () {
//     restartGame();
// });

// Add an event listener for back button press
window.onpopstate = function (event) {
    if (event.state && event.state.pageTitle === "gamePage") {
        restartGame();
    }
};

// Update the function that handles back button press
function goBack() {
    history.pushState({ pageTitle: "gamePage" }, "Game Page", "");
}


// Get the arrow buttons
const topBtn = document.querySelector('.top-btn');
const rightBtn = document.querySelector('.right-btn');
const leftBtn = document.querySelector('.left-btn');
const bottomBtn = document.querySelector('.bottom-btn');

// Add click event listeners to the buttons
topBtn.addEventListener('click', function() {
    if(move !== "down") {
        move = "top";
        up.play();
    }
});

rightBtn.addEventListener('click', function() {
    if(move !== "left") {
        move = "right";
        right.play();
    }
});

leftBtn.addEventListener('click', function() {
    if(move !== "right") {
        move = "left";
        left.play();
    }
});

bottomBtn.addEventListener('click', function() {
    if(move !== "top") {
        move = "down";
        console.log(move)
        down.play();
    }
});
