export default class Ballon {
  
  constructor(x, y, radius, color, dx, dy, gameWidth, gameHeight, spine) {
    this.spine = spine;
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.radius = radius;
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.color = color;
    this.markedForDeletion = false;
    this.doneScore = '';
    this.loseScore = '';
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
  }
  
  
  update() {
    this.x += this.dx;
    this.y += this.dy;
  
    if (this.x + this.radius > this.gameWidth || this.x < 0) {
      this.dx *= -1;
    }

    if (
      this.x + this.radius >= this.spine.position.x
      && this.x <= this.spine.position.x + this.spine.width
      && this.y + this.radius <= this.spine.height * 3
      && this.markedForDeletion !== true
    ) {
      this.dx = 0;
      this.dy = 0;
      this.y = 10;
      this.doneScore = 'done';
      this.markedForDeletion = true;
    }
    
    if (this.y <= 0) {

      this.loseScore = 'lose'
      this.markedForDeletion = true;
    }

  }
}