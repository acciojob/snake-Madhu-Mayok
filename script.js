//your code here
const gameContainer = document.getElementById('gameContainer');
const scoreElement = document.getElementById('score');
let score = 0;

const rows = 40;
const cols = 40;
const snake = [{ row: 20, col: 1 }];
let direction = 'right';
let food = getRandomPosition();

function createGameGrid() {
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const pixel = document.createElement('div');
      pixel.id = `pixel${row * cols + col}`;
      gameContainer.appendChild(pixel);
    }
  }
}

function getRandomPosition() {
  const row = Math.floor(Math.random() * rows);
  const col = Math.floor(Math.random() * cols);
  return { row, col };
}

function updateGame() {
  const head = { ...snake[0] };

  switch (direction) {
    case 'up':
      head.row--;
      break;
    case 'down':
      head.row++;
      break;
    case 'left':
      head.col--;
      break;
    case 'right':
      head.col++;
      break;
  }

  // Check for collisions
  if (head.row < 0 || head.row >= rows || head.col < 0 || head.col >= cols) {
    alert('Game over!');
    location.reload();
    return;
  }

  snake.unshift(head);

  if (head.row === food.row && head.col === food.col) {
    score++;
    scoreElement.textContent = score;
    food = getRandomPosition();
  } else {
    snake.pop();
  }

  renderGame();
}

function renderGame() {
  const pixels = gameContainer.children;

  for (let i = 0; i < pixels.length; i++) {
    pixels[i].classList.remove('snakeBodyPixel', 'food');
  }

  snake.forEach(segment => {
    const pixel = document.getElementById(`pixel${segment.row * cols + segment.col}`);
    pixel.classList.add('snakeBodyPixel');
  });

  const foodPixel = document.getElementById(`pixel${food.row * cols + food.col}`);
  foodPixel.classList.add('food');
}

document.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'ArrowUp':
      if (direction !== 'down') direction = 'up';
      break;
    case 'ArrowDown':
      if (direction !== 'up') direction = 'down';
      break;
    case 'ArrowLeft':
      if (direction !== 'right') direction = 'left';
      break;
    case 'ArrowRight':
      if (direction !== 'left') direction = 'right';
      break;
  }
});

createGameGrid();
setInterval(updateGame, 100);
