import React from "react";
import { Component } from "react";
import { Outlet, Link } from "react-router-dom";

import "./assets/styles.css";
import logo from "./assets/E-Certo.svg";
class Navbar extends Component {
  render() {
    return (
      <>
        <header>
          <nav class="navbar navbar-expand-lg">
            <div class="container-fluid">
              <Link to="/">
                <span className="navbar-logo">
                  <img src={logo} alt="" />
                </span>
              </Link>

              <div>
                <div class="navbar-nav">
                  {this.props.accountAddress ===
                    "0x41e5226215F536572DDa181e797Deb1878D94e3D" ||
                  this.props.accountAddress ===
                    "0xB641B4F1795a4BfA2cC7056E08cFB2b199831248" ? (
                    <>
                      <Link to="/dashboard" id="all" class="navbar-link">
                        Dashboard
                      </Link>
                      <Link to="/event-certificates" id="all2" class="navbar-link">
                        Event Certificate
                      </Link>
                      <Link
                        to="/certificates/recipients"
                        id="create"
                        class="navbar-link"
                      >
                        Issue Certificate
                      </Link>

                      <Link
                        to="/findmycertificate"
                        id="query"
                        class="navbar-link"
                      >
                        Query
                      </Link>
                    </>
                  ) : (
                    <Link
                      to="/findmycertificate"
                      id="query"
                      class="navbar-link"
                    >
                      Lost your Certficate?
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </nav>
        </header>
        <Outlet />
        <footer>
          <span>© 2022 Certifier. All rights reserved.</span>
        </footer>
      </>
    );
  }
}
export default Navbar;
