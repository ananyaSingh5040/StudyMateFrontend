const BASE_URL = "http://localhost:5000/api/auth"; // or your deployed backend

export const registerUser = async (name, email, password) => {
  const res = await fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Signup failed");
  return data; // contains token & user
};
export const loginUser = async (email, password) => {
  const res = await fetch("http://localhost:5000/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json(); 

  if (!res.ok) throw new Error(data.error || "Login failed");

  const userId = localStorage.getItem("userId");
if (!userId || userId === "null") {
  throw new Error("User ID not found. Please login again.");
}


  return data;
};



