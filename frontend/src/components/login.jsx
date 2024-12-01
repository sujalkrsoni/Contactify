import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import { handleError, handleSuccess } from "../utils";
import { ToastContainer } from "react-toastify";
import { baseUrl } from "../url";

export function Login() {
  const navigate = useNavigate();
  const [userName, setUserId] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userName) {
      handleError("Username is required!");
    }
    if (!password) {
      handleError("Password is required!");
    }
    if (password && password.length < 4) {
      handleError("Password atleast 4 characters");
    }
    try {
      const response = await fetch(`${baseUrl}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userName, password }),
      });

      const data = await response.json();
      console.log("Login response:", data); // Log the response , it recevies from backend which is send in after login succesfully

      if (response.ok && data.message) {
        localStorage.setItem("token", data.jwtToken);
        localStorage.setItem("userName", data.userName);
        localStorage.setItem("userId", data.userId);
        handleSuccess("Login Successfully !");
        setTimeout(() => {
          navigate("/dashboard");
        }, 500);
      } else {
        if (response.status === 404) {
          handleError("User Doesn't Exists");
        } else if (response.status === 401) {
          handleError("Incorrect Password");
        } else {
          console.log("Registration failed", data.message);
        }
      }
    } catch (err) {
      console.log("Error during login:", err);
    }
  };

  return (
    <div className="d-flex flex-column login-form-div">
      <form
        className="form-control login-form p-5"
        style={{ width: "400px" }}
        onSubmit={handleSubmit}
      >
        <h2 className="text-center mb-4">Login On Contactify</h2>
        <dl>
          <dd>
            <TextField
              style={{ width: "300px", height: "60px" }}
              label="UserId"
              name="userName"
              value={userName}
              onChange={(e) => setUserId(e.target.value)}
              variant="standard"
            />
          </dd>
          <dd>
            <TextField
              style={{ width: "300px", height: "60px" }}
              label="Password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              variant="standard"
            />
          </dd>
          <Button
            className="w-100"
            type="submit"
            variant="contained"
            color="secondary"
          >
            Submit
          </Button>
        </dl>
        <span>
          Doesn't have an Account <Link to="/register">Register</Link>
        </span>
        <ToastContainer />
      </form>
    </div>
  );
}
