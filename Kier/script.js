const dino = document.getElementById("dino");
const cactus = document.getElementById("cactus");
const scoreText = document.getElementById("score");
const restartBtn = document.getElementById("restart");
const gameArea = document.querySelector(".game-area");

const jumpSound = new Audio("assets/jump.mp3");
const gameOverSound = new Audio("assets/gameover.mp3");

let score = 0;
let highScore = localStorage.getItem("highScore") || 0;
let isGameOver = false;
let isStarted = false;

scoreText.textContent = `Press SPACE to Start | High Score: ${highScore}`;
dino.classList.add("run");
gameArea.focus();

function startGame() {
  if (isStarted) return;
  isStarted = true;
  isGameOver = false;
  score = 0;
  cactus.style.animation = "cactusMove 1.4s linear infinite";
}

function jump() {
  if (!isStarted || isGameOver) return;
  if (dino.classList.contains("jump")) return;

  jumpSound.currentTime = 0;
  jumpSound.play();

  dino.classList.remove("run");
  dino.classList.add("jump");

  setTimeout(() => {
    dino.classList.remove("jump");
    dino.classList.add("run");
  }, 500);
}

const gameLoop = setInterval(() => {
  if (!isStarted || isGameOver) return;

  const dinoRect = dino.getBoundingClientRect();
  const cactusRect = cactus.getBoundingClientRect();

  if (
    dinoRect.right > cactusRect.left &&
    dinoRect.left < cactusRect.right &&
    dinoRect.bottom > cactusRect.top
  ) {
    gameOver();
  }

  score++;
  scoreText.textContent = `Score: ${score} | High Score: ${highScore}`;
}, 100);

function gameOver() {
  isGameOver = true;
  cactus.style.animation = "none";

  gameOverSound.currentTime = 0;
  gameOverSound.play();

  if (score > highScore) {
    highScore = score;
    localStorage.setItem("highScore", highScore);
  }

  scoreText.textContent = `Game Over! Press SPACE to Restart | High Score: ${highScore}`;
  restartBtn.style.display = "inline-block";
}

restartBtn.addEventListener("click", () => {
  location.reload();
});

window.addEventListener("keydown", (e) => {
  if (e.code === "Space") {
    e.preventDefault();
    if (!isStarted) startGame();
    else if (isGameOver) location.reload();
    else jump();
  }
});
