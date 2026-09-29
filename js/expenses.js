async function loadExpenses() {
  try {
    const { data: { user }, error: userError } = await supabaseClient.auth.getUser();
    if (userError) throw userError;
    if (!user) {
      window.location.href = "login.html";
      return;
    }

    const { data, error } = await supabaseClient
      .from("expenses")
      .select("*")
      .eq("user_id", user.id)
      .order("date", { ascending: false });

    if (error) throw error;

    const tbody = document.querySelector("#expenseTable tbody");
    tbody.innerHTML = "";

    data.forEach(row => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${row.date}</td>
        <td>${row.category}</td>
        <td>${row.payment_method}</td>
        <td>${row.description || ""}</td>
        <td>₹${row.amount}</td>
        <td>
          <button onclick="deleteExpense(${row.id})">Delete</button>
        </td>
      `;
      tbody.appendChild(tr);
    });
  } catch (err) {
    console.error("Error loading expenses:", err.message);
  }
}

document.getElementById("expenseForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  try {
    const { data: { user }, error: userError } = await supabaseClient.auth.getUser();
    if (userError) throw userError;
    if (!user) {
      window.location.href = "login.html";
      return;
    }

    const expenseData = {
      user_id: user.id,
      amount: parseFloat(document.getElementById("amount").value),
      category: document.getElementById("category").value,
      payment_method: document.getElementById("payment").value,
      date: document.getElementById("date").value,
      description: document.getElementById("description").value
    };

    const { error } = await supabaseClient.from("expenses").insert([expenseData]);
    if (error) throw error;

    alert("Expense added successfully!");
    loadExpenses();
    document.getElementById("expenseForm").reset();
  } catch (err) {
    alert("Error adding expense: " + err.message);
  }
});

async function deleteExpense(id) {
  try {
    const { error } = await supabaseClient.from("expenses").delete().eq("id", id);
    if (error) throw error;

    alert("Expense deleted!");
    loadExpenses();
  } catch (err) {
    alert("Error deleting expense: " + err.message);
  }
}

// Initial load
loadExpenses();
