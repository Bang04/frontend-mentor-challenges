import React, { useState } from "react";
import "./Header.css";

const Header = () => {
  const [isOpenMenu , setIsOpenMenu ] = useState(false);
  const menuOpen = () =>{
    setIsOpenMenu(!isOpenMenu);
  }

    return(
    <div className="header">
      <div className="container is-max-desktop is-flex is-align-items-center is-justify-content-space-between py-5">
        <a className="is-size-5 has-text-weight-bold has-text-white">crowdfund</a>
        <div className={ `navbar-burger has-text-white is-hidden-tablet is-hidden-desktop ${isOpenMenu ? "is-active" : ""}`} onClick={() => menuOpen()}>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
        </div>
        <div className="is-flex is-hidden-mobile ">
          <div className="navbar-item is-size-7 has-text-white has-text-weight-medium mx-1">About</div>
          <div className="navbar-item is-size-7 has-text-white has-text-weight-medium mx-1">Discover</div>
          <div className="navbar-item is-size-7 has-text-white has-text-weight-medium mx-1">Get Started</div>
        </div>
      </div>
      <div className={`mobile-munu is-overlay navbar-menu is-hidden-desktop is-hidden-tablet is-relative mx-5 py-0 ${isOpenMenu ? "is-active" : ""} `}>
          <div className="navbar-item is-size-6 has-background-white has-text-black has-text-weight-medium pl-5 py-4">About</div>
          <div className="navbar-item is-size-6 has-background-white has-text-black has-text-weight-medium pl-5 py-3">Discover</div>
          <div className="navbar-item is-size-6 has-background-white has-text-black has-text-weight-medium pl-5 py-3">Get Started</div>
      </div>
    </div>
    )
};

export default Header;