import React, { useState } from "react";
import styles from "./Login.module.scss";
import { Button, TextField } from "@mui/material";
import axios from "axios";
import { serverUrl } from "../../api/config";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${serverUrl}/api/login`, {
        username,
        password,
      });
      alert(response.data.message);
    } catch (err) {
      setError(err.response?.data.message || "Login failed");
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
