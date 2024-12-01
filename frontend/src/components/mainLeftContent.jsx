import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export function MainLeft() {
  const [isLoggedIn, setIsLoggedIn] = useState("");
  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("userName"));
  }, []);
  return (
    <div id="mainLeftContent" className="m-5 pt-5 pe-5 ">
      <h1>Welcome to Contactify</h1>
      <p className="fs-4">
        Contactify is an easy-to-use application that allows you to manage your
        contact list effortlessly. With Contactify, you can add, edit, delete,
        and view contacts in a simple and organized way. Whether you need to
        store phone numbers, email addresses, or any other personal information,
        Contactify helps you keep everything in one place. Your contacts are
        private and protected with secure login, ensuring that only you have
        access to them.
      </p>
      {isLoggedIn ? (
        <Link to="/dashboard" className="link btn btn-dark p-3 fs-5 text-white">
          Manage Contacts
        </Link>
      ) : (
        <Link to="/login" className="link btn btn-dark p-3 fs-5 text-white">
          Manage Contacts
        </Link>
      )}
    </div>
  );
}
