// Initialize game variables
let selectedChip = 1;
let bets = {};
let totalBetAmount = 0;

// Make sure player object exists
if (typeof player === 'undefined') {
    console.error('Player object not found! Make sure to load script.js first');
}
const redNumbers = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];

// Chip selection   
document.querySelectorAll('.chip').forEach(chip => { //goes through every chip created in the HTML
    chip.addEventListener('click', function() {  // adds an event listener to each chip
        document.querySelectorAll('.chip').forEach(chip => chip.classList.remove('selected')); //the "selected class" is a way to highlight the currently selected chip
        //once clicking on a chip, it removes the "selected" class from all chips
        this.classList.add('selected'); //adds the selected class to the clicked chip
        //this refers to the chip that was clicked
        // Retrieve the value from the clicked chip's data attribute
        const value = this.dataset.value;
        // Update the selectedChip: if the value is 'allin', keep it as 'allin'; otherwise, convert the value to an integer
        if (value === 'allin') {
            selectedChip = 'allin';
        } else {
            selectedChip = parseInt(value); //converts the value to an integer, since they are all saved as strings
        }
    });
});
// Select all elements that have either a 'data-number' or 'data-bet' attribute.
// These elements represent the cells where bets can be placed.
document.querySelectorAll('[data-number], [data-bet]').forEach(cell => {
    // Add a click event listener to each betting cell.
    // When a cell is clicked, it triggers the placeBet function.
    cell.addEventListener('click', function() {
        // Call the placeBet function with the current clicked cell as its argument.
        // The 'this' keyword references the element that was clicked.
        placeBet(this);
    });
});

function placeBet(cell) {
            const betAmount = selectedChip === 'allin' ? player.money : selectedChip;
            
            if (player.money < betAmount) {
                alert('Insufficient balance!');
                return;
            }

            const betKey = cell.dataset.number || cell.dataset.bet; //checks if ts is a number or like a special bet
            const betType = cell.dataset.type;

            if (!bets[betKey]) { 
                bets[betKey] = { amount: 0, type: betType, element: cell };
            }

            bets[betKey].amount += betAmount;
            player.money -= betAmount;
            totalBetAmount += betAmount;
            savePlayer(); // Save player's money after placing bet

            updateDisplay();
            updateBetChip(cell, bets[betKey].amount);
        }

function updateBetChip(cell, amount) {
    const existingChip = cell.querySelector('.bet-chip');
    if (existingChip) {
        existingChip.remove();
    }

    if (amount > 0) {
        const chipDisplay = document.createElement('div');
        chipDisplay.className = 'bet-chip';
        chipDisplay.textContent = `$${amount}`;
        chipDisplay.style.background = getChipColor(amount);
        cell.style.position = 'relative';
        cell.appendChild(chipDisplay);
    }
}

function getChipColor(amount) {
    if (amount >= 100) return '#000';
    if (amount >= 25) return '#28a745';
    if (amount >= 10) return '#0066cc';
    if (amount >= 5) return '#dc3545';
    return '#fff';
}

function updateDisplay() {
    document.getElementById('balance').textContent = player.money;
    document.getElementById('totalBet').textContent = totalBetAmount;
    updateBetList();
    updateMoneyDisplay(); // Update the main game's money display
}

function updateBetList() {
    const betList = document.getElementById('betList');
    if (Object.keys(bets).length === 0 || totalBetAmount === 0) {
        betList.innerHTML = 'No bets placed';
        return;
    }

    betList.innerHTML = '';
    Object.keys(bets).forEach(betKey => {
        if (bets[betKey].amount > 0) {
            const betItem = document.createElement('div');
            betItem.className = 'bet-item';
            betItem.innerHTML = `
                <span>${betKey.toUpperCase()}</span>
                <span>$${bets[betKey].amount}</span>
            `;
            betList.appendChild(betItem);
        }
    });
}


function clearBets(returnMoney = true) {
    if (returnMoney) {
        player.money += totalBetAmount;
        savePlayer(); // Save player's money when returning bets
    }
    bets = {};
    totalBetAmount = 0;
    
    document.querySelectorAll('.bet-chip').forEach(chip => chip.remove());
    updateDisplay();
    document.getElementById('result').innerHTML = '';
}

document.querySelector('.btn-spin').addEventListener('click', () => {
    spin();
});

function spin() {
    if (totalBetAmount === 0) {
        alert('Please place at least one bet!');
        return;
    }

    const winningNumber = Math.floor(Math.random() * 37);
    const winningColor = getNumberColor(winningNumber);
    
    document.getElementById('result').innerHTML = `
        <span style="color: ${winningColor === 'red' ? '#dc3545' : winningColor === 'black' ? '#000' : '#28a745'}">
            Winning: ${winningNumber} (${winningColor.toUpperCase()})
        </span>
    `;

    let totalWinnings = 0;
    Object.keys(bets).forEach(betKey => {
        const bet = bets[betKey];
        const payout = calculatePayout(betKey, bet.type, winningNumber);
        if (payout > 0) {
            totalWinnings += payout;
        }
    });

    player.money += totalWinnings;
    savePlayer(); // Save player's money after adding winnings
    
    if (totalWinnings > 0) {
        setTimeout(() => alert(`You won $${totalWinnings}!`), 500);
    }

    setTimeout(() => {
        clearBets(false); // Don't return money after spinning
    }, 3000);
}

function getNumberColor(number) {
    if (number === 0) return 'green';
    if (redNumbers.includes(number)) return 'red';
    return 'black';
}

function calculatePayout(betKey, betType, winningNumber) {
    const betAmount = bets[betKey].amount;
    
    switch (betType) {
        case 'number':
            return parseInt(betKey) === winningNumber ? betAmount * 36 : 0;
        
        case 'color':
            const numberColor = getNumberColor(winningNumber);
            return (betKey === numberColor && winningNumber !== 0) ? betAmount * 2 : 0;
        
        case 'evenodd':
            if (winningNumber === 0) return 0;
            const isEven = winningNumber % 2 === 0;
            return (betKey === 'even' && isEven) || (betKey === 'odd' && !isEven) ? betAmount * 2 : 0;
        
        case 'range':
            if (winningNumber === 0) return 0;
            if (betKey === '1to18') return winningNumber >= 1 && winningNumber <= 18 ? betAmount * 2 : 0;
            if (betKey === '19to36') return winningNumber >= 19 && winningNumber <= 36 ? betAmount * 2 : 0;
            return 0;
        
        case 'dozen':
            if (winningNumber === 0) return 0;
            if (betKey === '1st12') return winningNumber >= 1 && winningNumber <= 12 ? betAmount * 3 : 0;
            if (betKey === '2nd12') return winningNumber >= 13 && winningNumber <= 24 ? betAmount * 3 : 0;
            if (betKey === '3rd12') return winningNumber >= 25 && winningNumber <= 36 ? betAmount * 3 : 0;
            return 0;
        
        case 'column':
            if (winningNumber === 0) return 0;
            if (betKey === 'col3') return winningNumber % 3 === 0 ? betAmount * 3 : 0;
            if (betKey === 'col2') return winningNumber % 3 === 2 ? betAmount * 3 : 0;
            if (betKey === 'col1') return winningNumber % 3 === 1 ? betAmount * 3 : 0;
            return 0;
        
        default:
            return 0;
    }
}

updateDisplay();

