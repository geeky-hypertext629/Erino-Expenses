import React, { useState } from "react";
import { TextField, Button, Container, Typography, Box, Alert, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { login } from "../services/api";

const LoginPage = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await login({ email, password });
      if (response.status === 200) {
        setIsAuthenticated(true);
        navigate("/dashboard");
      }
    } catch (err) {
      setError("Invalid email or password. Please try again.");
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 10 }}>
        <Typography variant="h3" sx={{ fontWeight: "bold", color: "#1976d2", mb: 2 }}>
          Expense Tracker
        </Typography>
        <Paper elevation={3} sx={{ padding: 4, borderRadius: 2, width: "100%" }}>
          <Typography variant="h5" gutterBottom textAlign="center">
            Login
          </Typography>
          {error && <Alert severity="error">{error}</Alert>}
          <Box component="form" onSubmit={handleLogin} sx={{ mt: 2 }}>
            <TextField
              label="Email"
              type="email"
              fullWidth
              margin="normal"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ mt: 3, py: 1.5, fontSize: "1rem", fontWeight: "bold", transition: "0.3s", "&:hover": { backgroundColor: "#1565c0" } }}
            >
              Login
            </Button>
            <Typography variant="body2" sx={{ mt: 2, textAlign: "center" }}>
              Don't have an account? <Button onClick={() => navigate("/register")} sx={{ textTransform: "none" }}>Sign Up</Button>
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default LoginPage;
