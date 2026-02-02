import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { removeUser } from "../redux/userSlice";
import "../CSS/Header.css";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    alert("Logout Successfully");
    dispatch(removeUser());
    navigate("/");
  };

  return (
    <header className="app-header">
      <Link to="/home" className="header-link">
        <button className="header-btn">Home</button>
      </Link>

      <button className="header-btn logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </header>
  );
};

export default Header;
