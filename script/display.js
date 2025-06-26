function showGameScreen() {
  document.getElementById('setup-screen').style.display = 'none';
  document.getElementById('game-screen').style.display = 'block';
}

function gambleDisplay() {
  console.log('Gamble button clicked');
  document.getElementById('game-screen').style.display = 'none';
  document.getElementById('gamble-screen').style.display = 'block';
}
function backToGame() {
    console.log('Back to game button clicked');
    document.getElementById('gamble-screen').style.display = 'none';
    document.getElementById('game-screen').style.display = 'block';
    document.getElementById('item-shop-screen').style.display = 'none';
    document.getElementById('cart-screen').style.display = 'none';
}
function itemShop() {
    document.getElementById('game-screen').style.display = 'none';
    document.getElementById('item-shop-screen').style.display = 'block';
}
function cart() {
  console.log('Cart button clicked');
  document.getElementById('item-shop-screen').style.display = 'none';
  document.getElementById('cart-screen').style.display = 'block';
}