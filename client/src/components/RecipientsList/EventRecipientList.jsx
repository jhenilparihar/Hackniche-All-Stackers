import React, { Component } from "react";
import * as XLSX from "xlsx";
import { Add, Edit, Delete, Confirm, Cancel } from "./Svg";
import { ValidateName, ValidateEmail, ValidateContact } from "./Validation";

class EventRecipientList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      excelData: [],
      editRowData: null,
      name: "",
      email: "",
      domain: "",
      contact: "",
      eventName: "",
      eventType: "",
      eventDate: "",
      addNew: false,
      newData: null,
      errorInput: {
        name: "",
        email: "",
        domain: "",
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
          email: details.email,
          domain: details.domain,
          contact: details.contact,
        })
      );
      this.setState({ excelData: excelData });
    } else {
      this.setState({ excelData: null });
    }
  };

  createCertificates = async () => {
    await this.props.createBulkEventCertificate(
      this.state.excelData,
      this.state.eventName,
      this.state.eventType,
      this.state.eventDate
    );
  };

  addNewHandle = () => {
    var excelData = this.state.excelData;
    excelData.unshift({
      name: "",
      email: "",
      domain: "",
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
      email: "",
      domain: "",
      contact: "",
      newData: null,
      editRowData: null,
      errorInput: {
        name: "",
        email: "",
        domain: "",
        contact: "",
      },
    });
  };

  allClear = () => {
    this.setErrorState(ValidateName(this.state.name));
    this.setErrorState(ValidateEmail(this.state.email));
    this.setErrorState(ValidateName(this.state.domain));
    this.setErrorState(ValidateContact(this.state.contact));

    var length = 0;
    ["name", "email", "domain", "contact"].map(
      (key) => (length += this.state.errorInput[key].length)
    );

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
  eventCondition = () => {
    if (
      this.state.eventName.length > 0 &&
      this.state.eventType.length > 0 &&
      this.state.eventDate.length > 0
    ) {
      return true;
    }
    return false;
  };
  render() {
    console.log(this.state.excelData);
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
                    {/* <button
                      className="reupload_btn"
                      onClick={() => {
                        this.setState({ excelData: null });
                        window.location.reload();
                      }}
                    >
                      Reupload Spreadsheet
                    </button> */}
                    {this.state.excelData.length > 0 &&
                    this.eventCondition() ? (
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
                <div className="col-4 event-area">
                  <div className="event-details-area">
                    <label>  Event Name</label>
                    <span class="input-span">
                      <input
                        placeholder="Event Name"
                        class="event-input"
                        type="text"
                        value={this.state.eventName}
                        onChange={(e) => {
                          this.setState({ eventName: e.target.value });
                        }}
                      />
                    </span>
                    <label>  Event Type</label>
                    <span class="input-span">
                      <input
                        placeholder="Event Type"
                        class="event-input"
                        type="text"
                        value={this.state.eventType}
                        onChange={(e) => {
                          this.setState({ eventType: e.target.value });
                        }}
                      />
                    </span>
                    <label>  Event Date</label>
                    <span class="input-span">
                      <input
                        placeholder="Date"
                        class="event-input"
                        type="date"
                        value={this.state.eventDate}
                        onChange={(e) => {
                          this.setState({ eventDate: e.target.value });
                        }}
                      />
                    </span>
                  </div>
                </div>
                <div className="col-8">
                  <div className="row">
                    <div className="col-6">
                      <p
                        style={{
                          fontSize: 14 + "px",
                          marginTop: 5 + "px",
                        }}
                      >
                        {this.state.excelData.length} Recipients
                      </p>
                    </div>
                    <div className="col-6">
                      <div className="file_input_area">
                        {this.state.addNew ||
                        this.state.editRowData !== null ? (
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
                  </div>
                  <div className="row">
                    <div className="table-area" style={{ width: 85 + "%" }}>
                      <table class="recipient-table">
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Domain</th>
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
                                    <td>{data.email}</td>
                                    <td>{data.domain}</td>
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
                                        type="text"
                                        value={this.state.domain}
                                        onChange={(e) => {
                                          this.setState({
                                            domain: e.target.value,
                                          });
                                        }}
                                      />
                                      <p className="error-message">
                                        {this.state.errorInput.domain}
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
                    <div className="action-area" style={{ width: 15 + "%" }}>
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
                                        email: data.email,
                                        domain: data.domain,
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
                                              email: this.state.email,
                                              domain: this.state.domain,
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
                                              var allData = this.state
                                                .excelData;
                                              var index = allData.indexOf(data);
                                              if (index !== -1) {
                                                allData[index] = {
                                                  name: this.state.name,
                                                  email: this.state.email,
                                                  domain: this.state.domain,
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
        </div>
      </div>
    );
  }
}

export default EventRecipientList;
