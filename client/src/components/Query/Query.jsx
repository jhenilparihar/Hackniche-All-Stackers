import React from "react";
import { useState, useEffect } from "react";
import "./styles.css";
import "./alert.css";
import "./font-awesome.min.css";

function Query({ sendEmail, certficateExist, AllCert, handleActiveLink }) {
  useEffect(() => handleActiveLink("#query"));

  const [certificateHash, setCertificateHash] = useState("");
  const [sapId, setSapId] = useState("");
  const [certificateLink, setCertificateLink] = useState("");
  const [certificateUrl, setCertificateUrl] = useState("");
  const [message, setMessage] = useState("");

  const getCertificate = async () => {
    const cert = await certficateExist(certificateHash);
    const alertbox = document.querySelector(".alertbox");

    if (cert) {
      setCertificateLink(
        "http://localhost:3000/certificate/" + certificateHash
      );
      setCertificateUrl(
        "http://localhost:3000/certificate/" +
          certificateHash.substring(0, 7) +
          "....." +
          certificateHash.slice(certificateHash.length - 7)
      );
      alertbox.style.display = "none";
    } else {
      console.log("Not Found");
      alertbox.style.display = "block";
      setCertificateLink("");
      setCertificateUrl("");
    }
  };

  const getCertificateSap = async () => {
    let certificateDetail = "";
    AllCert.forEach((cert) => {
      console.log(cert.SAP.toNumber());
      if (cert.SAP.toNumber() == sapId) {
        document.querySelector(".alertbox_sap").style.display = "none";
        certificateDetail = cert;
        console.log(cert);
        const email = cert.email;
        sendEmail(cert.name, email, "http://localhost:3000/certificate/" + cert.transactionHash, cert.course);
        console.log(email.substr(email.indexOf("@"), email.length));
        setMessage(
          email.substr(0, 3) +
            "***" +
            email.substr(email.indexOf("@"), email.length)
        );
        document.querySelector(".alertbox_success").style.display = "block";
      }
    });
    if (certificateDetail === "") {
      document.querySelector(".alertbox_sap").style.display = "block";
      document.querySelector(".alertbox_success").style.display = "none";
    }
  };

  const getCertificateBySap = () => {
    document.querySelector(".getcertificate_hash").style.display = "none";
    document.querySelector(".getcertificate_sap").style.display = "block";
  };

  const getCertificateByHash = () => {
    document.querySelector(".getcertificate_hash").style.display = "block";
    document.querySelector(".getcertificate_sap").style.display = "none";
  };

  return (
    <>
      <div className="details_page root-div">
        <div className="details_component">
          <div className="details_grid">
            <div className="details_div query_div">
              <div className="detail_heading">
                <div className="container">
                  <div className="row">
                    <div className="col query_heading">
                      <h2>Lost Your Certificate?</h2>
                      <h6>Don't worry provide follow details. </h6>
                    </div>
                  </div>
                  <hr className="detail_hr" />
                  <div className="getcertificate_hash">
                    <div className="row query_block">
                      <h6>Enter Certificate Id</h6>
                      <input
                        className="query_input"
                        type="text"
                        name="certificateHash"
                        value={certificateHash}
                        placeholder="Enter Certificate ID"
                        onChange={(e) => setCertificateHash(e.target.value)}
                      />
                      <button
                        type="submit"
                        onClick={getCertificate}
                        class="query-btn"
                      >
                        Get Certificate
                      </button>

                      <div class="alert alertbox alert-danger alert-white rounded">
                        <button
                          type="button"
                          class="close"
                          aria-hidden="true"
                          onClick={() => {
                            document.querySelector(".alertbox").style.display =
                              "none";
                          }}
                        >
                          ×
                        </button>
                        <div class="icon">
                          <i class="fa fa-times-circle"></i>
                        </div>
                        <strong>Error!</strong> Non-Existent Certificate ID.
                      </div>

                      <p className="mt-4">
                        <a
                          class="retieved-data"
                          href={certificateLink}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {certificateUrl}
                        </a>
                      </p>
                    </div>
                    <button className="help_btn" onClick={getCertificateBySap}>
                      Don't Have Certificate Id?
                    </button>
                  </div>
                  <div className="getcertificate_sap query_block">
                    <div className="row">
                      <h6>Enter SAP Id</h6>
                      <p>
                        ( We will email your certificate link on registered
                        email id )
                      </p>
                      <input
                        className="query_input"
                        type="text"
                        name="sapId"
                        value={sapId}
                        placeholder="Enter SAP Id"
                        onChange={(e) => {
                          setSapId(e.target.value);
                          document.querySelector(
                            ".alertbox_success"
                          ).style.display = "none";
                        }}
                      />
                      <button
                        type="submit"
                        onClick={getCertificateSap}
                        class="query-btn"
                      >
                        Get Email
                      </button>

                      <div class="alert alertbox_sap alert-danger alert-white rounded">
                        <button
                          type="button"
                          class="close"
                          aria-hidden="true"
                          onClick={() => {
                            document.querySelector(
                              ".alertbox_sap"
                            ).style.display = "none";
                          }}
                        >
                          ×
                        </button>
                        <div class="icon">
                          <i class="fa fa-times-circle"></i>
                        </div>
                        <strong>Error!</strong> No such SAP ID exists in system
                      </div>

                      <div class="alertbox_success alert alert-success alert-white rounded">
                        <button
                          type="button"
                          class="close"
                          aria-hidden="true"
                          onClick={() => {
                            document.querySelector(
                              ".alertbox_success"
                            ).style.display = "none";
                          }}
                        >
                          ×
                        </button>
                        <div class="icon">
                          <i class="fa fa-check"></i>
                        </div>
                        <strong>Success!</strong> Mail is sent to {message}.
                      </div>
                    </div>
                    <button className="help_btn" onClick={getCertificateByHash}>
                      Get Certificate By Id?
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Query;
