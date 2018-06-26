//Definir pincel
var canvas =document.getElementById("canvas");
var ctx=canvas.getContext("2d");
//PRUEBA////ctx.fillRect(20,20,300,300)

//Variables Constantes
var interval;
var frames=0;
var images=
    {
        fondo:"./imagenes/sin_luz.png",
        nubesita:"./imagenes/nubesita.png",
        arbolito_1:"./imagenes/Arbol_grande.png",
        avion:"./imagenes/avioncito.png",
        semilla1:"./imagenes/semilla.png"
    }

//Funciones

class back
{
    constructor()
    {
        this.x = 0;
        this.y = 0;
        this.width = canvas.width;
        this.height = canvas.height;
        this.image = new Image();
        this.image.src = images.fondo;
        this.image.onload = function(){
            this.draw();
        }.bind(this)
    }

    draw()
    {
        this.x--;
        if(this.x === -this.width) this.x = 0;
        ctx.drawImage(this.image, this.x,this.y,this.width,this.height);
        ctx.drawImage(this.image, this.x + this.width,this.y,this.width,this.height);
        //ctx.fillStyle = "white";
        //ctx.font = '50px Avenir';
        //ctx.fillText(Math.floor(frames / 60), this.width -100, 50 )
    }
}

class avion
{
    constructor()
    {
        this.x=768;
        this.y=30;
        this.width=100;
        this.height=75;
        this.der=+10;
        this.izq=-10;
        this.dispara=[]
        this.image=new Image();
        this.image.src=images.avion;
        this.image.onload=function()
        {
            this.draw();
        }.bind(this)
    }

    avionDer()
    {
        
        this.x+=this.der;
    }
    avionIzq()
    {
        console.log("casi")
        this.x+=this.izq;
       
    }

    draw()
        {
            ctx.drawImage(this.image, this.x,this.y,this.width,this.height);
        }
    
}

class semilla
{
    constructor(as)
    {
        this.width=35;
        this.height=50;
        this.x=as.x+as.width/2-this.width;
        this.y=as.y+this.height;
        this.image=new Image();
        this.vY=+1;
        this.image.src=images.semilla1;
        this.image.onload=function()
        {
            this.draw();
        }.bind(this);
    }

    draw()
    {
        this.y+=this.vY;
        ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
    }
}
//instancias

var fondito=new back();
var avioncito=new avion();
//var semillita=new semilla(canvas.width/2,canvas.height-60);

//Mains
function update()
    {
        frames++;
        //console.log(frames);
        ctx.clearRect(0,0,canvas.width,canvas.height);
        fondito.draw();
        avioncito.draw();
        //semillita.draw();
        drawSemi();
    }

function start()
    {
        if(interval) return;
        interval = setInterval(update, 1000/60);
       // ctx.arbolito_1;
    }
//Funciones auxiliares

function generarSemilla()
{
    var semi=new semilla(avioncito)
    avioncito.dispara.push(semi);
}

function drawSemi()
{
    avioncito.dispara.forEach(function(b) {
        b.draw();
    });
}

//escuchadores



addEventListener("keydown",function(e)
{
    //console.log("jajajajaj")
    if(e.keyCode===37)
    {
        //console.log("izq");
        avioncito.avionIzq();
        
    }
    if(e.keyCode===39)
    {
        //console.log("sider");
        avioncito.avionDer();
       
    }
    if(e.keyCode===32)
    {
        generarSemilla();
    }
});
start();