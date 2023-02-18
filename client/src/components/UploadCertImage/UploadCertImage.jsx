import React from "react";
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { Buffer } from "buffer";

import "./assets/styles.css";

function UploadCertImage({ handleActiveLink, bonafiedExist }) {
  const [imageFile, setImageFile] = useState(null);

  const [certVerified, setCertVerified] = useState(false);

  const fileType = ["image/png"];
  // const handleFile = async (e) => {
  //     let selectedFile = e.target.files[0];
  //     console.log(selectedFile.type);
  //     if (selectedFile) {
  //         console.log(selectedFile.type);
  //         if (selectedFile && fileType.includes(selectedFile.type)) {
  //             let reader = new FileReader();
  //             reader.readAsArrayBuffer(selectedFile);
  //             reader.onload = (e) => {
  //                 setImageFile(e.target.result);
  //             };
  //         } else {
  //             setImageFile(null);
  //         }
  //     } else {
  //         console.log("plz select your file");
  //     }
  // };
  const uploadFileToIPFS = async (fileBlob) => {
    const apiKey =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDE5NzkzNUM4NUQxODZmNEJCN2NlN2U1RjhGYjY4NWQ4NUJlY0ZkREEiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY3NjE5OTY3NzU0MywibmFtZSI6ImhhcnNoQDIzMDQifQ.gEWeVVohValCGdXRyGorzcYkc0umfpjcJOsPJxDMkQU";

    var config = {
      method: "post",
      url: "https://api.nft.storage/upload",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "image/jpeg",
      },
      data: fileBlob,
    };

    const fileUploadResponse = await axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
        return error;
      });

    return fileUploadResponse;
  };
  const onUpload = async (e) => {
    // const image = document.querySelector(".img-uploaded");
    // const fileInput = document.querySelector(".img-fileInput");

    const file = e.target.files[0];
    try {
      // const added = await ipfs.add(file);
      // const url = `https://ipfs.infura.io/ipfs/${added.path}`;

      const reader = new window.FileReader();
      reader.readAsArrayBuffer(file);
      reader.onloadend = async () => {
        window.Buffer = Buffer;
        const res = Buffer(reader.result);
        var b = Buffer.from(res);
        let ab = b.buffer.slice(b.byteOffset, b.byteOffset + b.byteLength);
        console.log(res);
        console.log(b);
        console.log(ab);

        const imageblob = new Blob([ab], { type: "image/jpg" });
        // Upload image to IPFS
        const imageUploadResponse = await uploadFileToIPFS(imageblob);
        const imageIPFS = imageUploadResponse.value.cid;
        const imageLink = `https://alchemy.mypinata.cloud/ipfs/${imageIPFS}/`;
        console.log(imageLink);
        const rese = await bonafiedExist(imageIPFS);
        if (rese == true) {
          console.log(imageLink);
          window.alert("Certificate is authentic and verified");
        } else {
          console.log("NO MATCHING");
          window.alert("Certificate is not verified");
        }
        // console.log(rese);
        //     image.style.height = "100%";
        //   image.style.width = "100%";
        //   fileInput.style.opacity = "0";

        //   setState({ fileUrl: imageLink });
        //      setState({ imageIsUpload: true });
      };
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  };
  return (
    <>
      {imageFile === null ? (
        <div className="excel_page root-div">
          <div className="excel_component">
            <div className="upload_excel_header">
              <div className="container">
                <div className="row">
                  <div className="col-6">
                    <p className="path">
                      <span className="light_fg">Certificate / </span> Upload
                      Certificate Image
                    </p>
                    <h5>Upload Certificate Image</h5>
                  </div>
                  <div className="col-6">
                    <div className="file_input_area">
                      <br />
                      <input
                        id="excel_input"
                        onChange={onUpload}
                        accept=".png"
                        type="file"
                        style={{ display: "none" }}
                      />
                      <label className="excel_file_input" for="excel_input">
                        <svg
                          viewBox="64 64 896 896"
                          focusable="false"
                          data-icon="upload"
                          width="1em"
                          height="1em"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path d="M400 317.7h73.9V656c0 4.4 3.6 8 8 8h60c4.4 0 8-3.6 8-8V317.7H624c6.7 0 10.4-7.7 6.3-12.9L518.3 163a8 8 0 00-12.6 0l-112 141.7c-4.1 5.3-.4 13 6.3 13zM878 626h-60c-4.4 0-8 3.6-8 8v154H214V634c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v198c0 17.7 14.3 32 32 32h684c17.7 0 32-14.3 32-32V634c0-4.4-3.6-8-8-8z"></path>
                        </svg>
                        Upload Certificate PNG
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="upload_excel_main">
              <div className="upload_excel_form_area">
                <div className="container">
                  <div className="excel_form">
                    <input
                      className="excel_input_lg"
                      onChange={onUpload}
                      accept=".png"
                      type="file"
                    />
                    <div className="excel_form_content">
                      <span
                        role="img"
                        aria-label="inbox"
                        data-cy="certificate-file-upload"
                        class="upload_file_svg"
                      >
                        <svg
                          viewBox="0 0 1024 1024"
                          focusable="false"
                          data-icon="inbox"
                          width="1em"
                          height="1em"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path d="M885.2 446.3l-.2-.8-112.2-285.1c-5-16.1-19.9-27.2-36.8-27.2H281.2c-17 0-32.1 11.3-36.9 27.6L139.4 443l-.3.7-.2.8c-1.3 4.9-1.7 9.9-1 14.8-.1 1.6-.2 3.2-.2 4.8V830a60.9 60.9 0 0060.8 60.8h627.2c33.5 0 60.8-27.3 60.9-60.8V464.1c0-1.3 0-2.6-.1-3.7.4-4.9 0-9.6-1.3-14.1zm-295.8-43l-.3 15.7c-.8 44.9-31.8 75.1-77.1 75.1-22.1 0-41.1-7.1-54.8-20.6S436 441.2 435.6 419l-.3-15.7H229.5L309 210h399.2l81.7 193.3H589.4zm-375 76.8h157.3c24.3 57.1 76 90.8 140.4 90.8 33.7 0 65-9.4 90.3-27.2 22.2-15.6 39.5-37.4 50.7-63.6h156.5V814H214.4V480.1z"></path>
                        </svg>
                      </span>
                      <p class="excel_form_text">
                        Upload a .png image with certificate data
                      </p>
                      <p class="excel_form_subtext">
                        We only accept original PNG Images. Cropped and Edited
                        images will not be accepted
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null
      // TODO: IMPLEMENT
      }
    </>
  );
}

export default UploadCertImage;
