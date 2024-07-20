const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

let transactions = [];

function init() {
    list.innerHTML = '';
    transactions.forEach(addDatatoList);
    calculateMoney();
}

function addDatatoList(transaction) {
    const symbol = transaction.amount < 0 ? '-' : '+';
    const status = transaction.amount < 0 ? 'minus' : 'plus';
    const item = document.createElement('li');
    item.classList.add(status);
    item.innerHTML = `${transaction.text}<span>${symbol}${formatNumber(Math.abs(transaction.amount))}</span> <button class="delete-btn" onclick="removeData(${transaction.id})">x</button>`;
    list.appendChild(item);
}

function calculateMoney() {
    const amounts = transactions.map(transaction => transaction.amount);
    const total = amounts.reduce((result, item) => (result += item), 0).toFixed(2);
    const income = amounts.filter(item => item > 0).reduce((result, item) => (result += item), 0).toFixed(2);
    const expense = -1 * (amounts.filter(item => item < 0).reduce((result, item) => (result += item), 0)).toFixed(2);

    balance.innerText = `฿` + formatNumber(total);
    money_plus.innerText = `฿` + formatNumber(income);
    money_minus.innerText = `฿` + formatNumber(expense);
}

function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}

function generateID() {
    return Math.floor(Math.random() * 10000000);
}

function removeData(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);
    init();
}

function addTransaction(e) {
    e.preventDefault();
    if (text.value.trim() === '' || amount.value.trim() === '') {
        alert('กรุณาป้อนข้อมูลให้ครบ');
    } else {
        const data = {
            id: generateID(),
            text: text.value,
            amount: +amount.value
        };
        transactions.push(data);
        addDatatoList(data);
        calculateMoney();
        text.value = '';
        amount.value = '';
    }
}

form.addEventListener('submit', addTransaction);

init();
