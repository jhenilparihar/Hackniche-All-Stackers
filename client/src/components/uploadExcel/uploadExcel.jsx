import React from "react";
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

import "./assets/styles.css";

function UploadExcel({
  displayRecipientsList,
  certificateType,
  handleActiveLink,
}) {
  useEffect(() => handleActiveLink("#create"));
  const [excelFile, setExcelFile] = useState(null);

  const [excelFileError, setExcelFileError] = useState(null);

  const fileType = [
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.template",
  ];
  const handleFile = async (e) => {
    let selectedFile = e.target.files[0];
    console.log(selectedFile.type);
    if (selectedFile) {
      console.log(selectedFile.type);
      if (selectedFile && fileType.includes(selectedFile.type)) {
        let reader = new FileReader();
        reader.readAsArrayBuffer(selectedFile);
        reader.onload = (e) => {
          setExcelFileError(null);
          displayRecipientsList(e.target.result);
          setExcelFile(e.target.result);
        };
      } else {
        setExcelFileError("Please select only excel file types");
        setExcelFile(null);
      }
    } else {
      console.log("plz select your file");
    }
  };
  let downloadTemplateUrl = "";
  console.log(certificateType);
  if (certificateType === "event") {
    downloadTemplateUrl = "./assets/event_spreadsheet_template.xlsx";
  } else {
    downloadTemplateUrl = "./assets/academic_spreadsheet_template.xlsx";
  }

  return (
    <>
      {excelFile === null ? (
        <div className="excel_page root-div">
          <div className="excel_component">
            <div className="upload_excel_header">
              <div className="container">
                <div className="row">
                  <div className="col-6">
                    <p className="path">
                      <span className="light_fg">Certificate / </span> Upload
                      Spreadsheet
                    </p>
                    <h5>Upload Spreadsheet</h5>
                  </div>
                  <div className="col-6">
                    <div className="file_input_area">
                      <br />
                      <input
                        id="excel_input"
                        onChange={handleFile}
                        accept=".xlsx"
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
                        Upload Spreadsheet
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
                      onChange={handleFile}
                      accept=".xlsx"
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
                        Upload a spreadsheet with recipients’ data
                      </p>
                      <p class="excel_form_subtext">
                        We accept Microsoft Workbook spreadsheet formats, i. e.
                        : XLSX.
                      </p>
                    </div>
                  </div>
                  <div className="excel_form_button_area">
                    <a
                      class="download_template"
                      download=""
                      href={downloadTemplateUrl}
                    >
                      <span
                        role="img"
                        aria-label="download"
                        class="anticon anticon-download inline-flex text-base"
                      >
                        <svg
                          viewBox="64 64 896 896"
                          focusable="false"
                          data-icon="download"
                          width="1em"
                          height="1em"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path d="M505.7 661a8 8 0 0012.6 0l112-141.7c4.1-5.2.4-12.9-6.3-12.9h-74.1V168c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v338.3H400c-6.7 0-10.4 7.7-6.3 12.9l112 141.8zM878 626h-60c-4.4 0-8 3.6-8 8v154H214V634c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v198c0 17.7 14.3 32 32 32h684c17.7 0 32-14.3 32-32V634c0-4.4-3.6-8-8-8z"></path>
                        </svg>
                      </span>
                      <span> Get Spreadsheet Template</span>
                    </a>
                    <div class="btn-divider" role="separator"></div>
                    <input
                      id="excel_input1"
                      onChange={handleFile}
                      accept=".xlsx"
                      type="file"
                      style={{ display: "none" }}
                    />
                    <label className="download_template" for="excel_input1">
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
                      Upload Spreadsheet
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Navigate replace to="../certificates/recipients" />
      )}
    </>
  );
}

export default UploadExcel;
