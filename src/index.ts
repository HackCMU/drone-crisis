const canvas = document.createElement('canvas');
canvas.width = 1920;
canvas.height = 1080;
const ctx = canvas.getContext('2d')!;
document.body.appendChild(canvas);

function loop() {
  ctx.fillStyle = `rgb(23, 30, ${Math.random()*255})`;
  ctx.fillRect(0, 0, 1920, 1090);
  requestAnimationFrame(loop);
}
requestAnimationFrame(loop);

