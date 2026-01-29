import { useState } from "react";
import axios from "axios";

function LoginPage() {
  async function LoginSubmit() {
    const response = await axios.post(
      `${process.env.REACT_APP_HOST_URL}/Login`,
      {
        username,
        password,
      },
    );
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("userInfo", JSON.stringify(response.data.user));
  }
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleUsername() {
    setUsername(document.getElementById("id").value);
  }
  function handlePassword() {
    setPassword(document.getElementById("pw").value);
  }

  const handleLogin = async (e) => {
    e.preventDefault();

   try {
      await LoginSubmit();
      const token2 = localStorage.getItem("token");

      if (token2) {
        location.reload(true);
      } 
    } catch {
      alert("login 실패");
    }

  };
  return (
    <div>
      <form onSubmit={handleLogin}>
        <input required id="id" onChange={handleUsername} placeholder="Username / e-mail" />
        <input required
          id="pw"
          onChange={handlePassword}
          placeholder="Password"
          type="password"
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
export default LoginPage;