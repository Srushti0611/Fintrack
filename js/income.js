async function loadIncome() {
  try {
    const { data: { user }, error: userError } = await supabaseClient.auth.getUser();
    if (userError) throw userError;
    if (!user) {
      window.location.href = "login.html";
      return;
    }

    const { data, error } = await supabaseClient
      .from("income")
      .select("*")
      .eq("user_id", user.id)
      .order("date", { ascending: false });

    if (error) throw error;

    const tbody = document.querySelector("#incomeTable tbody");
    tbody.innerHTML = "";

    data.forEach(row => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${row.date}</td>
        <td>${row.source}</td>
        <td>${row.category}</td>
        <td>${row.description || ""}</td>
        <td>₹${row.amount}</td>
        <td>
          <button onclick="deleteIncome(${row.id})">Delete</button>
        </td>
      `;
      tbody.appendChild(tr);
    });
  } catch (err) {
    console.error("Error loading income:", err.message);
  }
}

document.getElementById("incomeForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  try {
    const { data: { user }, error: userError } = await supabaseClient.auth.getUser();
    if (userError) throw userError;
    if (!user) {
      window.location.href = "login.html";
      return;
    }

    const incomeData = {
      user_id: user.id,
      amount: parseFloat(document.getElementById("amount").value),
      source: document.getElementById("source").value,
      category: document.getElementById("category").value,
      date: document.getElementById("date").value,
      description: document.getElementById("description").value
    };

    const { error } = await supabaseClient.from("income").insert([incomeData]);
    if (error) throw error;

    alert("Income added successfully!");
    loadIncome();
    document.getElementById("incomeForm").reset();
  } catch (err) {
    alert("Error adding income: " + err.message);
  }
});

async function deleteIncome(id) {
  try {
    const { error } = await supabaseClient.from("income").delete().eq("id", id);
    if (error) throw error;

    alert("Income deleted!");
    loadIncome();
  } catch (err) {
    alert("Error deleting income: " + err.message);
  }
}

// Initial load
loadIncome();
