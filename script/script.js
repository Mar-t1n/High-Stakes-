inventory={};
let multiplier = 1;
function increaseMoney() {
  player.money += 1*multiplier;
  updateMoneyDisplay();
  savePlayer();
}

function updateMoneyDisplay() {
  const display = document.getElementById('money-display');
  display.innerHTML = `Money: $${player.money}`;
}

function Gamble() {
  const gambleAmount = parseInt(document.getElementById('bet-amount').value);;
  const betChoice = document.querySelector('.bet-choice').value;

  if (isNaN(gambleAmount) || gambleAmount <= 0) {
    alert('Please enter a valid bet amount!');
    return;
  }

  if (gambleAmount > player.money) {
    alert('You do not have enough money to gamble this amount!');
    return;
  }
  const rouletteTable = {
    1: 'red', 2: 'black', 3: 'red', 4: 'black', 5: 'red', 6: 'black',
    7: 'red', 8: 'black', 9: 'red', 10: 'black', 11: 'black', 12: 'red',
    13: 'black', 14: 'red', 15: 'black', 16: 'red', 17: 'black', 18: 'red',
    19: 'red', 20: 'black', 21: 'red', 22: 'black', 23: 'red', 24: 'black',
    25: 'red', 26: 'black', 27: 'red', 28: 'black', 29: 'black', 30: 'red',
    31: 'black', 32: 'red', 33: 'black', 34: 'red', 35: 'black', 36: 'red'
  };

  const rolledNumber =   Math.floor(Math.random() * 36) + 1;
  const rolledColor = rouletteTable[rolledNumber];

  let win = false;
  let winAmount = 0;

  if (betChoice === rolledColor) {
    win = true;
    winAmount = gambleAmount
    player.money += winAmount;
  }
  else if (!isNaN(parseInt(betChoice)) && parseInt(betChoice, 10) === rolledNumber) {
    win = true;
    winAmount = gambleAmount * 36;
    player.money += winAmount;
  }
  if (win) {
    let message = `You rolled a ${rolledNumber} (${rolledColor}). You win $${winAmount}!`;
    document.querySelector('#gambleResult').innerHTML = message;

  } else {
    let message = `You rolled a ${rolledNumber} (${rolledColor}). You lose $${gambleAmount}.`;
    document.querySelector('#gambleResult').innerHTML = message;
    player.money -= gambleAmount;
  }

  savePlayer();
  updateMoneyDisplay();
}
function checkOut() {
  if (cartAmount === 0) {
    alert('Your cart is empty!');
    return;
  }

  let totalCost = 0;
  for (const itemId in cartList) {
    const item = cartList[itemId];
    totalCost += item.cost * item.quantity;
  }

  if (totalCost > player.money) {
    alert('You do not have enough money to checkout!');
    return;
  }

  player.money -= totalCost;
  inventory.assign = cartList;
  cartAmount = 0;
  cartList = {};
  console.log(inventory);

  if (inventory.tymur && inventory.tymur.quantity > 0) {
  multiplier = multiplier*3* inventory.tymur.quantity;
  }
 
  document.querySelector('.cart-amount').innerHTML = cartAmount;
  updateMoneyDisplay();
}
