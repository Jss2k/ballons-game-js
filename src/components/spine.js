export default class Spine {
  constructor(game) {
    this.gameWidth = game.gameWidth;
    
    this.width = 15;
    this.height = 20;

    this.speed = 8;

    this.position = {
      x: game.gameWidth / 2 - this.width / 2,
      y: 0
    };

    this.rightPressed = false;
    this.leftPressed = false;
  }

  moveLeft() {
    if (this.leftPressed) {
      this.position.x -= this.speed;
      if (this.position.x < 13) {
        this.position.x = 13;
      }
    }
  }

  moveRight() {
    if (this.rightPressed) {
      this.position.x += this.speed;
      if (this.position.x + this.width >= this.gameWidth) {
        this.position.x = this.gameWidth - this.width;
      }
    }
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.fillStyle = '#230c33';
    ctx.moveTo(this.position.x , this.height);
    ctx.lineTo(this.position.x + 5, this.position.y);
    ctx.lineTo(this.position.x - 5, this.position.y);
    ctx.fill();
  }

  update() {

  }
}
