import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import "./assets/styles.css";
import logo from "./assets/sbmp-logo.png";
import gif from "./assets/verified.gif";
import {
  FacebookShareButton,
  LinkedinShareButton,
  LinkedinIcon,
  FacebookIcon,
} from "react-share";

const shareUrl = "";

const ParticipantDetail = ({ AllEventCert, handleActiveLink }) => {
  useEffect(() => handleActiveLink(""));

  const { hash } = useParams();
  let certificateDetail;
  AllEventCert.forEach((cert) => {
    if (cert.transactionHash === hash) {
      certificateDetail = cert;
    }
  });
  return (
    <>
      {certificateDetail !== undefined ? (
        <>
          <div className="details_page root-div">
            <div className="details_component">
              <div className="details_grid">
                <div className="details_div">
                  <div className="detail_heading">
                    <div className="container">
                      <div className="row">
                        <div className="col-2">
                          <img className="sbmp_logo" src={logo} alt="" />
                        </div>
                        <div className="col  heading_">
                          <h2>Shri Bhagubhai Mafatlal Poltechnic</h2>
                        </div>
                      </div>
                      <hr className="detail_hr" />
                      <div className="verified_gif">
                        <img src={gif} alt="" />
                      </div>
                    </div>
                    <div className="container detail_section">
                      <div className="row">
                        <div className="col">
                          <h6 className="detail_label">Participant Name</h6>
                          <h6>{certificateDetail.name}</h6>
                        </div>
                        <div className="col">
                          <h6 className="detail_label">Certificate Type</h6>
                          <h6>Participant</h6>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col">
                          <h6 className="detail_label">Event Name</h6>
                          <h6>{certificateDetail.eventName}</h6>
                        </div>
                        <div className="col">
                          <h6 className="detail_label">Event Type</h6>
                          <h6>{certificateDetail.eventType}</h6>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col">
                          <h6 className="detail_label">Event Date</h6>
                          <h6>{certificateDetail.eventDate}</h6>
                        </div>
                        <div className="col">
                          <h6 className="detail_label">Domain</h6>
                          <h6>{certificateDetail.domain}</h6>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col">
                          <h6 className="detail_label">Email</h6>
                          <h6>{certificateDetail.email}</h6>
                        </div>
                        <div className="col">
                          <h6 className="detail_label">Contact</h6>
                          <h6>{certificateDetail.contact.toNumber()}</h6>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col">
                          <h6 className="detail_label">About Organization</h6>
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Ut enim ad minim veniam, quis
                            nostrud exercitation ullamco laboris nisi ut aliquip
                            ex ea commodo consequat. Duis aute irure dolor in
                            reprehenderit in voluptate velit esse cillum dolore
                            eu fugiat nulla pariatur.
                          </p>
                        </div>
                      </div>
                    </div>
                    <hr className="detail_hr" />
                    <div className="row follow_div">
                      <span>Follow Us At</span>

                      <div id="share-btns">
                        <div class="social-btns">
                          <FacebookShareButton
                            url={shareUrl}
                            quote={"Title or jo bhi aapko likhna ho"}
                            hashtag={"#portfolio..."}
                          >
                            <FacebookIcon size={35} />
                          </FacebookShareButton>
                        </div>
                        <div class="social-btns">
                          <LinkedinShareButton
                            url={shareUrl}
                            quote={"Title or jo bhi aapko likhna ho"}
                            hashtag={"#portfolio..."}
                            class="social-btns"
                          >
                            <LinkedinIcon size={35} />
                          </LinkedinShareButton>
                        </div>
                      </div>
                    </div>
                    <div className="row powered_div">
                      <span>Powered By :- E-Certifier</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <h1>Non Existant Certificate Id</h1>
        </>
      )}
    </>
  );
};

export default ParticipantDetail;
