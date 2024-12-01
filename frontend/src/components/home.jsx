import {
  Link,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { Login } from "./login";
import { Register } from "./register";
import { Dashboard } from "./dashboard";
import { useEffect, useState } from "react";
import { handleSuccess } from "../utils";
import ProtectedRoute from "../protectRoute";
import { MainLeft } from "./mainLeftContent";

export function Home() {
  const [isLogedIn, setLogedIn] = useState(false);
  const navigate = useNavigate();
  const user = localStorage.getItem("userName");
  const location = useLocation(); // Get current location (URL)

  // Function to determine if a nav item is active based on the current URL
  const isActive = (path) => location.pathname === path;
  useEffect(() => {
    if (user) {
      setLogedIn(true);
    }
  }, [user, isLogedIn]);

  function HandleLogout() {
    localStorage.removeItem("userName");
    localStorage.removeItem("token");
    handleSuccess("Logout Successfully!");
    setLogedIn(false);
    navigate("/login");
  }

  return (
    <div className="content">
      {/* Navigation bar */}
      <header className="navbar navbar-expand-lg navbar-light bg-transparent ms-5 me-5">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand fs-3 fw-bold">
            Contactify
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto fs-5">
              <li className="nav-item">
                <Link
                  to="/"
                  className={`nav-link ${isActive("/") ? "active-link" : ""}`}
                >
                  Home
                </Link>
              </li>
              {isLogedIn ? (
                <>
                  <li className="nav-item">
                    <Link
                      to="/dashboard"
                      className={`nav-link ${
                        isActive("/dashboard") ? "active-link" : ""
                      }`}
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li className="nav-item">
                    <i
                      className="bi-box-arrow-right nav-link cursor-pointer"
                      onClick={HandleLogout}
                    >
                      Logout
                    </i>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link to="/register" className={`nav-link ${isActive("/register") ? "active-link" : ""}`}>
                      Signup
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/login" className={`nav-link ${isActive("/login") ? "active-link" : ""}`}>
                      Login
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="hero">
        <div className="hero-left col-7">
          <Routes>
            <Route path="/" element={<MainLeft />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </div>
    </div>
  );
}
