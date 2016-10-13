console.log('Game board is populated');

var canvas = document.querySelector('#enemies');
var ctx2 = canvas.getContext('2d');
var enemiesList = [];
var objectivesList = []; //this is new
var raf;

// This is a random number generator

function enemyRange(min, max) {
    var value = Math.random()*(max-min) + min;
    return Math.round(value);
}

// This is the constructor

function Enemy(x, y, wh, xSpeed, ySpeed, damage) {
    this.x = x;
    this.y = y;
    this.wh = wh;
    this.xSpeed = xSpeed;
    this.ySpeed = ySpeed;
    this.damage = damage;
    this.draw = function() {
        ctx2.fillStyle = 'aqua';
        ctx2.fillRect(this.x, this.y, this.wh, this.wh);
    }
}

for (j=0; j < 7; j++) {
    enemiesList.push(new Enemy(enemyRange(50,400), enemyRange(50,400), 50, enemyRange(2,3), enemyRange(2,3), 1));
}

function drawEnemies(){
    for (j=0; j < 7; j++) {
        enemiesList[j].draw();
    }
}

// This is animating the enemies

function animateEnemies() {
    for (var i=0; i < enemiesList.length; i++) {
    enemiesList[i].x += enemiesList[i].xSpeed;
    enemiesList[i].y += enemiesList[i].ySpeed;

    }
}

// This detects collision between enemy squares and the board

function detectCollision(){

    for(j=0; j < enemiesList.length; j++) {

        if (enemiesList[j].y + enemiesList[j].ySpeed + 50 > 500 ||
            enemiesList[j].y + enemiesList[j].ySpeed <= 0 ||
            enemiesList[j].y + enemiesList[j].ySpeed - 50 > 500 ||
            enemiesList[j].y + enemiesList[j].ySpeed < 0 ) {
            // console.log('y collision is working');
            enemiesList[j].ySpeed = -enemiesList[j].ySpeed;
        }

        if (enemiesList[j].x + enemiesList[j].xSpeed + 50 > 500 ||
            enemiesList[j].x + enemiesList[j].xSpeed <= 0 ||
            enemiesList[j].x + enemiesList[j].xSpeed > 500 ||
            enemiesList[j].x + enemiesList[j].xSpeed < 0) {
            // console.log('x collision is working');
            enemiesList[j].xSpeed = -enemiesList[j].xSpeed;
        }
    }
}

// These are the functions for the objectives

function objectiveRange(min, max) {
    var value = Math.random()*(max-min) + min;
    return Math.round(value);
}

// This is the constructor for the objectives

function Objective(x, y, r){
    this.x = x;
    this.y = y;
    this.r = r;
    this.draw = function() {
        ctx2.beginPath();
        ctx2.arc(this.x, this.y, this.r, 0, 2 * Math.PI, true);
        // x-cor, y-cor, radius, starting angle 0 is 3'oclock, end angle
        // true or false is clockwise or counterclockwise
        ctx2.fillStyle = 'magenta';
        ctx2.fill();
        ctx2.shadowBlur = 10;
    }
}

// This is creating the objectives and pushing it into the array

for(var i=0; i < 10; i++) {
    objectivesList.push(new Objective(objectiveRange(1, 400), objectiveRange(1,400), 5));
}

function drawObjectives(){
    for(var i = 0; i < objectivesList.length; i++){
        objectivesList[i].draw();
    }
}

// This is drawing both objects ultimately

function draw() {
    drawObjectives();
    drawEnemies();
    animateEnemies();
    ctx2.fillStyle = 'rgba(102,54,232, 0.3)';
    ctx2.fillRect(0, 0, 500, 500);
    raf = window.requestAnimationFrame(draw);
    detectCollision();
}

draw();