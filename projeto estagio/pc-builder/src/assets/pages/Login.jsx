import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleAuth = () => {
    if (email && password) {
      localStorage.setItem("user", email);
      navigate("/");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Login / Criar Conta</h2>

      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <br /><br />

      <button onClick={handleAuth}>Entrar</button>
    </div>
  );
}