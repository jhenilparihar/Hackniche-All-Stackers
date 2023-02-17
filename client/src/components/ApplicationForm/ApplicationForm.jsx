import React, { Component } from "react";
import "./styles.css";

class ApplicationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      unique_id: "",
      group: "",
      email: "",
      comment: "",
      application_type: ""
    };
  }

  sendApplication = async () => {
      const invalidKeys = []
      const keys = {
          "name": "Name",
          "unique_id": "Unique ID",
          "group": "Group",
          "email": "Email",
          "application_type": "Application Type"
      }
      for (const respKey of Object.keys(keys)){
          if (this.state[respKey] == null || this.state[respKey].trim() == ""){
              invalidKeys.push(keys[respKey])
          }
      }

        if (invalidKeys.length > 0){
            alert(`Invalid ` + invalidKeys.reduce(
                (a, b, idx, arr) => {
                    return idx < arr.length ? `${a}, ${b}` : `${a} ${b}`
                })
            )
            return
        }

    const resp = await fetch(
        "http://localhost:8080/applications/",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                walletId: this.props.accountAddress,
                applicantName: this.state.name,
                applicantUniqueId: this.state.unique_id,
                applicantGroup: this.state.group,
                applicantEmail: this.state.email,
                applicationType: this.state.application_type,
                appliedOrganization: "DJSCE"
            })
        }
    )

    if (resp.ok){
        const resJson = await resp.json()
        const {actionStatus} = resJson
        if (actionStatus === "SUCCESS"){
            const {applicationData} = resJson
            console.log(
                `Created application with application ID ${applicationData.applicationId}`
            )
            window.location.reload()
        }
    }
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
                    <span className="light_fg">Application Form / </span>
                    {/* Recipients List */}
                  </p>
                  <h5>Application Form</h5>
                </div>
              </div>
            </div>
          </div>
          <div className="upload_excel_main">
            <div className="flex-row justify-content-around">
              <div className="flx-col-1">
              <p>Name</p>
              <input
               className="application-form-input"
                type="text"
                value={this.state.name}
                onChange={(e) => {
                  this.setState({
                    name: e.target.value,
                  });
                }}
              />
              <p>SAP ID</p>
              <input
              className="application-form-input"
                type="number"
                value={this.state.unique_id}
                min="0"
                onChange={(e) => {
                  this.setState({ unique_id: e.target.value });
                }}
              />
              <p>Email</p>
              <input
              className="application-form-input"
                type="text"
                value={this.state.email}
                onChange={(e) => {
                  this.setState({
                    email: e.target.value,
                  });
                }}
              />
                  <p>Certificate Type</p>
                  <select
                      className="select-course application-form-input"
                      type="text"
                      onChange={(e) => {
                          this.setState({
                              application_type: e.target.value,
                          });
                      }}
                  >
                      <option selected disabled>Select Type</option>
                      <option value={"BONAFIDE"}>Bonafide</option>
                      <option value={"TRANSCRIPT"}>Transcript</option>
                      <option value={"OTHER"}>Other</option>
                  </select>
              <button className="publish_btn sen-btn" onClick={this.sendApplication}>Send Application</button>
              </div>
              <div className="flx-col-1">
                  <p>Course</p>
                  <select
                      className="select-course application-form-input"
                      onChange={(e) => {
                          this.setState({
                              group: e.target.value,
                          });
                      }}
                  >
                      <option selected disabled>
                          Select Group
                      </option>
                      <option value="Computer Engineering">
                          Computer Engineering
                      </option>
                      <option value="Information Technology">
                          Information Technology
                      </option>
                      <option value="Civil Engineering">Civil Engineering</option>
                      <option value="Mechanical Engineering">
                          Mechanical Engineering
                      </option>
                      <option value="Plastic Engineering">Plastic Engineering</option>
                      <option value="Chemical Engineering">
                          Chemical Engineering
                      </option>
                  </select>
              <p>Comment</p>
              <textarea
                cols="30"
                rows="10"
                value={this.state.comment}
                onChange={(e) => {
                  this.setState({
                    comment: e.target.value,
                  });
                }}
              ></textarea>
              
              </div>
              </div>
              <br />
            
          </div>
        </div>
      </div>
    );
  }
}

export default ApplicationForm;
