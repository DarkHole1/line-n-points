function getContext(canvas) {
  var obj = Object.create(getContext.prototype);
  obj.canvas = canvas;
  obj.context = canvas.getContext('2d');
  return obj;
}
getContext.prototype = {
  'line': function(x, y){
    this.context.lineTo(x, y);
    this.to = this.line;
    return this;
  },
  'move': function(x, y){
    this.context.moveTo(x, y);
    this.to = this.move;
    return this;
  },
  'fill': function(color){
    if(color) this.context.fillStyle = color;
    this.context.fill();
    return this;
  },
  'stroke': function(color){
    if(color) this.context.strokeColor = color;
    this.context.stroke();
    return this;
  },
  'style': function(type, obj){
    switch (type) {
      case 'l':
      case 'line':
        if(obj.end) this.context.lineCaps = obj.end;
        if(obj.join) this.context.lineJoin = obj.join;
        if(obj.width) this.context.lineWidth = obj.width;
        if(obj.color) this.context.strokeStyle = obj.color;
        break;
      case 'f':
      case 'fill':
        if(obj) this.context.fillStyle = obj;
        break;
    }
    return this;
  },
  'clear': function(color){
    this.begin();
    if(color){
      this.context.fillStyle = color;
      this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    } else {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    return this;
  },
  'begin': function(){
    this.context.beginPath();
    return this;
  },
  'end': function(){
    this.context.closePath();
    return this;
  },
  'arc': function(obj){
    if(arguments.length > 1) this.context.arc.apply(this.context, arguments);
    else this.context.arc(obj.x, obj.y, obj.radius, obj.angle.start, obj.angle.end, obj.anti);
    return this;
  },
  'arcTo': function(obj){
    if(arguments.length > 1) this.context.arcTo.apply(this.context, arguments);
    else this.context.arcTo(obj.x1, obj.y1, obj.x2, obj.y2, obj.radius);
    return this;
  },
  'circ': function(x, y, radius){
    this.arc(x, y, radius, 0, Math.PI * 2);
    return this;
  },
  'rect': function(x, y, width, height){
    this.context.rect(x, y, width, height);
    return this;
  }
}
