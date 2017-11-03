import React, { Component } from "react";

class Header extends Component {
  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <a href="/" className="brand-logo left">
            Emaily React Application
          </a>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li>
              <a href="/auth/google" className="waves-effect waves-light btn">
                Login With Google
              </a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Header;
