const canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
console.log("canvas spotted");
var gameState= false;
var x=0, y=0;
var gap=100;


class Obstruction 
{
    constructor (x, y, gap) {

        this.width=125;
        this.x= x;
        this.y= y;
        this.gap= gap;

    }

    generate () {
        console.log("generate func called");
        console.log(this.width);

    const up_y_start = 0;
    var up_y_end =this.y-(this.gap/2);

    var down_y_start = this.y+(this.gap/2);
    const down_y_end =canvas.width;



    ctx.fillStyle = "black";
    ctx.fillRect(this.x,up_y_start,this.width,up_y_end);
    ctx.fillRect(this.x,down_y_start,this.width,down_y_end);  

    console.log('done');
    }

}







function play()
{
while (gameState)
{
    console.log("game started");
    generate_poles();
    gameState=false;
}
}














function start_game ()
{
    //code here to start the game
    gameState=true;
    ctx.clearRect(0,0,canvas.width, canvas.height);
    play();

}

function generate_poles()
{
   var numberOfObstruction= 1+ Math.floor(Math.random() * 3);
   var gapBetweenObstruction = canvas.width / numberOfObstruction; //imaginary equal partitions 
   x = -gapBetweenObstruction/2 // this ensures object get formed at the midpoint of their respective partition

   /*console.log("generate poles called");
   console.log(numberOfObstruction);
   console.log(canvas.width);
   console.log(gapBetweenObstruction);*/




   for (var i = 1 ; i <= numberOfObstruction ; i++)
   {
        console.log("for loop entered");
        x = x+ gapBetweenObstruction; //keeps adding the distance between object
        y = 80 + Math.floor(Math.random() * 340); //randomly generates where the midpoint of gap will lie

        console.log(x,y);

        let pole = new Obstruction (x, y, gap);
        pole.generate();

   }


}