import React, { FormEvent, useState } from "react";
import { Button, TextField, Typography } from "@mui/material";
import service from "../service";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../authProvider";

function Login() {
  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuth();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await service.login(email, password);
      setIsAuthenticated(true);
      navigate("/users");
    } catch (err: any) {
      console.log(err);
      setError(err.error || "Login failed");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="container">
      <Typography
        color="primary"
        sx={{ textTransform: "uppercase", marginBottom: "30px" }}
      >
        Login page
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          id="input-email"
          label="Email"
          variant="outlined"
          onChange={(e) => setEmail(e.target.value)}
          sx={{ marginRight: "30px" }}
        />
        <TextField
          id="input-password"
          label="Password"
          variant="outlined"
          onChange={(e) => setPassword(e.target.value)}
          sx={{ marginRight: "30px" }}
        />
        <Button
          type="submit"
          title="Login"
          variant="outlined"
          disabled={loading}
          sx={{ width: "195px", height: "56px" }}
        >
          Login
        </Button>
        {error && <Typography color="error">{error}</Typography>}
      </form>
    </div>
  );
}

export default Login;
