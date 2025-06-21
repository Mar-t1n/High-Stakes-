console.log('nigger');
currentMoney = 0;
function increase$() {
    currentMoney += 1;
    document.querySelector('.money').innerHTML = currentMoney + ' $';
    localStorage.setItem('money', JSON.stringify(money));
}

let player = {
    name: '',
    money: currentMoney,
    
}

let currentMoney = JSON.parse(localStorage.getItem('money')) || 0;