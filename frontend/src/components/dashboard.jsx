import React, { useEffect, useState } from "react";
import { Button, TextField } from "@mui/material";
import { handleError, handleSuccess } from "../utils";
import { ToastContainer } from "react-toastify";
// eslint-disable-next-line no-unused-vars
import * as bootstrap from "bootstrap";
import axios from "axios";
import "../App.css";
import { baseUrl } from "../url";

export function Dashboard() {
  // these name, phone, email for updating form into server
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [editId, setEditId] = useState("");
  const [allContacts, setAllContacts] = useState([]);
  const [refresh, setRefresh] = useState(false); // Refresh trigger state

  useEffect(() => {
    const fetchContacts = async () => {
      // Get values directly from localStorage
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");

      // Only fetch contacts if token and userId are available
      if (token && userId) {
        try {
          const response = await axios.get(
            `${baseUrl}/contacts/${userId}`,
            {
              headers: {
                Authorization: token, // Make sure to add 'Bearer' prefix for the token
              },
            }
          );
          setAllContacts(response.data); // Update state with contact data
        } catch (error) {
          console.error("Error fetching contacts:", error);
        }
      }
    };

    fetchContacts();
  }, [refresh]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = { name, phone, email };
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    try {
      const response = await fetch(
        `${baseUrl}/addcontact/${userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify(userData),
        }
      );

      const data = await response.json();

      if (response.ok && data.message) {
        handleSuccess("Contact added successfully!");
        setRefresh(true);
        setTimeout(() => {
          setRefresh(false);
        }, 1000);
      } else {
        handleError("Failed to add contact: " + data.message);
      }
    } catch (err) {
      handleError(
        "An unexpected error occurred while adding contact: " + err.message
      );
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const userData = { name, phone, email };
    console.log(name, phone, email, editId);
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `${baseUrl}/editcontact/${editId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify(userData),
        }
      );

      const data = await response.json();

      if (response.ok && data.message) {
        handleSuccess("Contact edited successfully!");
        setRefresh(true);
        setTimeout(() => {
          setRefresh(false);
        }, 1000);
      } else {
        handleError("Failed to edit contact: " + data.message);
      }
    } catch (err) {
      handleError(
        "An unexpected error occurred while editing contact: " + err.message
      );
    }
  };

  const HandleDeleteClick = async (id) => {
    const token = localStorage.getItem("token");

    try {
      await axios.delete(`${baseUrl}/deletecontact/${id}`, {
        headers: {
          Authorization: token,
        },
      });

      handleSuccess("Contact deleted successfully!");
      setRefresh(true);
      setTimeout(() => {
        setRefresh(false);
      }, 1000);
    } catch (err) {
      handleError(
        "An unexpected error occurred while deleting contact: " + err.message
      );
    }
  };

  return (
    <div className="ms-5 mt-5">
      <h1>Welcome to the Dashboard!</h1>
      <ToastContainer />
      <button
        data-bs-target="#addcontact"
        data-bs-toggle="modal"
        className="btn btn-success"
      >
        New Contact
      </button>

      {/* New Contact Form */}
      <div className="modal modal-fade" id="addcontact">
        <div className="modal-dialog modal-dialog-centered modal-sm">
          <div className="modal-content text-start">
            <div className="modal-header">
              <h4 className="p-2">Add Contacts</h4>
              <Button
                data-bs-dismiss="modal"
                className="btn btn-close"
              ></Button>
            </div>
            <div className="modal-body">
              <form className="ps-3 pe-4" onSubmit={handleSubmit}>
                <dl>
                  <dd>
                    <TextField
                      className="w-100"
                      name="name"
                      required
                      label="Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      variant="standard"
                    ></TextField>
                  </dd>
                  <dd className="text-danger"></dd>
                  <dd>
                    <TextField
                      className="w-100"
                      required
                      name="phone"
                      label="Phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      variant="standard"
                    ></TextField>
                  </dd>
                  <dd>
                    <TextField
                      className="w-100 mb-3"
                      name="email"
                      required
                      label="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      variant="standard"
                    ></TextField>
                  </dd>
                  <Button
                    data-bs-dismiss="modal"
                    type="submit"
                    variant="contained"
                    color="success"
                  >
                    Submit
                  </Button>
                </dl>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Show All contacts */}

      <div className="d-flex mt-2 flex-wrap">
        {allContacts.map((contact) => (
          <div key={contact._id}>
            <div
              id="card"
              className="card border-2  p-3 m-2 fs-5"
              style={{ width: "360px" }}
            >
              <div>Name: {contact.name}</div>
              <div>Phone: {contact.phone}</div>
              <div>Email: {contact.email}</div>
              {contact._id}
              <div className="mt-2 fs-5">
                <span
                  onClick={() => setEditId(contact._id)}
                  data-bs-toggle="modal"
                  data-bs-target="#editcontact"
                  className="bi bi-pencil-square"
                ></span>
                <span
                  onClick={() => HandleDeleteClick(contact._id)}
                  className="bi bi-trash3 ms-3"
                ></span>
              </div>
            </div>

            {/* Edit Contact Form */}
            <div className="modal modal-fade" id="editcontact">
              <div className="modal-dialog modal-dialog-centered modal-sm">
                <div className="modal-content text-start">
                  <div className="modal-header">
                    <h4 className="p-2">Edit Contact</h4>
                    <Button
                      data-bs-dismiss="modal"
                      className="btn btn-close"
                    ></Button>
                  </div>
                  <div className="modal-body">
                    <form
                      className="ps-3 pe-4"
                      onSubmit={(e) => handleEditSubmit(e, contact._id)}
                    >
                      <dl>
                        <dd>
                          <TextField
                            className="w-100"
                            name="name"
                            label="Name"
                            onChange={(e) => setName(e.target.value)}
                            variant="standard"
                          ></TextField>
                        </dd>
                        <dd className="text-danger"></dd>
                        <dd>
                          <TextField
                            className="w-100"
                            name="phone"
                            label="Phone"
                            onChange={(e) => setPhone(e.target.value)}
                            variant="standard"
                          ></TextField>
                        </dd>
                        <dd>
                          <TextField
                            className="w-100 mb-3"
                            name="email"
                            label="Email"
                            onChange={(e) => setEmail(e.target.value)}
                            variant="standard"
                          ></TextField>
                        </dd>
                        <Button
                          data-bs-dismiss="modal"
                          type="submit"
                          variant="contained"
                          color="success"
                        >
                          Submit
                        </Button>
                      </dl>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
