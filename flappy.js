const canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
console.log("canvas spotted");
var gameState = false;
var x = 0,
  y = 0;
var gap = 130;

class Obstruction {
  constructor(x, y, gap) {
    this.width = 100;
    this.x = x;
    this.y = y;
    this.gap = gap;
  }

  //world= new World ();

  up_y_start = 0;
  up_y_end = y - gap / 2;

  down_y_start = y + gap / 2;
  down_y_end = canvas.width;

  speed = 5;
  generate(world) {
    if (gameState) {
      console.log("generate func called");
      console.log(world);

      //const up_y_start = 0;
      //var up_y_end = this.y - this.gap / 2;
      //
      //var down_y_start = this.y + this.gap / 2;
      //const down_y_end = canvas.width;
      //
      //var speed = 2;
      //
      var move = setInterval(() => {
        //console.log(this.down_y_start);

        check();
        if (!gameState) clearInterval(move);
        ctx.clearRect(this.x, this.down_y_start, this.width, this.down_y_end);
        ctx.clearRect(this.x, this.up_y_start, this.width, this.up_y_end);

        this.x -= this.speed;

        ctx.fillStyle = "black";
        ctx.fillRect(this.x, this.up_y_start, this.width, this.up_y_end);
        ctx.fillRect(this.x, this.down_y_start, this.width, this.down_y_end);

        if (this.x == 490) {
          world.generate_poles(world);
        }
        if (this.x <= -this.width) {
          clearInterval(move);
        }
      }, 24);
      console.log("done");
    }
  }
}

//function start_game ()
//{
//    //code here to start the game
//    if(!gameState)
//     {gameState=true;
//      ctx.clearRect(0,0,canvas.width, canvas.height);
//      play();}
//
//}

class World {
  pole = null;
  generate_ground() {
    const floorHeight = 20;
    ctx.fillStyle = "brown";
    ctx.fillRect(0, canvas.height - floorHeight, canvas.width, floorHeight);
  }

  generate_poles(object) {
    x = 950; //keeps adding the distance between object
    y = 80 + Math.floor(Math.random() * 280); //randomly generates where the midpoint of gap will lie
    //console.log(x, y);
    this.pole = new Obstruction(x, y, gap);
    this.pole.generate(object);

    // console.log("Pole created");
  }

  generate_world(object) {
    console.log("Generating World" + object);
    if (gameState) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      this.generate_poles(object);
    }
  }
}

class Bird {
  constructor() {
    this.currentX = 530;
    this.currentY = 150;
    this.targetX = 0;
    this.targetY = 400;
    this.check = false;
    //this.gameOn = false;
  }
  render() {
    if (gameState) {
      this.targetY = 400;
      let dy = 2;
      let move = setInterval(() => {
        if (!gameState) clearInterval(move);

        if (
          this.currentY == this.targetY ||
          (this.currentY <= this.targetY && dy < 0)
        ) {
          clearInterval(move);
          this.render();
        }

        ctx.clearRect(this.currentX, this.currentY, 40, 40);

        if (this.currentY > this.targetY && this.check) {
          dy = -2;
          this.check = false;
        }

        this.currentY += dy;

        ctx.fillStyle = "black";
        ctx.fillRect(this.currentX, this.currentY, 40, 40);
      }, 6.5);
    }
  }

  space() {
    this.targetY = this.currentY - 50;
    this.check = true;
  }

  //  enter() {
  //    gameState = !gameState;
  //    this.render();
  //  }
}
var bird = new Bird();
var world = new World();

document.addEventListener("keydown", keyDownTextField, false);
function keyDownTextField(e) {
  var keyCode = e.keyCode;
  if (keyCode == 32) {
    //Space bar pressed
    bird.space();
    //  console.log(bird.currentY);
  } else if (keyCode == 13) {
    gameState = !gameState;
    bird.render();
    world.generate_world(world);
    check();
  } else console.log("Enter valid key");
}
function check() {
  let poleXStart = world.pole.x - 5;
  let poleXEnd = poleXStart + world.pole.width - 5;
  let poleUpYEnd = world.pole.up_y_end;
  let poleDownYStart = world.pole.down_y_start;

  let birdX = bird.currentX;
  let birdUpperY = bird.currentY;
  let birdLowerY = bird.currentY + 40;

  if (birdX >= poleXStart && birdX <= poleXEnd) {
    console.log("Condition 1 applied");
  }

  if (birdUpperY <= poleUpYEnd) console.log("condition 2 satisfied");
  if (
    (birdX >= poleXStart &&
      birdX <= poleXEnd &&
      (birdLowerY >= poleDownYStart || birdUpperY <= poleUpYEnd)) ||
    birdLowerY >= 420
  ) {
    //console.log(tempX);
    console.log("end");
    gameState = false;
  }
}
