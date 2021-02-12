let time = document.querySelector('#game-time');

let startTime = 60;
let currentTime = startTime;
let interval = undefined;

export function startTimer() {
  if(!interval){
    time.innerHTML = currentTime; 
    interval = setInterval(newNumber, 1000)
  }
}

export function toggleTimer() {
  if (!interval) {
    startTimer();
  } else {
    stopTimer();
  }
}

export function resetTimer() {
  currentTime = startTime;
  time.innerHTML = currentTime;
  //stopCounter(); startCounter();
}

export function stopTimer() {
  clearInterval(interval)
  interval = undefined;
}

function newNumber() {
  currentTime--;
  time.innerHTML = currentTime; 
  if(currentTime === 0){
    stopTimer();
  }
}