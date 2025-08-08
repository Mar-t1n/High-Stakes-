
inventory={};
let multiplier = 1;

function updateMoneyDisplay() {
  const display = document.getElementById('money-display');
  if (display) {
    display.innerHTML = `Money: $${player.money}`;
  }
}

function increaseMoney() {
  player.money += 1*multiplier;
  updateMoneyDisplay();
  savePlayer(); 
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
