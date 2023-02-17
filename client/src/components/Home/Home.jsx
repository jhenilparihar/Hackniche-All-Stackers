import React, { useEffect } from "react";
import "./assets/style.css";
import banner from "./assets/image/banner.png";
import create from "./assets/image/create.png";
import issue from "./assets/image/issue.png";
import manage from "./assets/image/manage.png";
import share from "./assets/image/share.png";
import verify from "./assets/image/verify.png";

const Home = ({ handleActiveLink, connectToMetamask, isMetamaskConnected }) => {
  useEffect(() => {
    if (isMetamaskConnected) {
      document.querySelector("#home-div").classList.remove("home-div");
      handleActiveLink("");
    }
  });
  return (
    <>
      <section className="root-div home-div" id="home-div">
        <div className="container">
          <div className="hero">
            <div className="row">
              <div className="col-5 column text-area">
                <h1 className="main-heading">
                  Professional Certificate Maker - create and send certificates
                </h1>
                <p className="sub-heading">
                  Our digital credentials infrastructure has everything you need
                  to generate certificates. A certificate builder, templates,
                  emails, security, and analytics.
                </p>
                {!isMetamaskConnected ? (
                  <button onClick={connectToMetamask} className="start-btn">
                    Connect Metamask
                  </button>
                ) : null}
              </div>
              <div className="col-7">
                <span className="banner-image-area">
                  <img className="banner-image" src={banner} alt="" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="feature-section">
        <div className="container">
          <h2 className="feaure-heading">
            Our platform for creating certificates and digital credentials can
            be used for everything
          </h2>
          <ul className="feature-area">
            <li className="feature-item">
              <div className="feature-block">
                <div className="feature-block-img">
                  <img src={create} alt="" />
                </div>
                <h3>Create</h3>
                <p>
                  Use our powerful builder to create beautiful certificates:
                  either from scratch or existing templates.
                </p>
              </div>
            </li>
            <li className="feature-item">
              <div className="feature-block">
                <div className="feature-block-img">
                  <img src={issue} alt="" />
                </div>
                <h3>Issue</h3>
                <p>
                  Generate certificates in bulk with one click by uploading a
                  spreadsheet with recipients’ data or by integrating Certifier
                  via API.
                </p>
              </div>
            </li>
            <li className="feature-item">
              <div className="feature-block">
                <div className="feature-block-img">
                  <img src={manage} alt="" />
                </div>
                <h3>Manage</h3>
                <p>
                  Enjoy the ability to securely store and manage issued
                  certificates.
                </p>
              </div>
            </li>
            <li className="feature-item">
              <div className="feature-block">
                <div className="feature-block-img">
                  <img src={verify} alt="" />
                </div>
                <h3>Verify</h3>
                <p>
                  Replace useless PDFs with trustworthy and verifiable
                  documents.
                </p>
              </div>
            </li>
            <li className="feature-item">
              <div className="feature-block">
                <div className="feature-block-img">
                  <img src={share} alt="" />
                </div>
                <h3>Share</h3>
                <p>
                  The certificates you issue become a powerful marketing tool
                  since they are easily shareable on LinkedIn or other social
                  media platforms.
                </p>
              </div>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
};

export default Home;
