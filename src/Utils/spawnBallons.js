import Ballon from '../components/ballon'
import randomColor from './randomColor'


export function spawnBallons(gameHeight, gameWidth, gameTime, spine) {
  let ballons = [];

  let interval = setInterval(() => {
     setTimeout(() => {
       clearInterval(interval)
     }, gameTime * 1000);
    const radius = 23;
    const x = Math.random() * ( gameWidth - radius );
    const y = gameHeight + radius / 2;
    const angle = Math.atan2(gameHeight / 2 - y, gameWidth / 2 - x)
    const color = randomColor(35);
    const dx = Math.cos(angle);
    const dy = Math.sin(angle);

    ballons.push(new Ballon(x, y, radius, color, dx, dy, gameWidth, gameHeight, spine))
    
  }, 1950)
  return ballons;

}
