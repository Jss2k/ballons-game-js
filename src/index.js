import Game from "./components/game";
const time = document.querySelector('#game-time');
import '@/styles/styles.scss';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.height = 500;
canvas.width = 500;
time.textContent = 60;

const GAME_TIME = time.textContent;
const GAME_WIDTH = canvas.width;
const GAME_HEIGHT = canvas.height;

let game = new Game(GAME_WIDTH, GAME_HEIGHT, GAME_TIME);

function play() {

  ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

  game.update();
  game.draw(ctx);
 

  requestAnimationFrame(play)
}

requestAnimationFrame(play)