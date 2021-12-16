//Las imagenes no se cargan como sprite, se cargan en cada una de las carpetas "this.image" y se llama en la carpeta BaseClass que lo tarae a pantalla
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var motor, mundo;
var caja1, caja2, caja3, caja4, caja5, caja6;
var piso1, piso2, piso3, piso4;
var pig1, pig2, pig3;
var backgroundImg;
var ave_bird;
var cadena_Ave;
var plataforma;
var estado = "inicio";
var puntaje = 0;

function preload() {
  if (hour() >= 06 && hour() <= 18) {
    backfondo = "bg.png";
  } else {
    backfondo = "bg2.jpg";
  }
  fondo = loadImage(backfondo);
}

function setup() {
  var canvas = createCanvas(1000, 400);
  motor = Engine.create();
  mundo = motor.world;
  console.log(hour());
  ground = new Piso(600, height, 1200, 20);

  caja1 = new Caja(700, 320, 70, 70);
  caja2 = new Caja(920, 320, 70, 70);
  pig1 = new Pig(810, 350);
  base1 = new Tronco(810, 260, 300, PI / 2);

  caja3 = new Caja(700, 240, 70, 70);
  caja4 = new Caja(920, 240, 70, 70);
  pig3 = new Pig(810, 220);

  base2 = new Tronco(810, 180, 300, PI / 2);

  caja5 = new Caja(810, 160, 70, 70);
  base3 = new Tronco(760, 120, 150, PI / 7);
  base5 = new Tronco(870, 120, 150, -PI / 7);
  bird = new Bird(100, 100);

  plataforma = new Piso(180, 355, 320, 70);
  base6 = new Tronco(230, 180, 80, PI / 2);
  cadena_ave = new Cadena(bird.body, { x: 300, y: 150 });
}

function draw() {
  background(fondo);
  Puntaje_pig();
  Engine.update(motor);
  strokeWeight(4);
  caja1.display();
  caja2.display();
  ground.display();
  pig1.display();
  base1.display();

  caja3.display();
  caja4.display();
  pig3.display();
  base2.display();

  pig1.puntaje();
  pig3.puntaje();
  caja5.display();
  base3.display();
  base5.display();

  plataforma.display();
  bird.display();
  //base6.display();
  cadena_ave.display();
}

function mouseDragged() {
   if (estado == "inicio")
    Matter.Body.setPosition(bird.body, { x: mouseX, y: mouseY });
}

function mouseReleased() {
  cadena_ave.volar();
  estado = "vuela";
}

function keyPressed() {
  if (keyCode === 32&& bird.body.speed < 1) {
   bird.trayectoria = [];
  Matter.Body.setPosition(bird.body,{x:300, y:150}); 
  cadena_ave.unir(bird.body); 
  }
  estado = "inicio";
}

function Puntaje_pig() {
  fill("brown");
  textSize(30);
  text("Marcador: " + puntaje, width - 230, 50);
}
