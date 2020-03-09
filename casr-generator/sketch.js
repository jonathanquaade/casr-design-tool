let firstBuffer, secondBuffer, thirdBuffer, fourthBuffer;
let w = 560;
let h = 800;
let frame;
let counter = 0;
let triangle;
let discs;

let Mimg01, Mimg02, Mimg03, Mimg04;
let newArray = [Mimg01, Mimg02, Mimg03, Mimg04];
let manipulatedImage;

let gridSize = 80;
let cols;
let rows;

function preload() {
  img01 = loadImage("image01.jpg");
  img02 = loadImage("image02.jpg");
  img03 = loadImage("image03.jpg");
  img04 = loadImage("image04.jpg");
  
 
}

function setup() {
  background(255);
  frame = createCanvas(w, h);
  firstBuffer = createGraphics(w / 2, h / 2);
  secondBuffer = createGraphics(w / 2, h / 2);
  thirdBuffer =  createGraphics(w / 2, h / 2);
  fourthBuffer = createGraphics(w / 2 , h / 2);
  
  for ( i = 0; i < 4; i++) {
    let array = [img01, img02, img03, img04];
    manipulateImage(array[i]);
    newArray[i] = manipulatedImage;
   
  }
 cols = height / gridSize;
 rows = height / gridSize;
 return frame;
  
}

function draw() {
  
  counter++
  let name = 'cars -' + counter;
  
  background(255);

 
  
  drawFirstBuffer();
  drawSecondBuffer();
  drawThirdBuffer();
  drawFourthBuffer();
  
  
  image(firstBuffer, 0, 0);
  image(secondBuffer, w / 2, 0);
  image(thirdBuffer, 0, h / 2);
  image(fourthBuffer, w / 3, h / 2);
  
  stroke(0,0,255);
  strokeWeight(1);
  
 for ( let i = 0; i < cols; i++) {
    for ( let j = 0; j < rows; j++) {
    let x = i * gridSize;
    let y = j * gridSize;
    noFill()
    stroke(0,0,255);
    rect(x,y,gridSize, gridSize)
   }
  }
  
  triangle = new Triangle();
  discs = new Circles();
  triangle.display();
  discs.display();
 
  
  frameRate(1.8);
  // saveCanvas(frame, name, 'jpg');

  
  
}

  
  function drawFirstBuffer() {
    firstBuffer.clear();
    // firstBuffer.background(255);
    firstBuffer.image(newArray[0],random(-300, w / 2), random(-500, h / 2), newArray[0].width, newArray[0].height);
    
  }

  function drawSecondBuffer() {
     secondBuffer.clear()
     secondBuffer.image(newArray[1], random(-300, w), random(-500, h / 2), newArray[1].width, newArray[1].height);
    
  }

  function drawThirdBuffer() {
    thirdBuffer.clear()
    thirdBuffer.image(newArray[2],random(-300, w / 2), random(-500, h / 2), newArray[2].width, newArray[2].height);
    
  }

  function drawFourthBuffer() {
    fourthBuffer.clear()
    fourthBuffer.image(newArray[3],random(-300 + w / 2, w), random(h / 2 - 500, h), newArray[3].width, newArray[3].height);
    
  }

class Triangle {
  
  constructor() {
    this.a = random(width);
    this.a2 =  random(height);
    this.b = random(width);
    this.b2 =  random(height);
    this.c = random(width);
    this.c2 =  random(height);
  }
  
  display() {
    fill(255);
    stroke(0,0,255);
    beginShape();
    vertex(this.a, this.a2);
    vertex(this.b, this.b2);
    vertex(this.c, this.c2);
    endShape(CLOSE);
      
    }
}
  
class Circles {
  constructor () {
    this.a = random(width);
    this.b = random(height);
    this.c = random(width);
    this.d = random(height);
    this.e = random(width);
    this.f = random(height);
    
    this.l1 = random(width);
    this.l2 = random(height);
    this.l3 = random(width);
    this.l4 = random(height);
  }
  
  display () {
    noStroke()
    fill(40, 230, 40);
    ellipse(this.a, this.b, 50, 50)
    ellipse(this.c, this.d, 100, 100) 
     ellipse(this.e, this.f, 25, 25) 
    stroke(40, 230, 40);
    strokeWeight(3); // Thicker
    line(this.l1,this.l2,this.l3,this.l4)
  }
}

function manipulateImage(sourceImage) {
  // 1.
  sourceImage.resize(200, 0); // 2.
  let gridCols = 160;

  let srcImgW = sourceImage.width;
  let srcImgH = sourceImage.height; // 3.

  let ratio = srcImgH / srcImgW; // 4. Get width of the rasterized image from UI

  let mImgW = parseInt(h); // Calculate the height of it with the ratio

  let mImgH = parseInt(w * ratio);
  let scaling = mImgW / srcImgW; // Calculate the number of gridcolumns

  var gridItemW = mImgW / gridCols; // Calculate the number of gridrows

  var gridRows = gridCols * ratio; // Create PGraphics

  manipulatedImage = createGraphics(mImgW, mImgH); // Fill and stroke

  manipulatedImage.noStroke();
  manipulatedImage.fill(0,0,255); // BUG!
  // The loop draws only a grid of 60 tiles instead of 180
  console.log(manipulatedImage)
  var counter2 = 0; // Get the brightness-min- and max-values for contrast optimization

  var briMin = 0,
    briMax = 255;

  for (var x = 0; x < mImgW; x += gridItemW) {
    for (var y = 0; y < mImgH; y += gridItemW) {
      // get the right pixel
      let thisPixel = sourceImage.get(parseInt(x / scaling), parseInt(y / scaling));
      let brightn = brightness(thisPixel);
    }
  } // DRAW IT!!!


  for (var a = 0; a < mImgW; a += gridItemW) {
    counter2++;

    for (var b = 0; b < mImgH; b += gridItemW) {
      // get the right pixel
      let thisPixel = sourceImage.get(parseInt(a / scaling), parseInt(b / scaling));
      let brightn = brightness(thisPixel); // calculate the size of the rectangle

      var size = map(brightn, 100, 0, 0, 8);
      manipulatedImage.push();
      manipulatedImage.translate(a, b);
      manipulatedImage.rect(0, 0, size, size);
      manipulatedImage.pop();
    }
  }

}
