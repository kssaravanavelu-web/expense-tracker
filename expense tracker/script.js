const form = document.getElementById('transactionForm');
const tableBody = document.querySelector('#transactionTable tbody');

let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

function updateDashboard() {
    let totalEarned = 0;
    let totalSpent = 0;

    transactions.forEach(tr => {
        if(tr.type === 'income') totalEarned += tr.amount;
        else totalSpent += tr.amount;
    });

    document.getElementById('totalEarned').textContent = `₹${totalEarned}`;
    document.getElementById('totalSpent').textContent = `₹${totalSpent}`;
    document.getElementById('remainingBalance').textContent = `₹${totalEarned - totalSpent}`;
}

function renderTransactions() {
    tableBody.innerHTML = '';
    transactions.forEach((tr, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${tr.name}</td>
            <td>₹${tr.amount}</td>
            <td>${tr.type}</td>
            <td>${tr.dateTime}</td>
            <td><button onclick="deleteTransaction(${index})">Delete</button></td>
        `;
        tableBody.appendChild(row);
    });
}

function deleteTransaction(index) {
    transactions.splice(index, 1);
    localStorage.setItem('transactions', JSON.stringify(transactions));
    renderTransactions();
    updateDashboard();
}

form.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const type = document.getElementById('type').value;

    const now = new Date();
    const dateTime = now.toLocaleString();

    transactions.push({name, amount, type, dateTime});
    localStorage.setItem('transactions', JSON.stringify(transactions));

    form.reset();
    renderTransactions();
    updateDashboard();
});

// Initialize
renderTransactions();
updateDashboard();