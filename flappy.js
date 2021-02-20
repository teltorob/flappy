const canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

const scoreBoard = document.getElementById("score");
var gameState = false;
var x = 0,
  y = 0;
var gap = 110;

const initialBirdPos = 150;

class Obstruction {
  // A class to create the obstruction of the game- poles
  constructor(x, y, gap) {
    //The pole needs to have a x coordinate to move on the X axis
    this.width = 100;
    this.x = x;
    this.y = y;
    this.gap = gap;
  }

  up_y_start = 0; // Y axis coordinate where the upper pole will start
  up_y_end = y - gap / 2; // Y axis coordinate where the pole will end
  // Fomula used to account for the gap between the poles
  down_y_start = y + gap / 2; // Y axis coordinate where the lower pole will start
  down_y_end = canvas.height - 100; // Y axis coordinate where the lower pole will end

  speed = 5;
  generate(world) {
    if (gameState) {
      var move = setInterval(() => {
        check();
        if (!gameState) clearInterval(move); // ending a game when its over

        //code that clears they bitmap
        ctx.clearRect(
          this.x,
          this.down_y_start,
          this.width,
          this.down_y_end - this.down_y_start
        );
        ctx.clearRect(this.x, this.up_y_start, this.width, this.up_y_end);

        //code to change the x coordinate of the poles, so that it moves.
        this.x -= this.speed;

        //code to redraw the pole with changed coordinate
        ctx.fillStyle = "green";
        ctx.fillRect(this.x, this.up_y_start, this.width, this.up_y_end);
        ctx.fillRect(
          this.x,
          this.down_y_start,
          this.width,
          this.down_y_end - this.down_y_start
        );

        //code to generate another pole after a pole has crossed the bird
        if (this.x == 490) {
          world.generate_poles(world);
        }

        //code to clear the setInterval() from the object(pole) that has left the screen
        if (this.x <= -this.width) {
          clearInterval(move);
        }
      }, 24);
    }
  }
}

class World {
  pole = null;
  generate_ground() {
    const floorHeight = 100;

    var ground = setInterval(function () {
      if (!gameState) clearInterval(ground); // ending a game when its over
      ctx.fillStyle = "brown";
      ctx.fillRect(0, canvas.height - floorHeight, canvas.width, floorHeight);
    }, 24);
  }

  generate_poles(currentWorld) {
    x = 950; //keeps distance between objects
    y = 80 + Math.floor(Math.random() * 240); //randomly generates where the midpoint of gap will lie

    this.pole = new Obstruction(x, y, gap);
    this.pole.generate(currentWorld); //generates a pole with random gap location
  }

  generate_world(currentWorld) {
    if (gameState) {
      this.generate_ground();
      this.generate_poles(currentWorld); // generate poles for current world
    }
  }
}

class Bird {
  constructor() {
    this.currentX = 530;
    this.currentY = initialBirdPos;
    this.targetX = 0;
    this.targetY = 400;
    this.check = false;
    //this.gameOn = false;
  }
  render() {
    if (gameState) {
      this.targetY = 400; // where the birds want to go
      let dy = 2; //speed of bird

      let move = setInterval(() => {
        if (!gameState) clearInterval(move);

        //code to check if the bird has reached the target
        if (
          this.currentY == this.targetY ||
          (this.currentY <= this.targetY && dy < 0)
        ) {
          clearInterval(move);
          this.render();
        }

        //clear the bitmap for the bird motion
        ctx.clearRect(this.currentX, this.currentY, 40, 40);

        //code to check if a bird wants to go up or down
        if (this.currentY > this.targetY && this.check) {
          dy = -2;
          this.check = false;
        }

        this.currentY += dy; // changes the Y coordinate of the bird

        ctx.fillStyle = "orange";
        ctx.fillRect(this.currentX, this.currentY, 40, 40);
      }, 6.5);
    }
  }

  space() {
    // function that makes the bird fly when the space key is pressed
    this.targetY = this.currentY - 50;
    this.check = true;
  }
}

var world = new World();
var bird = new Bird();

document.addEventListener("keydown", keyDownTextField, false); //listens to the pressed key

function keyDownTextField(e) {
  // executes command based on the key pressed
  var keyCode = e.keyCode;
  if (keyCode == 32) {
    //Space bar pressed
    bird.space();
  } else if (keyCode == 13) {
    //Enter key pressed

    gameState = !gameState;
    main();
  } else console.log("Enter valid key");
}

function main() {
  if (gameState) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    bird.currentY = initialBirdPos;
    bird.render();
    world.generate_world(world);
    check();
    set_score();
  }
}

function check() {
  let poleXStart = world.pole.x - 10;
  let poleXEnd = poleXStart + world.pole.width + 10;
  let poleUpYEnd = world.pole.up_y_end;
  let poleDownYStart = world.pole.down_y_start;

  let birdX = bird.currentX;
  let birdUpperY = bird.currentY;
  let birdLowerY = bird.currentY + 40;

  if (
    (birdX >= poleXStart &&
      birdX <= poleXEnd &&
      (birdLowerY >= poleDownYStart || birdUpperY <= poleUpYEnd)) ||
    birdLowerY >= 420
  ) {
    gameState = false;
  }
}

function set_score() {
  let scoreRate = 20;
  let score = 0;
  let scoreCounter = setInterval(function () {
    score++;
    scoreBoard.innerText = score;

    if (!gameState) clearInterval(scoreCounter);
  }, scoreRate);
}
