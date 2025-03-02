import { signOut } from "firebase/auth";
import React, { useContext, useEffect, useState } from "react";
import { FaAngleDown } from "react-icons/fa6";
import { FiLogOut } from "react-icons/fi";
import { IoMdContact } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";
import { auth } from "../services/FirebaseConfig";

export const TaskManagementNavBar = ({ searchTitle, handleSearch }) => {
  const { user } = useContext(UserContext);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  // Toggle the dropdown visibility
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  // Hide the dropdown when clicking outside
  const handleOutsideClick = (e) => {
    if (!e.target.closest("#profile-section")) {
      setShowDropdown(false);
    }
  };

  const handleSignOut = () => {
    signOut(auth).then(() => {
      navigate("/signin");
    });
  };

  // Attach and detach the event listener
  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <div className="p-5">
      <div className="bg-secondary flex justify-between items-center px-9 py-3 shadow-sm rounded-xl">
        <div className="logo">
          <p className="text-text-color font-bold text-3xl">PlannIt</p>
        </div>
        <div className="search-bar hidden w-[500px] md:flex items-center border-2 border-text-color gap-2 p-1 rounded-md">
          <IoSearch size={25} />
          <input
            type="text"
            name="search-bar"
            id="search-bar-nav"
            className="border-none focus:outline-none w-full"
            placeholder="Search task title"
            value={searchTitle}
            onChange={handleSearch}
          />
        </div>
        <div
          id="profile-section"
          className="profile relative md:w-[200px] flex justify-center items-center gap-2 cursor-pointer"
          onClick={toggleDropdown}
        >
          <IoMdContact size={30} />
          <p className="text-text-color hidden md:flex items-center gap-2.5 font-medium">
            <span className="select-none">Hi, {user ? user.name : ""}</span>
            <FaAngleDown />
          </p>

          {showDropdown && (
            <div className=" absolute flex flex-col right-0 top-6 mt-2 w-[200px] md:w-full bg-white border rounded-lg shadow-lg overflow-hidden z-50">
              <p className="text-text-color pl-4 pt-2.5 md:hidden font-medium">
                <span className="select-none">Hi, {user ? user.name : ""}</span>
              </p>
              <button
                onClick={handleSignOut}
                className="w-full select-none flex items-center justify-between text-left px-4 py-2 hover:bg-gray-100"
              >
                Sign Out <FiLogOut />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
