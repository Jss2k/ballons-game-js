import Spine from './spine';
import InputHandler from './input';
import { spawnBallons } from '../Utils/spawnBallons';

const time = document.querySelector('#game-time');
const scoreDisplay = document.querySelector('.app__high-score');
const pause = document.querySelector('.app__pause');

const GAMESTATE = {
  PAUSED: 0,
  RUNNING: 1,
  MENU: 2,
  GAMEOVER: 3,
  TIMEOVER: 4,
};

export default class Game {
  constructor(gameWidth, gameHeight, gameTime) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.gameTime = gameTime;
    this.highScore = 0;
    this.gamestate = GAMESTATE.MENU;
    this.gameObjects = [];
    this.ballons = [];
    this.filterBallons = [];
    this.done = 0;
    this.lose = 0;
    this.interval = 0;
    this.spine = new Spine(this);
    new InputHandler(this.spine, this);
  }

  start() {
    
    if (
      this.gamestate !== GAMESTATE.MENU
    )
      return;

    this.gamestate = GAMESTATE.RUNNING;
    this.gameObjects = [this.spine];
    this.ballons = spawnBallons(
      this.gameHeight,
       this.gameWidth,
        this.gameTime,
         this.spine,
         this.interval
         );
  }

  update(deltaTime) {
    scoreDisplay.innerHTML = `High Score: ${this.highScore}`;
    this.highScore = parseInt(localStorage.getItem('highScore'));

    if (time.innerHTML === '0') {
      this.gamestate === GAMESTATE.TIMEOVER;
    }

    if (time.innerHTML === '0' && this.filterBallons.length === 0) {
      pause.removeAttribute('onclick');
      this.gamestate = GAMESTATE.GAMEOVER;
    }

    if (isNaN(this.highScore)) {
      this.highScore = 0;
    }
    

    if (this.gamestate === GAMESTATE.GAMEOVER && this.done > parseInt(localStorage.getItem('highScore'))) {
        localStorage.setItem('highScore', this.done.toString());
        scoreDisplay.innerHTML = `High Score: ${this.highScore}`;
    }

    if (
      this.gamestate === GAMESTATE.PAUSED ||
      this.gamestate === GAMESTATE.MENU ||
      this.gamestate === GAMESTATE.GAMEOVER
    )
      return;

    [...this.gameObjects].forEach(object => object.update(deltaTime));
    this.ballons.forEach(object => object.update(deltaTime));

    let ballon = this.ballons.filter(ballon => !ballon.markedForDeletion);
    this.filterBallons = [...ballon]

    let done = this.ballons.filter(ballon => ballon.doneScore ===  'done');
    this.done = done.length

    let lose = this.ballons.filter(ballon => ballon.loseScore === 'lose');
    this.lose = lose.length

  }

  draw(ctx) {
    
    this.filterBallons.forEach(object => object.draw(ctx));

    if (this.gamestate === GAMESTATE.RUNNING) {
      [...this.gameObjects].forEach(object => object.draw(ctx));
      ctx.font = '16px Arial';
      ctx.fillStyle = '#230c23';
      ctx.fillText("Score: " + this.done, 60,this.gameHeight - 30);
      ctx.fillText("Lose: " + this.lose, this.gameWidth - 60,this.gameHeight - 30);
      
    }

    if (this.gamestate === GAMESTATE.PAUSED) {
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = "rgba(0,0,0,0.5)";
      ctx.fill();

      ctx.font = "30px Arial";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText("Paused", this.gameWidth / 2, this.gameHeight / 2);
    }

    if (this.gamestate === GAMESTATE.MENU) {
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = "rgba(0,0,0,1)";
      ctx.fill();

      ctx.font = "30px Arial";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText(
        "Press ENTER to Start",
        this.gameWidth / 2,
        this.gameHeight / 2
      );
    }

    if (this.gamestate === GAMESTATE.GAMEOVER) {
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = "rgba(0,0,0,1)";
      ctx.fill();

      ctx.font = "30px Arial";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText(`Score: ${this.done}`, this.gameWidth / 2, this.gameHeight / 2);
    }
  }

  togglePause() {
    if (this.gamestate == GAMESTATE.PAUSED) {
      this.gamestate = GAMESTATE.RUNNING;
    } else {
      this.gamestate = GAMESTATE.PAUSED;
    }
  }
}
