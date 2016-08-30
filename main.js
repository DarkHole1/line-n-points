var canvas = (document.querySelector && document.querySelector('canvas')) ||(document.getElementByTagName('canvas')),
    context = getContext(canvas);
context.context.font = '20px Helventica';
context.context.textAlign = 'center';
context.canvas.addEventListener('click', click);
window.addEventListener('keypress', click);
requestAnimationFrame(draw);
