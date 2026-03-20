const API_URL = "http://localhost:4000/users"; // Your NestJS backend

const form = document.getElementById("registerForm");
const messageDiv = document.getElementById("message");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    if (!res.ok) {
      const err = await res.json();
      messageDiv.textContent = err.message || "Error registering user";
      messageDiv.style.color = "red";
      return;
    }

    const data = await res.json();
    messageDiv.textContent = `User ${data.name} registered successfully!`;
    messageDiv.style.color = "green";

    // Reset form
    form.reset();
  } catch (error) {
    messageDiv.textContent = "Server error. Try again.";
    messageDiv.style.color = "red";
    console.error(error);
  }
});
