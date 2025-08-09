
let player = {
  name: '',
  money: 0,
  inventory: {
    items: {}
  }
};

// Load player from localStorage if exists
if (localStorage.getItem('player')) {
  player = JSON.parse(localStorage.getItem('player'));
  showGameScreen();
  updateMoneyDisplay();
}

// Create new player
function createPlayer() {
  const nameInput = document.getElementById('player-name').value.trim();
  if (nameInput === '') {
    alert('Please enter a name!');
    return;
  }

  player.name = nameInput;
  player.money = 0;

  savePlayer();
  showGameScreen();
  updateMoneyDisplay();
}

// Save player to localStorage
function savePlayer() {
  localStorage.setItem('player', JSON.stringify(player));
}
