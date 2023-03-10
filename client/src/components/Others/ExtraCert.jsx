import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import QRCode from "qrcode";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import photo from "./assets/photo.svg";
import download from "./assets/download.svg";
import download2 from "./assets/download2.svg";
import pdf from "./assets/pdf.svg";
import linkedin from "./assets/linkedin.svg";
import qrcode from "./assets/qr_code.svg";
import email from "./assets/email.svg";
import CertificateNotExist from "../CertificateNotExist/CertificateNotExist";
import {
  FacebookShareButton,
  WhatsappShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  LinkedinIcon,
  TwitterIcon,
  WhatsappIcon,
  FacebookIcon,
} from "react-share";

const ExtraCert = ({ AllCert, sendEmail, handleActiveLink }) => {
  useEffect(() => handleActiveLink(""));

  const { h } = useParams();
  console.log("hashvalue", h);
  const shareUrl = "http://localhost:3000/bonfied-certificate/" + h;
  let cert = null;
  let i = 0;
  AllCert.forEach((c) => {
    if (c.transactionHash === h) {
      cert = c;
    }
    i += 1;
  });
  if (AllCert.length != 0 && i == AllCert.length) {
    if (cert == null) {
      cert = "none";
    }
  }

  const url = "http://localhost:3000/bonfied-vertificate-details/" + h;

  const [qr, setQr] = useState("");
  const [mounted, setMounted] = useState(false);

  const onclickprint = (cname) => {
    const input = document.getElementById("innerdiv");
    html2canvas(input, {
      useCORS: true,
      allowTaint: true,
      scrollY: -window.scrollY,
      logging: true,
      letterRendering: 1,
    }).then((canvas) => {
      const image = canvas.toDataURL("image/jpeg", 1.0);
      const doc = new jsPDF("p", "px", "a4");
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();

      const widthRatio = pageWidth / canvas.width;
      const heightRatio = pageHeight / canvas.height;
      const ratio = widthRatio > heightRatio ? heightRatio : widthRatio;

      const canvasWidth = canvas.width * ratio;
      const canvasHeight = canvas.height * ratio;

      const marginX = (pageWidth - canvasWidth) / 2;
      const marginY = (pageHeight - canvasHeight) / 2;

      doc.addImage(image, "JPEG", marginX, marginY, canvasWidth, canvasHeight);
      doc.save(cname + "'s_certificate.pdf");
    });
  };

  if (!mounted) {
    QRCode.toDataURL(
      url,
      {
        width: 800,
        margin: 2,
        color: {
          dark: "#335383FF",
          light: "#fdf9f3FF",
        },
      },
      (err, url) => {
        if (err) return console.error(err);

        setQr(url);
      }
    );
  }

  useEffect(() => {
    setMounted(true);
  }, []);
  console.log(AllCert.length, i);
  return (
    <div className="root-div">
      {cert == "none" ? (
        <CertificateNotExist />
      ) : (
        <>
          {cert !== null ? (
            <>
              <div id="printcertificate">
                <div id="flex-section">
                  <div
                    id="innerdiv"
                    width="900"
                    height="600"
                    style={{ backgroundColor: "#ffffff" }}
                  >
                    <div id="template">
                      <img
                        id="canvas_cert"
                        src={
                          "https://alchemy.mypinata.cloud/ipfs/" + cert.Ihash
                        }
                        alt=""
                        width="900"
                        height={"600"}
                      />
                    </div>
                    {/* <div id="clg-name">
                  <h1>Dwarkadas J. Sanghvi College Of Engineering</h1>
                </div> */}
                  </div>
                  <div id="download-section">
                    <h1>Issued by</h1>
                    <hr id="hr" />
                    <h2>Dwakadas J. Sanghvi College Of Engineering</h2>
                    <h1 class="action">Actions</h1>

                    <hr id="hr" />
                    <h3>Download</h3>
                    <div class="download-btns">
                      <div class="btn2">
                        <a
                          href={
                            "https://alchemy.mypinata.cloud/ipfs/" + cert.Ihash
                          }
                        >
                          <button id="image-btn" class="image-btn">
                            As Image
                            <img id="photo-svg" src={photo} alt="" />
                            <img id="photo-svg" src={download} alt="" />
                          </button>
                        </a>
                        <button
                          class="pdf-btn"
                          id="image-btn"
                          onClick={() => onclickprint(cert.name)}
                        >
                          As Pdf
                          <img id="photo-svg" src={pdf} alt="" />
                          <img id="photo-svg" src={download2} alt="" />
                        </button>
                        {qr && (
                          <>
                            <a class="btn2" href={qr} download="qrcode.png">
                              <button class="image-btn" id="image-btn">
                                Download Qr code
                                <img id="photo-svg" src={qrcode} alt="" />
                                <img id="photo-svg" src={download} alt="" />
                              </button>
                            </a>
                          </>
                        )}
                        <button
                          id="image-btn"
                          class="linkedin-btn email"
                          onClick={() =>
                            sendEmail(
                              cert.name,
                              cert.email,
                              "http://localhost:3000/certificate/" +
                                cert.transactionHash,
                              cert.course
                            )
                          }
                        >
                          Send Email
                          <img id="photo-svg" src={email} alt="" />
                        </button>
                        <button id="image-btn" class="linkedin-btn">
                          Add to LinkedIn
                          <img id="photo-svg" src={linkedin} alt="" />
                        </button>
                      </div>
                      <hr id="hr2" />
                      <h3>Share</h3>
                      <div>
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
                            <WhatsappShareButton
                              url={shareUrl}
                              quote={"Title or jo bhi aapko likhna ho"}
                              hashtag={"#portfolio..."}
                              class="social-btns"
                            >
                              <WhatsappIcon size={35} />
                            </WhatsappShareButton>
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
                          <div class="social-btns">
                            <TwitterShareButton
                              url={shareUrl}
                              quote={"Title or jo bhi aapko likhna ho"}
                              hashtag={"#portfolio..."}
                              class="social-btns"
                            >
                              <TwitterIcon size={35} />
                            </TwitterShareButton>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : null}
        </>
      )}
    </div>
  );
};

export default ExtraCert;
