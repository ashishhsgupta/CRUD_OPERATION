import React, { useState } from "react";
import "../style.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const UserData = () => {
  const navigate = useNavigate();

  const [userInput, setUserInput] = useState({
    firstName: "",
    lastName: "",
    email: "",
    profile: "",
  });
  const [error, setError] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInput({ ...userInput, [name]: value });
  };


  const savedata = async () => {
    console.log("user data is--", userInput);
    try {
      const res = await axios.post(
        `/v1/api/postuserData`,
        userInput
      );
      console.log(res.data);
    } catch (error) {
      console.error("Error saving data:", error);
    }
    console.log("savedata");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!userInput.firstName.trim()) {
      validationErrors.firstName = "First name is required.";
    }
    if (!userInput.lastName.trim()) {
      validationErrors.lastName = "Last name is required.";
    }
    if (!userInput.email.trim()) {
      validationErrors.email = "Email is required.";
    } else if (!emailPattern.test(userInput.email)) {
      validationErrors.email = "Enter valid email";
    }
    if (!userInput.profile.trim()) {
      validationErrors.profile = "Profile name is required.";
    }
    setError(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      await savedata();
      alert("Data saved successfully");
      navigate("/dataTable");
    }
  };

  return (
    <div>
    <div className="container">
      <h2>CRUD OPERATION</h2>
      <form className="sub-container" onSubmit={handleSubmit}>
        <div className="row">
          <div className="col">
            <div className="form-outline">
              {error.firstName && (
                <span className="inputErrors">{error.firstName}</span>
              )}
              <br />
              <input
                type="text"
                onChange={handleChange}
                value={userInput.firstName}
                className="form-control"
                name="firstName"
                maxLength={20}
              />
              <label className="form-label">First name</label>
            </div>
          </div>
          <div className="col">
            <div className="form-outline">
              {error.lastName && (
                <span className="inputErrors">{error.lastName}</span>
              )}
              <br />
              <input
                type="text"
                onChange={handleChange}
                value={userInput.lastName}
                className="form-control"
                name="lastName"
                maxLength={20}
              />
              <label className="form-label">Last name</label>
            </div>
          </div>
        </div>
        <div className="form-outline">
          {error.email && <span className="inputErrors">{error.email}</span>}
          <br />
          <input
            type="email"
            onChange={handleChange}
            value={userInput.email}
            className="form-control"
            name="email"
            maxLength={35}
          />
          <label className="form-label">Email address</label>
        </div>

        <div className="form-outline">
          {error.profile && (
            <span className="inputErrors">{error.profile}</span>
          )}
          <br />
          <input
            type="text"
            onChange={handleChange}
            value={userInput.profile}
            className="form-control"
            name="profile"
            maxLength={20}
          />
          <label className="form-label">Profile</label>
        </div>

        <button
          type="submit"
          onClick={savedata}
          className="btn btn-primary mb-4 tablebtn"
        >
          ADD TO TABLE
        </button>
        

        <div className="text-center">
          <p>Learn with us: [MERN]</p>
          <button type="button" className="btn btn-secondary mx-1">
            <i className="fab fa-facebook-f"></i>
          </button>

          <button type="button" className="btn btn-secondary mx-1">
            <i className="fab fa-google"></i>
          </button>

          <button type="button" className="btn btn-secondary mx-1">
          <i className="fab fa-facebook-f"></i>
          </button>

          <button type="button" className="btn btn-secondary mx-1">
          <i className="fab fa-facebook-f"></i>
          </button>
        </div>
        <div className="myEmail">
          <h5>ashishhsgupta11@gmail.com</h5>
        </div>
      </form>
    </div>
    </div>
  );
};
export default UserData;
