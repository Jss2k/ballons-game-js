import { startTimer, toggleTimer } from './timer'
const start = document.querySelector('.app__start');
const reset = document.querySelector('.app__reset');
const pause = document.querySelector('.app__pause');
const scoreDisplay = document.querySelector('.app__high-score');


export default class InputHandler {
  constructor(spine, game) {

    start.addEventListener('click', () => {
      window.location.reload()
    })

    reset.addEventListener('click', () => {
      localStorage.setItem('highScore', '0');
      scoreDisplay.innerHTML = 'High Score: 0';
      });

    pause.addEventListener('click', () => {
      game.togglePause();
      toggleTimer();
    })

    let down = false;

    document.addEventListener('keydown', event => {
      switch (event.key) {
        case 'Right':
          spine.rightPressed = true;
          spine.moveRight();
          break;

        case 'ArrowRight':
          spine.rightPressed = true;
          spine.moveRight();
          break;

        case 'Left':
          spine.leftPressed = true;
          spine.moveLeft();
          break;

        case 'ArrowLeft':
          spine.leftPressed = true;
          spine.moveLeft();
          break;

        case 'Escape':
          if (game.gameover) return
          game.togglePause();
          toggleTimer();
          break;
  
        case 'Enter':
          if (down) return;
          game.start();
          startTimer();
          break;
      }
    });

    document.addEventListener('keyup', event => {
      switch (event.key) {
        case 'Right':
          spine.rightPressed = false;
          spine.moveLeft();
          break;

        case 'ArrowRight':
          spine.rightPressed = false;
          spine.moveLeft();
          break;

        case 'Left':
          spine.leftPressed = false;
          spine.moveLeft();
          break;

        case 'ArrowLeft':
          spine.leftPressed = false;
          spine.moveLeft();
          break;

        case 'Enter':
          down = true;
          break;
      }
    });
  }
}