function loadSavings() {
  const goals = JSON.parse(localStorage.getItem("savings")) || [];

  // Calculate balance from income - expenses
  const incomeData = JSON.parse(localStorage.getItem("income")) || [];
  const expenseData = JSON.parse(localStorage.getItem("expenses")) || [];
  const totalIncome = incomeData.reduce((sum, i) => sum + i.amount, 0);
  const totalExpenses = expenseData.reduce((sum, e) => sum + e.amount, 0);
  const balance = totalIncome - totalExpenses;

  const savingsList = document.getElementById("savingsList");
  savingsList.innerHTML = "";

  goals.forEach(goal => {
    const percent = Math.min((balance / goal.target) * 100, 100);

    const div = document.createElement("div");
    div.className = "savings-card";
    div.innerHTML = `
      <h3>${goal.name}</h3>
      <p>Target: ₹${goal.target}</p>
      <p>Current Balance: ₹${balance}</p>
      <div class="progress-bar">
        <div class="progress" style="width:${percent}%; background:${percent >= 100 ? 'green' : 'orange'}"></div>
      </div>
      <button onclick="deleteGoal('${goal.name}')">Delete</button>
    `;
    savingsList.appendChild(div);
  });
}

document.getElementById("savingsForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const goals = JSON.parse(localStorage.getItem("savings")) || [];

  const newGoal = {
    name: document.getElementById("goal").value,
    target: parseFloat(document.getElementById("target").value)
  };

  // Replace existing goal with same name
  const updatedGoals = goals.filter(g => g.name !== newGoal.name);
  updatedGoals.push(newGoal);

  localStorage.setItem("savings", JSON.stringify(updatedGoals));

  alert("Savings goal added!");
  loadSavings();
  document.getElementById("savingsForm").reset();
});

function deleteGoal(name) {
  let goals = JSON.parse(localStorage.getItem("savings")) || [];
  goals = goals.filter(g => g.name !== name);
  localStorage.setItem("savings", JSON.stringify(goals));
  loadSavings();
}

loadSavings();
