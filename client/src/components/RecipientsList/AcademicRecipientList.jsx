import React, { Component } from "react";
import * as XLSX from "xlsx";
import { Add, Edit, Delete, Confirm, Cancel } from "./Svg";
import {
  ValidateName,
  ValidateEmail,
  ValidateContact,
  ValidateCourse,
  ValidatePassoutYear,
  ValidatePercentage,
  ValidateSAP,
} from "./Validation";

class AcademicRecipientList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      excelData: [],
      editRowData: null,
      name: "",
      SAP: "",
      course: "",
      email: "",
      passoutYear: "",
      percentage: "",
      contact: "",
      addNew: false,
      newData: null,
      errorInput: {
        name: "",
        SAP: "",
        course: "",
        email: "",
        passoutYear: "",
        percentage: "",
        contact: "",
      },
    };
  }

  componentDidMount = async () => {
    if (this.props.excelFile !== null) {
      await this.extractDataFromSpreadsheet();
    }
  };

  extractDataFromSpreadsheet = async () => {
    if (this.props.excelFile !== null) {
      const workbook = XLSX.read(this.props.excelFile, { type: "buffer" });
      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];
      const data = XLSX.utils.sheet_to_json(worksheet);
      var excelData = [];
      data.map((details) =>
        excelData.push({
          name: details.name,
          course: details.course,
          email: details.email,
          passoutYear: details.passoutYear,
          percentage: details.percentage,
          SAP: details.SAP,
          contact: details.contact,
        })
      );
      this.setState({ excelData: excelData });
    } else {
      this.setState({ excelData: null });
    }
  };

  createCertificates = async () => {
    await this.props.createBulkCertificate(this.state.excelData);
  };

  addNewHandle = () => {
    var excelData = this.state.excelData;
    excelData.unshift({
      name: "",
      course: "",
      email: "",
      passoutYear: "",
      percentage: "",
      SAP: "",
      contact: "",
    });
    this.setState({
      excelData: excelData,
      addNew: true,
      newData: excelData[0],
    });
  };

  resetState = () => {
    this.setState({
      addNew: false,
      name: "",
      course: "",
      email: "",
      passoutYear: "",
      percentage: "",
      SAP: "",
      contact: "",
      newData: null,
      editRowData: null,
      errorInput: {
        name: "",
        SAP: "",
        course: "",
        email: "",
        passoutYear: "",
        percentage: "",
        contact: "",
      },
    });
  };

  allClear = () => {
    this.setErrorState(ValidateName(this.state.name));
    this.setErrorState(ValidateSAP(this.state.SAP));
    this.setErrorState(ValidateCourse(this.state.course));
    this.setErrorState(ValidateEmail(this.state.email));
    this.setErrorState(ValidatePassoutYear(this.state.passoutYear));
    this.setErrorState(ValidatePercentage(this.state.percentage));
    this.setErrorState(ValidateContact(this.state.contact));

    var length = 0;
    [
      "name",
      "SAP",
      "course",
      "email",
      "passoutYear",
      "percentage",
      "contact",
    ].map((key) => (length += this.state.errorInput[key].length));

    if (length === 0) {
      return true;
    } else {
      return false;
    }
  };

  setErrorState = (arr) => {
    var allErrors = this.state.errorInput;
    allErrors[arr[0]] = arr[1];
    this.setState({ errorInput: allErrors });
  };
  render() {
    return (
      <div className="excel_page root-div">
        <div className="excel_component">
          <div className="upload_excel_header">
            <div className="container">
              <div className="row">
                <div className="col-6">
                  <p className="path">
                    {this.props.excelFile !== null ? (
                      <span className="light_fg">
                        Certificate / Upload Spreadsheet /{" "}
                      </span>
                    ) : (
                      <span className="light_fg">Certificate / </span>
                    )}
                    Recipients List
                  </p>
                  <h5>Recipients List</h5>
                </div>
                <div className="col-6">
                  <div className="file_input_area">
                    <br />
                    {this.state.excelData.length > 0 ? (
                      <>
                        {this.state.excelData[0].name.length > 0 ? (
                          <button
                            className="publish_btn"
                            onClick={this.createCertificates}
                          >
                            Publish Certificates
                          </button>
                        ) : (
                          <button className="publish_btn" disabled>
                            Publish Certificates
                          </button>
                        )}
                      </>
                    ) : (
                      <button className="publish_btn" disabled>
                        Publish Certificates
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="upload_excel_main">
            <div className="container">
              <div className="row">
                <div className="col">
                  {this.state.addNew || this.state.editRowData !== null ? (
                    <button className="reupload_btn" disabled>
                      <Add />
                      Add Recipients
                    </button>
                  ) : (
                    <button
                      className="reupload_btn"
                      onClick={this.addNewHandle}
                    >
                      <Add />
                      Add Recipients
                    </button>
                  )}
                </div>
              </div>
              <div className="row">
                <div className="table-area">
                  <table class="recipient-table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Sap Id</th>
                        <th>Course</th>
                        <th>Email</th>
                        <th>Passout Year</th>
                        <th>Percentage</th>
                        <th>Contact</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.excelData.map((data) => {
                        return (
                          <tr>
                            {this.state.editRowData !== data &&
                            this.state.newData !== data ? (
                              <>
                                <td>{data.name}</td>
                                <td>{data.SAP}</td>
                                <td>{data.course}</td>
                                <td>{data.email}</td>
                                <td>{data.passoutYear}</td>
                                <td>{data.percentage}</td>
                                <td>{data.contact}</td>
                              </>
                            ) : (
                              <>
                                <td className="editing-row">
                                  <input
                                    type="text"
                                    value={this.state.name}
                                    onChange={(e) => {
                                      this.setState({
                                        name: e.target.value,
                                      });
                                    }}
                                  />
                                  <p className="error-message">
                                    {this.state.errorInput.name}
                                  </p>
                                </td>
                                <td className="editing-row">
                                  <input
                                    type="number"
                                    value={this.state.SAP}
                                    min="0"
                                    onChange={(e) => {
                                      this.setState({ SAP: e.target.value });
                                    }}
                                  />
                                  <p className="error-message">
                                    {this.state.errorInput.SAP}
                                  </p>
                                </td>
                                <td className="editing-row">
                                  <select
                                    class="form-select"
                                    onChange={(e) => {
                                      this.setState({
                                        course: e.target.value,
                                      });
                                    }}
                                  >
                                    <option selected disabled>
                                      {this.state.course}
                                    </option>
                                    <option value="Computer Engineering">
                                      Computer Engineering
                                    </option>
                                    <option value="Information Technology">
                                      Information Technology
                                    </option>
                                    <option value="Civil Engineering">
                                      Civil Engineering
                                    </option>
                                    <option value="Mechanical Engineering">
                                      Mechanical Engineering
                                    </option>
                                    <option value="Plastic Engineering">
                                      Plastic Engineering
                                    </option>
                                    <option value="Chemical Engineering">
                                      Chemical Engineering
                                    </option>
                                  </select>
                                  <p className="error-message">
                                    {this.state.errorInput.course}
                                  </p>
                                </td>
                                <td className="editing-row">
                                  <input
                                    type="email"
                                    value={this.state.email}
                                    onChange={(e) => {
                                      this.setState({
                                        email: e.target.value,
                                      });
                                    }}
                                  />
                                  <p className="error-message">
                                    {this.state.errorInput.email}
                                  </p>
                                </td>
                                <td className="editing-row">
                                  <input
                                    type="number"
                                    value={this.state.passoutYear}
                                    min="1990"
                                    onChange={(e) => {
                                      this.setState({
                                        passoutYear: e.target.value,
                                      });
                                    }}
                                  />
                                  <p className="error-message">
                                    {this.state.errorInput.passoutYear}
                                  </p>
                                </td>
                                <td className="editing-row">
                                  <input
                                    type="number"
                                    value={this.state.percentage}
                                    min="0"
                                    max="100"
                                    step="0.01"
                                    onChange={(e) => {
                                      this.setState({
                                        percentage: e.target.value,
                                      });
                                    }}
                                  />
                                  <p className="error-message">
                                    {this.state.errorInput.percentage}
                                  </p>
                                </td>
                                <td className="editing-row">
                                  <input
                                    type="text"
                                    value={this.state.contact}
                                    onChange={(e) => {
                                      this.setState({
                                        contact: e.target.value,
                                      });
                                    }}
                                  />
                                  <p className="error-message">
                                    {this.state.errorInput.contact}
                                  </p>
                                </td>
                              </>
                            )}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <div className="action-area">
                  <div className="action-head">Action</div>
                  {this.state.excelData.map((data) => {
                    return (
                      <>
                        {this.state.editRowData === null &&
                        !this.state.addNew ? (
                          <>
                            <div className="action-icon">
                              <button
                                onClick={() => {
                                  this.setState({ editRowData: data });
                                  this.setState({
                                    name: data.name,
                                    SAP: data.SAP,
                                    course: data.course,
                                    email: data.email,
                                    passoutYear: data.passoutYear,
                                    percentage: data.percentage,
                                    contact: data.contact,
                                  });
                                }}
                                name="edit"
                                className="action-btn"
                              >
                                <Edit />
                              </button>
                              <button
                                onClick={() => {
                                  var excelData = this.state.excelData;
                                  var index = this.state.excelData.indexOf(
                                    data
                                  );
                                  if (index > -1) {
                                    excelData.splice(index, 1);
                                    this.setState({
                                      excelData: excelData,
                                    });
                                  }
                                }}
                                name="delete"
                                className="action-btn"
                              >
                                <Delete />
                              </button>
                            </div>
                          </>
                        ) : (
                          <>
                            {this.state.addNew &&
                            this.state.newData === data ? (
                              <div className="action-icon edit_option">
                                <button
                                  name="conform-edit"
                                  className="action-btn"
                                  onClick={() => {
                                    if (this.allClear()) {
                                      var allData = this.state.excelData;
                                      var index = allData.indexOf(data);
                                      if (index !== -1) {
                                        allData[index] = {
                                          name: this.state.name,
                                          course: this.state.course,
                                          email: this.state.email,
                                          passoutYear: this.state.passoutYear,
                                          percentage: this.state.percentage,
                                          SAP: this.state.SAP,
                                          contact: this.state.contact,
                                        };

                                        this.setState({ excelData: allData });
                                      }
                                      this.resetState();
                                    }
                                  }}
                                >
                                  <Confirm />
                                </button>
                                <button
                                  name="cancel-edit"
                                  className="action-btn"
                                  onClick={() => {
                                    var excelData = this.state.excelData;
                                    excelData.splice(0, 1);
                                    this.setState({
                                      excelData: excelData,
                                      addNew: false,
                                    });
                                    this.resetState();
                                  }}
                                >
                                  <Cancel />
                                </button>
                              </div>
                            ) : (
                              <>
                                {this.state.editRowData === data ? (
                                  <div className="action-icon edit_option">
                                    <button
                                      name="conform-edit"
                                      className="action-btn"
                                      onClick={() => {
                                        if (this.allClear()) {
                                          var allData = this.state.excelData;
                                          var index = allData.indexOf(data);
                                          if (index !== -1) {
                                            allData[index] = {
                                              name: this.state.name,
                                              course: this.state.course,
                                              email: this.state.email,
                                              passoutYear: this.state
                                                .passoutYear,
                                              percentage: this.state.percentage,
                                              SAP: this.state.SAP,
                                              contact: this.state.contact,
                                            };

                                            this.setState({
                                              excelData: allData,
                                            });
                                          }
                                          this.resetState();
                                        }
                                      }}
                                    >
                                      <Confirm />
                                    </button>
                                    <button
                                      name="cancel-edit"
                                      className="action-btn"
                                      onClick={this.resetState}
                                    >
                                      <Cancel />
                                    </button>
                                  </div>
                                ) : (
                                  <div className="action-icon">
                                    <button
                                      name="edit"
                                      className="action-btn"
                                      disabled
                                    >
                                      <Edit />
                                    </button>
                                    <button
                                      name="delete"
                                      className="action-btn"
                                      disabled
                                    >
                                      <Delete />
                                    </button>
                                  </div>
                                )}
                              </>
                            )}
                          </>
                        )}
                      </>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AcademicRecipientList;
