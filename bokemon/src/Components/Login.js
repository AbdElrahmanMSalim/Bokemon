import React, { useRef, useState } from "react";
import BackgroundImage from "../Assets/favicon-50.png";
import { Typography, Box, TextField, Button, CircularProgress } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Factories/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(e) {
    console.log("emailRef", email);
    console.log("passwordRef", password);

    try {
      setError("");
      setLoading(true);
      await login(email, password);
      navigate("/", { replace: true });
    } catch (error) {
      console.log("error", error);
      setError("Failed To Login: " + error.message);
    }

    setLoading(false);
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  console.log("error", error);

  return (
    <Box
      style={{
        background: `url(${BackgroundImage}) no-repeat`,
        backgroundPosition: "122% -3%",
        backgroundColor: "snow",
        backgroundSize: "contain",
        height: "83vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography variant="h3" component="div" style={{ margin: 8, fontSize: "2.5rem" }}>
        Sign In
      </Typography>

      {error && (
        <Typography variant="h5" style={{ color: "red", padding: 8 }}>
          {error}
        </Typography>
      )}

      <TextField
        id="outlined-basic"
        label="Email"
        variant="outlined"
        style={{ margin: 8 }}
        value={email}
        onChange={handleEmailChange}
      />
      <TextField
        id="outlined-password-input"
        label="Password"
        type="password"
        autoComplete="current-password"
        style={{ margin: 8 }}
        value={password}
        onChange={handlePasswordChange}
      />
      <Button
        variant="contained"
        disabled={loading}
        onClick={handleSubmit}
        style={{ marginTop: 16 }}
      >
        Submit
      </Button>
      <Box m={2}>
        Need an account? <Link to="/signup">Sign Up</Link>
      </Box>
    </Box>
  );
}
