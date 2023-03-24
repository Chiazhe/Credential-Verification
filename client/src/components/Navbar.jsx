import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../context";
import { logo } from "../assets";
import CustomButton from "./CustomButton";

const Navbar = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState("nav__menu");
  const [icon, setIcon] = useState("nav__toggler");
  const [admin, setAdmin] = useState(false);
  const { connect, address, isAdmin, contract } = useStateContext();

  const navToggle = () => {
    if (active === "nav__menu") {
      setActive("nav__menu nav__active");
    } else setActive("nav__menu");

    // Icon Toggler
    if (icon === "nav__toggler") {
      setIcon("nav__toggler toggle");
    } else setIcon("nav__toggler");
  };

  const getIsAdmin = async () => {
    const data = await isAdmin();
    setAdmin(data);
  };

  useEffect(() => {
    if (address === "0xFD0EF809F8A088fEDC790c9EB29CdA198570258c")
      setAdmin(true);
    else setAdmin(false);
  }, [address, contract]);

  // useEffect(() => {
  //   console.log("Navbar checking whether is admin");
  //   getIsAdmin();
  // }, [address, contract]);

  return (
    <nav className="navbar-container">
      <div className="navbar">
        <div className="navbar-logo">
          <img src={logo} />
        </div>
        <div className={active}>
          <CustomButton
            btnType="button"
            title="Home"
            styles={`nav-button nav__item`}
            handleClick={() => navigate("")}
          />
          <CustomButton
            btnType="button"
            title="Profile"
            styles={`nav-button nav__item`}
            handleClick={() => navigate("view")}
          />
          <CustomButton
            btnType="button"
            title="Verify"
            styles={`nav-button nav__item`}
            handleClick={() => navigate("verify")}
          />
          <CustomButton
            btnType="button"
            title={address ? "Create a credetial" : "Connect"}
            styles={`nav-button nav__item`}
            handleClick={() => {
              if (address) navigate("issue");
              else connect();
            }}
          />
          {admin && (
            <CustomButton
              btnType="button"
              title="Grant Role"
              styles={`nav-button nav__item`}
              handleClick={() => {
                navigate("grant");
              }}
            />
          )}
        </div>
        <div onClick={navToggle} className={icon}>
          <div className="line1"></div>
          <div className="line2"></div>
          <div className="line3"></div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
