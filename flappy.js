const canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
console.log("canvas spotted");
var gameState= false;
var x=0,y=0;
var gap=100;


class Obstruction 
{
    constructor (x, y, gap) {

        this.width=125;
        this.x= x;
        this.y= y;
        this.gap= gap;

    }

    //world= new World ();

    generate (world) {
        console.log("generate func called");
       // console.log(this.width);

    const up_y_start = 0;
    var up_y_end =this.y-(this.gap/2);

    var down_y_start = this.y+(this.gap/2);
    const down_y_end =canvas.width;

    var speed=2;
     

    var move =setInterval( ()=> {
            // console.log("draw reached");

            check();
             ctx.clearRect(this.x,down_y_start,this.width,down_y_end);
             ctx.clearRect(this.x,up_y_start,this.width,up_y_end);

             this.x -= speed;

             ctx.fillStyle = "black";
             ctx.fillRect(this.x,up_y_start,this.width,up_y_end);
             ctx.fillRect(this.x,down_y_start,this.width,down_y_end);
             
             if (this.x==500)
             {
                 world.generate_poles();
             }
             if(this.x==(-this.width))
             {
                 clearInterval(move);
             }

             },24)
    console.log('done');

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

class World 
{
    pole=null;
    generate_ground()
    {
        const floorHeight= 20;
        ctx.fillStyle ="brown";
        ctx.fillRect(0, (canvas.height-floorHeight),canvas.width, floorHeight);
    }

    generate_poles()
    {
        x = 950; //keeps adding the distance between object
        y = 80 + Math.floor(Math.random() * 340); //randomly generates where the midpoint of gap will lie
        console.log(x,y);
        let pole = new Obstruction (x, y, gap);
        pole.generate();

        this.pole= pole;
       // console.log("Pole created");
    }

    generate_world()
    {
        console.log("Generating World");
        if(gameState)
        {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            this.generate_poles();
    
        }

    }
}

class Bird {
  constructor() {
    this.currentX = 200;
    this.currentY = 150;
    this.targetX = 0;
    this.targetY = 400;
    this.check = false;
    //this.gameOn = false;
  }
  render() {
    this.targetY = 400;

    let dy = 6;
    let move = setInterval(() => {
      if (
        this.currentY == this.targetY ||
        (this.currentY <= this.targetY && dy < 0)
      ) {
        clearInterval(move);
        this.render();
      }

      if (this.currentY >= 400) {
        clearInterval(move);
      }
      ctx.clearRect(this.currentX, this.currentY, 40, 40);

      if (this.currentY > this.targetY && this.check) {
          dy = -10;
          this.check = false;
        }
        
        this.currentY += dy;
        
      ctx.fillStyle = "black";
      ctx.fillRect(this.currentX, this.currentY, 40, 40);
    }, 24);
  }

  space() {
    this.targetY = this.currentY - 80;
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
        bird.space()
        console.log(bird.currentY)
        
    } else if (keyCode == 13) {
    gameState=!gameState;
    bird.render();
    world.generate_world();
    check();

    
  } else console.log("Enter valid key");
}
function check()
{
    tempX=world.pole.x;
    if (tempX==500)
    console.log("This is poles x coordinate" + world.pole.x);

}