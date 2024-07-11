import "../App.css";
import React from "react";
import {
  Typography,
  AppBar,
  Toolbar,
  TextField,
  Button,
} from "@material-ui/core";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  React.useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users"));
    const userExists = users.find(
      (user) =>
        user.username === e.target.username.value &&
        user.password === e.target.password.value
    );
    if (userExists) {
      localStorage.setItem("token", JSON.stringify(userExists));
      navigate("/");
    } else {
      alert("User does not exist");
    }
  };
  const customStyle = {
    margin: "5px",
    marginTop: "10px",
    marginBottom: "10px",
    width: "100%",
    height: "50px",
    borderRadius: "5px",
    fontSize: "16px",
  };

  return (
    <div className="App">
      <AppBar>
        <Toolbar>
          <Typography variant="h6" color="inherit">
            Let's Learn Routes
          </Typography>
        </Toolbar>
      </AppBar>
      <div style={{ marginTop: "90px" }} />

      <Typography variant="h5" color="primary">
        Login
      </Typography>
      <form onSubmit={onSubmit}>
        <TextField
          style={customStyle}
          type="text"
          label="Username"
          variant="outlined"
          name="username"
          required
        />
        <TextField
          style={customStyle}
          type="password"
          label="Password"
          variant="outlined"
          name="password"
          required
        />
        <Button
          style={customStyle}
          variant="contained"
          color="primary"
          type="submit"
        >
          Login
        </Button>
      </form>
      <Typography variant="h6" color="primary">
        Already have an account?
      </Typography>
      <Typography variant="h5" color="primary">
        <Link to="/register">Register</Link>
      </Typography>
    </div>
  );
};

export default Login;
