function loadBudgets() {
  const budgets = JSON.parse(localStorage.getItem("budgets")) || [];
  const expenses = JSON.parse(localStorage.getItem("expenses")) || [];

  const budgetList = document.getElementById("budgetList");
  budgetList.innerHTML = "";

  budgets.forEach(budget => {
    // Calculate total spent in this category
    const spent = expenses
      .filter(e => e.category === budget.category)
      .reduce((sum, e) => sum + e.amount, 0);

    const percent = Math.min((spent / budget.limit) * 100, 100);

    const div = document.createElement("div");
    div.className = "budget-card";
    div.innerHTML = `
      <h3>${budget.category}</h3>
      <p>Limit: ₹${budget.limit}</p>
      <p>Spent: ₹${spent}</p>
      <div class="progress-bar">
        <div class="progress" style="width:${percent}%; background:${percent >= 100 ? 'red' : 'green'}"></div>
      </div>
      <button onclick="deleteBudget('${budget.category}')">Delete</button>
    `;
    budgetList.appendChild(div);
  });
}

document.getElementById("budgetForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const budgets = JSON.parse(localStorage.getItem("budgets")) || [];

  const newBudget = {
    category: document.getElementById("category").value,
    limit: parseFloat(document.getElementById("limit").value)
  };

  // Replace existing budget for same category
  const updatedBudgets = budgets.filter(b => b.category !== newBudget.category);
  updatedBudgets.push(newBudget);

  localStorage.setItem("budgets", JSON.stringify(updatedBudgets));

  alert("Budget set successfully!");
  loadBudgets();
  document.getElementById("budgetForm").reset();
});

function deleteBudget(category) {
  let budgets = JSON.parse(localStorage.getItem("budgets")) || [];
  budgets = budgets.filter(b => b.category !== category);
  localStorage.setItem("budgets", JSON.stringify(budgets));
  loadBudgets();
}

loadBudgets();
