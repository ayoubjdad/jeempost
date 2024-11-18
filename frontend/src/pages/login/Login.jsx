import React, { useContext, useState } from "react";
import styles from "./Login.module.scss";
import { Button, TextField } from "@mui/material";
import { UserContext } from "../../context/UserProvider";
import { useNavigate } from "react-router";

export default function Login() {
  const { setConnected } = useContext(UserContext);
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      if (!username || !password) {
        setError("Login failed");
        return;
      }

      const usernames = [process.env.USERNAME, process.env.USERNAME2];
      const passwords = [process.env.PASSWORD, process.env.PASSWORD2];
      if (
        usernames.some((item) => item === username) &&
        passwords.some((item) => item === password)
      ) {
        setError("Login failed");
        return;
      }

      setConnected(true);
      navigate("/admin/news/add-new"); // Redirect to the desired route
    } catch (error) {
      setError("Login failed");
      return;
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <div className={styles.loginForm}>
          <TextField
            placeholder="Username"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            placeholder="Password"
            variant="outlined"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button variant="contained" onClick={handleLogin}>
            Login
          </Button>
          {error && <p className={styles.error}>{error}</p>}
        </div>
        <div className={styles.image} />
      </div>
    </div>
  );
}
