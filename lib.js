var force = .1 * Math.PI / 180,
    angle = 0,
    dir = 1,
    lineLength = 100,
    centerY = 200,
    x = 100,
    y = 200,
    pointAngle = Math.PI,
    gameOver = false,
    deathScreen = false,
    score = 0,
    lasttime;
function draw(time){
  if(lasttime){
    if(!gameOver){
      angle += (time - lasttime) * force * dir;
      angle -= angle > 360 ? 360 : 0;
      context.clear();
      drawLine();
      drawPoint();
      drawScore()
    } else if(!deathScreen){
      drawDeath();
      deathScreen = true;
    }
  }
  lasttime = time;
  requestAnimationFrame(draw);
}

function drawLine(){
  var subangle = Math.sin(angle),
      subangle2 = Math.cos(angle);
  context
    .begin()
    .circ(x, y, lineLength/5)
    .fill()
    .begin()
    .style('l', {'width': lineLength/10})
    .move(x, y)
    .line(x + subangle * (lineLength - lineLength/5), y + subangle2 * (lineLength - lineLength/5))
    .stroke()
    .begin()
    .circ(x + subangle * (lineLength - lineLength/5), y + subangle2 * (lineLength - lineLength/5), lineLength/5)
    .fill();
  if(y < centerY) y += 5;
  var calc = x + subangle * (lineLength - lineLength/5) + lineLength/5 * Math.sign(subangle);
  if((calc > 200 || calc < 0)) gameOver = true;
}
function click(){
  if(!gameOver){
    if(distance(Math.sin(pointAngle), Math.cos(pointAngle), Math.sin(angle), Math.cos(angle)) * lineLength > lineLength / 5){
      gameOver = true;
      return;
    }
    generatePoint(45);
    score++;
    force += .001 * Math.PI / 180;
    var inline = (lineLength - lineLength/5);
    x += Math.sin(angle) * inline;
    y += Math.cos(angle) * inline;
    angle += Math.PI;
    if(x >= 100) dir = -1;
    else dir = 1;
  } else {
    pointAngle = Math.PI;
    score = 0;
    gameOver = false;
    deathScreen = false;
    context.style('f', '#000');
    angle = 0;
    x = 100;
    y = 200;
    dir = 1;
    force = .1 * Math.PI / 180;
  }
}
function drawDeath(){
  context.begin().rect(0, 0, canvas.width, canvas.height).fill('rgba(255, 0, 0, .5)');
}
function random(min, max){
  return min + Math.random() * (max - min);
}
function distance(x1, y1, x2, y2){
  var dx = x2 - x1,
      dy = y2 - y1;
  return Math.sqrt(dx * dx + dy * dy);
}
function drawPoint(){
  var subangle = Math.sin(pointAngle),
      subangle2 = Math.cos(pointAngle);
  context
    .begin()
    .style('l', {'width': 3})
    .circ(x + subangle * (lineLength - lineLength/5), y + subangle2 * (lineLength - lineLength/5), lineLength/5 + 2)
    .stroke();
}
function drawScore(){
  context.context.fillText(score, 100, 25);
}
function generatePoint(angle){
  var angle2 = Math.atan2(x * 2 - 200, y);
  angle /= 2;
  angle *= Math.PI / 180;
  pointAngle = Math.PI + random(angle2 - angle, angle2 + angle);
}
