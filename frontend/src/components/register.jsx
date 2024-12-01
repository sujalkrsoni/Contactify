import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../utils";
import { ToastContainer } from "react-toastify";

export function Register() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = { userName, password, email };
    if (!userName) {
      handleError("Name is required !");
    }
    if (!email) {
      handleError("Email is required !");
    }
    if (!password) {
      handleError("Password required");
    }
    if (password.length < 4) {
      handleError("Password atleast 4 character");
    }

    try {
      const response = await fetch(`http://localhost:5000/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      // Check if response was successful before navigating
      if (response.ok && data.message) {
        handleSuccess("Registered Successfully!");
        setTimeout(() => {
          navigate("/login");
        }, 500);
      } else {
        if (response.status === 409) {
          handleError("User Already Exists");
        } else {
          console.log("Registration failed", data.message);
        }
      }
    } catch (err) {
      console.log("An unexpected error occurred:", err);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="register-form-div form-control p-5"
        style={{ width: "400px" }}
      >
        <p className="fw-bold fs-3">Register On Contactify</p>
        <dl>
          <dd>
            <TextField
              style={{ width: "300px", height: "60px" }}
              label="Username"
              name="userName"
              variant="standard"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </dd>
          <dd>
            <TextField
              style={{ width: "300px", height: "60px" }}
              label="Password"
              name="password"
              variant="standard"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </dd>
          <dd>
            <TextField
              style={{ width: "300px", height: "60px" }}
              label="Email"
              name="email"
              variant="standard"
              value={email}
              type="email"
              onChange={(e) => setEmail(e.target.value)}
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
          Already have an Account ?<Link>Login</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
}
