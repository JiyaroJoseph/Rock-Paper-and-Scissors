let score = JSON.parse(localStorage.getItem('score')) || { wins: 0, losses: 0, draws: 0 };
updated_score();

function playgame(playerMove) {
  let result = "";
  let computer = computer_move();

  if (playerMove === "rock") {
    if (computer === "rock") result = "It's a Draw";
    else if (computer === "paper") result = 'You Lost';
    else if (computer === "scissors") result = 'You Won';
  } 
  else if (playerMove === "paper") {
    if (computer === "rock") result = 'You Won';
    else if (computer === "paper") result = "It's a Draw";
    else if (computer === "scissors") result = 'You Lost';
  } 
  else if (playerMove === "scissors") {
    if (computer === "rock") result = 'You Lost';
    else if (computer === "paper") result = 'You Won';
    else if (computer === "scissors") result = "It's a Draw";
  }

  if (result === 'You Won') {
    score.wins += 1;
  } else if (result === 'You Lost') {
    score.losses += 1;
  } else if (result === "It's a Draw") {
    score.draws += 1;
  }

  localStorage.setItem('score', JSON.stringify(score));
  updated_score();

  document.querySelector('.outcome').innerHTML = result;
  document.querySelector('.moves').innerHTML = `
    You picked: <img src="images/${playerMove}-emoji.png" class="playerMove-img"> 
    Computer picked: <img src="images/${computer}-emoji.png" class="computerMove-img">
  `;
}

function updated_score() {
  document.querySelector('.current-scores').innerHTML = `
    Wins: ${score.wins} <br> Draws: ${score.draws} <br> Losses: ${score.losses}
  `;
}

function computer_move() {
  const no = Math.random();
  let comp = "";

  if (no >= 0 && no < 1/3) {
    comp = 'rock';
  } else if (no >= 1/3 && no < 2/3) {
    comp = 'scissors';
  } else if (no >= 2/3 && no < 1) {
    comp = 'paper';
  }

  return comp;
}

let isautoplaying = false;
let interval_ID;

function autoplay() {
  if (!isautoplaying) {
    interval_ID = setInterval(() => {
      const playerMove = computer_move();
      playgame(playerMove);
    }, 800);
    isautoplaying = true;
  } else {
    clearInterval(interval_ID);
    isautoplaying = false;
  }
}

document.body.addEventListener('keydown', (event) => {
  // Ignore if Ctrl, Alt, or Meta (Command key) is pressed
  if (event.ctrlKey || event.altKey || event.metaKey) {
    return;
  }

  if (event.key === 'r' || event.key === 'R') {
    playgame('rock');
  } else if (event.key === 'p' || event.key === 'P') {
    playgame('paper');
  } else if (event.key === 's' || event.key === 'S') {
    playgame('scissors');
  } else if (event.key === 'a' || event.key === 'A') {
    autoplay();
  }
});

const rst = document.querySelector(".reset-button");
rst.addEventListener('click', () => {
  clearInterval(interval_ID);
  isautoplaying = false;
});
