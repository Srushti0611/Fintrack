function loadAnalytics() {
  const incomeData = JSON.parse(localStorage.getItem("income")) || [];
  const expenseData = JSON.parse(localStorage.getItem("expenses")) || [];

  const totalIncome = incomeData.reduce((sum, i) => sum + i.amount, 0);
  const totalExpenses = expenseData.reduce((sum, e) => sum + e.amount, 0);

  // Chart 1: Income vs Expenses
  new Chart(document.getElementById("incomeExpenseChart"), {
    type: "bar",
    data: {
      labels: ["Income", "Expenses"],
      datasets: [{
        label: "Amount (₹)",
        data: [totalIncome, totalExpenses],
        backgroundColor: ["green", "red"]
      }]
    }
  });

  // Chart 2: Expenses by Category
  const categories = [...new Set(expenseData.map(e => e.category))];
  const categoryTotals = categories.map(cat =>
    expenseData.filter(e => e.category === cat).reduce((sum, e) => sum + e.amount, 0)
  );

  new Chart(document.getElementById("expenseCategoryChart"), {
    type: "pie",
    data: {
      labels: categories,
      datasets: [{
        data: categoryTotals,
        backgroundColor: [
          "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0",
          "#9966FF", "#FF9F40", "#66FF66", "#FF6666"
        ]
      }]
    }
  });
}

loadAnalytics();
