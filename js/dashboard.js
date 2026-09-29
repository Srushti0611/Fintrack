function loadDashboard() {
  const incomeData = JSON.parse(localStorage.getItem("income")) || [];
  const expenseData = JSON.parse(localStorage.getItem("expenses")) || [];
  const budgets = JSON.parse(localStorage.getItem("budgets")) || [];
  const savingsGoals = JSON.parse(localStorage.getItem("savings")) || [];

  // Totals
  const totalIncome = incomeData.reduce((sum, i) => sum + i.amount, 0);
  const totalExpenses = expenseData.reduce((sum, e) => sum + e.amount, 0);
  const balance = totalIncome - totalExpenses;

  document.getElementById("income").textContent = `₹${totalIncome}`;
  document.getElementById("expenses").textContent = `₹${totalExpenses}`;
  document.getElementById("balance").textContent = `₹${balance}`;
  document.getElementById("savings").textContent = `₹${balance * 0.2}`; // Example: 20% savings potential

  // Chart 1: Income vs Expenses
  new Chart(document.getElementById("incomeExpenseChart"), {
    type: "bar",
    data: {
      labels: ["Income", "Expenses"],
      datasets: [{
        label: "Amount (₹)",
        data: [totalIncome, totalExpenses],
        backgroundColor: ["#22c55e", "#ef4444"]
      }]
    }
  });

  // Chart 2: Expenses by Category
  const categories = [...new Set(expenseData.map(e => e.category))];
  const categoryTotals = categories.map(cat =>
    expenseData.filter(e => e.category === cat).reduce((sum, e) => sum + e.amount, 0)
  );

  new Chart(document.getElementById("categoryChart"), {
    type: "pie",
    data: {
      labels: categories,
      datasets: [{
        data: categoryTotals,
        backgroundColor: ["#facc15", "#3b82f6", "#ec4899", "#10b981", "#ff9f40", "#a855f7"]
      }]
    }
  });
}

loadDashboard();