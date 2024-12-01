import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export function Header() {
  const [isLogedIn, setLogedIn] = useState(false);
  useEffect(() => {
    const user = localStorage.getItem("userName");
    if (user) {
      setLogedIn(true);
    }
  }, []);
  return (
    <header className="d-flex justify-content-between navbar ms-5 me-5">
      <span className="fs-3 fw-bold">Contactify</span>
      <span>
        {isLogedIn === true ? (
          <ul className="navbar fs-5">
            <li className="nav ms-5">Home</li>
            <Link to="/register" className="nav ms-5">
              Sign up
            </Link>
            <Link to="/login" className="nav ms-5">
              Login
            </Link>
          </ul>
        ) : (
          " "
        )}
      </span>
    </header>
  );
}
