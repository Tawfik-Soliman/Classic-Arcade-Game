// Enemies our player must avoid
const Enemy = function(x,y,speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x=x;   // x-position
    this.y=y;   // y-position
    this.speed=speed;   // speed
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x < 500) { // enemy exit the canvas

    this.x += this.speed * dt; // new enemy position with dt multipled in enemy speed
    }
    else {
        this.x =-100; // Enemy enter the canvas
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// var Player = function() {
//     this.x = 0;
//     this.y = 0;
//     this.sprite = 'images/char-boy.png';
// };

// // Draw the enemy on the screen, required method for game
// Player.prototype.render = function() {
//     ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
// };

let winCounter = document.querySelector('.wins'); // Declare Win counter 
let hearts = document.querySelector('.hearts'); //Declare lives
const enemy1 = new Enemy(-100,83,400); //declare enemy one
const enemy2 = new Enemy(100,166,700); // declare enemy two
const enemy3 = new Enemy(200,249,200); // declare enemy three
const enemy4 = new Enemy(400,249,200); // declare enemy four
let allEnemies = []; // delcalre allEnemies Array
allEnemies.push(enemy1); //Add enemy to allEnemies Array
allEnemies.push(enemy2);
allEnemies.push(enemy3);
allEnemies.push(enemy4);
let i = 0; //index of playerImages array
// Array contain differnt images for player
const playerImages = ['images/char-boy.png','images/char-cat-girl.png','images/char-horn-girl.png',
                      'images/char-pink-girl.png','images/char-princess-girl.png']

// player costructor class
class Player {
    constructor () {
        this.x = 202;  //player reset x
        this.y = 415;  // player reset y
        this.wins = 0;
        this.lives = 5;
        this.sprite = 'images/char-boy.png';
    }
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    reset() { // reset player
        this.x=202;
        this.y=415;

    }
    update() {
        
        if (this.y == 0) {  //when player reach water
                this.wins ++; //increase win counter
                winCounter.innerText = this.wins;
                this.reset(); // reset player
                allEnemies.forEach(function(enemy) { // increase the speed of enemy with every win
                enemy.speed *= 1.2;
                });

                switch(this.wins) { // change player image with every win
                    case 1 :
                    this.sprite = 'images/char-cat-girl.png';
                    break;
                    case 2 :
                    this.sprite = 'images/char-horn-girl.png';
                    break;
                    case 3 :
                    this.sprite = 'images/char-pink-girl.png';
                    break;
                    case 4 :
                    this.sprite = 'images/char-princess-girl.png';
                }

                if (this.wins === 5) { //show win modal
                    toggleModalWin();
                }
            }
        for (let enemy of allEnemies){
            if (this.y == enemy.y) { // check for collision
                    if((this.x - enemy.x >60 && this.x - enemy.x <70 ) || (enemy.x - this.x >0 && enemy.x - this.x <70 )){
                      this.lives --; // decrese lives when collision occur
                      hearts.lastElementChild.remove();
                      if (this.lives ===0) {
                        toggleModalLoose(); //show loose modal
                      }
                      this.reset();  // reset player
                    }
            }
            
        
        }
    }

    handleInput(key){
        if (this.wins <5 && this.lives!==0) { // keys stop when lives are out or player win
        
            switch(key) {
                case 'left':
                    if (this.x > 100) {
                    this.x -=101;  // step to left
                    }
                    break; 
                case 'up':
                    if (this.y >82) {
                    this.y -=83;  // step up
                    }   
                    break; 
                case 'right':
                    if(this.x < 404) {
                    this.x +=101;  // step right
                    }
                    break; 
                case 'down':
                    if (this.y < 400) {
                    this.y +=83;  // step down
                    }
                    break; 
                case 'ctrl':  // ctrl change player image
                    i++; // increase index with ctrl key
                    this.sprite = playerImages[i];
                    if (i === 4) {
                        i= -1; 
                    }
                    break;



            }
        }    
    }
}



const player = new Player();  // create player
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        17: 'ctrl'  // add ctrl key to change player image
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

var modalWin = document.querySelector(".modal");
var closeButton = document.querySelector(".close-button");
closeButton.addEventListener("click", toggleModalWin);  //Adding listener to the modal close button


function toggleModalWin() {
    modalWin.classList.toggle("show-modal");
}

var modalLoose = document.querySelector(".modalLoose");
var closeButtonLoose = document.querySelector(".close-buttonLoose");
closeButtonLoose.addEventListener("click", toggleModalLoose);  //Adding listener to the modal close button


function toggleModalLoose() {
    modalLoose.classList.toggle("show-modalLoose");
}