const allIn = () => {
  const betAmount = player.money;
  document.querySelector('.bet-amount-selector').value = betAmount;
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
  if (!betChoice || betChoice.trim() === '') {
    alert('Please enter a valid bet choice (Red, Black, Odd, Even, Low, High, or a number 1-36)!');
    return;
  }
  // Pre-made roulette table with color, even, and low/high
  const rouletteTable = {
    1: { color: 'red', even: false, lowHigh: 'low', number: 1 },
    2: { color: 'black', even: true, lowHigh: 'low', number: 2 },
    3: { color: 'red', even: false, lowHigh: 'low', number: 3 },
    4: { color: 'black', even: true, lowHigh: 'low', number: 4 },
    5: { color: 'red', even: false, lowHigh: 'low', number: 5 },
    6: { color: 'black', even: true, lowHigh: 'low', number: 6 },
    7: { color: 'red', even: false, lowHigh: 'low', number: 7 },
    8: { color: 'black', even: true, lowHigh: 'low', number: 8 },
    9: { color: 'red', even: false, lowHigh: 'low', number: 9 },
    10: { color: 'black', even: true, lowHigh: 'low', number: 10 },
    11: { color: 'black', even: false, lowHigh: 'low', number: 11 },
    12: { color: 'red', even: true, lowHigh: 'low', number: 12 },
    13: { color: 'black', even: false, lowHigh: 'low', number: 13 },
    14: { color: 'red', even: true, lowHigh: 'low', number: 14 },
    15: { color: 'black', even: false, lowHigh: 'low', number: 15 },
    16: { color: 'red', even: true, lowHigh: 'low', number: 16 },
    17: { color: 'black', even: false, lowHigh: 'low', number: 17 },
    18: { color: 'red', even: true, lowHigh: 'low', number: 18 },
    19: { color: 'red', even: false, lowHigh: 'high', number: 19 },
    20: { color: 'black', even: true, lowHigh: 'high', number: 20 },
    21: { color: 'red', even: false, lowHigh: 'high', number: 21 },
    22: { color: 'black', even: true, lowHigh: 'high', number: 22 },
    23: { color: 'red', even: false, lowHigh: 'high', number: 23 },
    24: { color: 'black', even: true, lowHigh: 'high', number: 24 },
    25: { color: 'red', even: false, lowHigh: 'high', number: 25 },
    26: { color: 'black', even: true, lowHigh: 'high', number: 26 },
    27: { color: 'red', even: false, lowHigh: 'high', number: 27 },
    28: { color: 'black', even: true, lowHigh: 'high', number: 28 },
    29: { color: 'black', even: false, lowHigh: 'high', number: 29 },
    30: { color: 'red', even: true, lowHigh: 'high', number: 30 },
    31: { color: 'black', even: false, lowHigh: 'high', number: 31 },
    32: { color: 'red', even: true, lowHigh: 'high', number: 32 },
    33: { color: 'black', even: false, lowHigh: 'high', number: 33 },
    34: { color: 'red', even: true, lowHigh: 'high', number: 34 },
    35: { color: 'black', even: false, lowHigh: 'high', number: 35 },
    36: { color: 'red', even: true, lowHigh: 'high', number: 36 }
  };

  const rolledNumber = Math.floor(Math.random() * 36) + 1;
  const rolled = rouletteTable[rolledNumber];

  let win = false;
  let winAmount = 0;

  // Normalize betChoice for comparison
  const bet = betChoice.trim().toLowerCase();

  if (bet === rolled.color) {
    win = true;
    winAmount = gambleAmount;
    player.money += winAmount;
  } else if (bet === 'even' && rolled.even) {
    win = true;
    winAmount = gambleAmount;
    player.money += winAmount;
  } else if (bet === 'odd' && !rolled.even) {
    win = true;
    winAmount = gambleAmount;
    player.money += winAmount;
  } else if (bet === 'low' && rolled.lowHigh === 'low') {
    win = true;
    winAmount = gambleAmount;
    player.money += winAmount;
  } else if (bet === 'high' && rolled.lowHigh === 'high') {
    win = true;
    winAmount = gambleAmount;
    player.money += winAmount;
  } else if (!isNaN(parseInt(betChoice)) && parseInt(betChoice, 10) === rolled.number) {
    win = true;
    winAmount = gambleAmount * 36;
    player.money += winAmount;
  }

  if (win) {
    let message = `You rolled a ${rolled.number} (${rolled.color}, ${rolled.even ? 'Even' : 'Odd'}, ${rolled.lowHigh}). You win $${winAmount}!`;
    document.querySelector('#gambleResult').innerHTML = message;
  } else {
    let message = `You rolled a ${rolled.number} (${rolled.color}, ${rolled.even ? 'Even' : 'Odd'}, ${rolled.lowHigh}). You lose $${gambleAmount}.`;
    document.querySelector('#gambleResult').innerHTML = message;
    player.money -= gambleAmount;
  }

  savePlayer();
  updateMoneyDisplay();
}