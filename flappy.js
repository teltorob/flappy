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

    world = new World(10,1);

    generate () {
        console.log("generate func called");
        console.log(this.width);

    const up_y_start = 0;
    var up_y_end =this.y-(this.gap/2);

    var down_y_start = this.y+(this.gap/2);
    const down_y_end =canvas.width;

    var speed=1;


    var move =setInterval( ()=> {
             //console.log(this.x);

             ctx.clearRect(this.x,down_y_start,this.width,down_y_end);
             ctx.clearRect(this.x,up_y_start,this.width,up_y_end);

             this.x -= speed;

             ctx.fillStyle = "black";
             ctx.fillRect(this.x,up_y_start,this.width,up_y_end);
             ctx.fillRect(this.x,down_y_start,this.width,down_y_end);
             
             if (this.x>500)
             {
                 this.world.generate_poles();
             }
             if(this.x==(-this.width))
             {
                 clearInterval(move);
             }

             },20)
    console.log('done');

}

}







function play()
{
    var world= new World (10,1);
    world.generate_poles();
   // while (gameState)
   // { 
   // }
}



function start_game ()
{
    //code here to start the game
    if(!gameState)
     {gameState=true;
      ctx.clearRect(0,0,canvas.width, canvas.height);
      play();}

}

class World 
{
    poleX=0;
    
    constructor(gravity, level)
    {
        this.gravity=gravity;
        this.level=level;
    }


    

    generate_ground()
    {
        const floorHeight= 20;
        ctx.fillStyle ="brown";
        ctx.fillRect(0, (canvas.height-floorHeight),canvas.width, floorHeight);
    }

    generate_poles()
    {

       /*console.log("generate poles called");
       console.log(numberOfObstruction);
       console.log(canvas.width);
       console.log(gapBetweenObstruction);*/


        x = 950; //keeps adding the distance between object
        y = 80 + Math.floor(Math.random() * 340); //randomly generates where the midpoint of gap will lie
        console.log(x,y);
        let pole = new Obstruction (x, y, gap);
        pole.generate();
        console.log("Pole created");
    




    }
}

class Bird
{
    constructor(length, breadth, mass, initialX, initialY)
    {
        this.length= length;
        this.breadth= breadth;
        this.mass=mass;
        this.initialX=initialX;
        this.initialY=initialY;
    }

    posX =0;
    posY =0;
    initialVelocity=0;

    render()
    {
        console.log(gravity);
        this.posX = this.initialX;
        this.posY= this.initialY;
        ctx.fillStyle= "orange";
        ctx.fillRect(posX, posY, this.breadth, this.length);

    }

    fly(force)
    {
        var acceleration = gravity - (force/this.mass);
        var velocity= initialVelocity + acceleration*1;

        var move =setInterval( (force)=> {
            //console.log(this.x);

            ctx.clearRect(this.posX,this.posY, this.breadth, this.length);

            this.posY += velocity;

            ctx.fillStyle = "orange";
            ctx.fillRect(this.posX,this.posY, this.breadth, this.length);

            velocity= velocity + (gravity*0.2)
            if (velocity==0)
            {
                clearTimeout(move);
            }

            if (force>0)
            { 
                clearTimeout(move);
            }

            },20)



    }
    
}