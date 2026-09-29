function loadTransactions() {
  const incomeData = JSON.parse(localStorage.getItem("income")) || [];
  const expenseData = JSON.parse(localStorage.getItem("expenses")) || [];

  const transactions = [
    ...incomeData.map(i => ({ ...i, type: "Income" })),
    ...expenseData.map(e => ({ ...e, type: "Expense" }))
  ];

  transactions.sort((a, b) => new Date(b.date) - new Date(a.date));

  const tbody = document.querySelector("#transactionsTable tbody");
  tbody.innerHTML = "";

  transactions.forEach(row => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${row.date}</td>
      <td style="color:${row.type === "Income" ? "green" : "red"}">${row.type}</td>
      <td>${row.category}</td>
      <td>${row.description || ""}</td>
      <td>${row.payment || "-"}</td>
      <td>₹${row.amount}</td>
      <td>
        <button onclick="deleteTransaction('${row.type}', ${row.id})">Delete</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function deleteTransaction(type, id) {
  if (type === "Income") {
    let incomeData = JSON.parse(localStorage.getItem("income")) || [];
    incomeData = incomeData.filter(item => item.id !== id);
    localStorage.setItem("income", JSON.stringify(incomeData));
  } else {
    let expenseData = JSON.parse(localStorage.getItem("expenses")) || [];
    expenseData = expenseData.filter(item => item.id !== id);
    localStorage.setItem("expenses", JSON.stringify(expenseData));
  }
  loadTransactions();
}

loadTransactions();
