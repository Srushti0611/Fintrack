function loadProfile() {
  const profile = JSON.parse(localStorage.getItem("profile")) || null;
  const display = document.getElementById("profileDisplay");

  if (profile) {
    display.innerHTML = `
      <p><strong>Name:</strong> ${profile.name}</p>
      <p><strong>Email:</strong> ${profile.email}</p>
      <p><strong>Currency:</strong> ${profile.currency}</p>
    `;
    document.getElementById("name").value = profile.name;
    document.getElementById("email").value = profile.email;
    document.getElementById("currency").value = profile.currency;
  } else {
    display.innerHTML = "<p>No profile saved yet.</p>";
  }
}

document.getElementById("profileForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const profile = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    currency: document.getElementById("currency").value
  };

  localStorage.setItem("profile", JSON.stringify(profile));

  alert("Profile saved successfully!");
  loadProfile();
});

loadProfile();
