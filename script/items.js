let cartAmount = 0;
let cartList = {}; // Store item ids and their details

function updateCartAmount(itemId, cost) {
    if (!cartList[itemId]) {
        cartList[itemId] = { quantity: 1, cost: cost };
    } else {
        cartList[itemId].quantity++;
    }
    cartAmount++;
    document.querySelector('.cart-amount').innerHTML = cartAmount;
    console.log(cartList);
}