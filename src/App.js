import React, { useState } from "react";
import { auth, provider, signInWithPopup, signOut } from "./firebase";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const { displayName, email, photoURL } = result.user;
      setUser({ name: displayName, email, photo: photoURL });
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="App">
      {!user ? (
        <div>
          <h1>Google Authentication App</h1>
          <button onClick={handleLogin}>Sign in with Google</button>
        </div>
      ) : (
        <div>
          <h1>Welcome, {user.name}!</h1>
          <p>Email: {user.email}</p>
          <img src={user.photo} alt="Profile" style={{ borderRadius: "50%" }} />
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
}

export default App;
