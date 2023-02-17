import React, { Component } from "react";
import "./styles.css";

class ApplicationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      SAP: "",
      course: "",
      email: "",
      comment: "",
    };
  }

  sendApplication = async () => {
    
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
                <div className="col-6">
                  <div className="file_input_area">
                    <br />
                    {/* <button className="publish_btn">Send Application</button> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="upload_excel_main">
            <div className="container apply-form-container">
              <div className="leftd">

              <p>Name</p>
              <input
               class="application-form-input"
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
              class="application-form-input"
                type="number"
                value={this.state.SAP}
                min="0"
                onChange={(e) => {
                  this.setState({ SAP: e.target.value });
                }}
              />
              <p>Email</p>
              <input
              class="application-form-input"
                type="text"
                value={this.state.email}
                onChange={(e) => {
                  this.setState({
                    email: e.target.value,
                  });
                }}
              />
              <p>Course</p>
              <select
              
                class="select-course application-form-input"
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
                <option value="Civil Engineering">Civil Engineering</option>
                <option value="Mechanical Engineering">
                  Mechanical Engineering
                </option>
                <option value="Plastic Engineering">Plastic Engineering</option>
                <option value="Chemical Engineering">
                  Chemical Engineering
                </option>
              </select>
              <button className="publish_btn sen-btn">Send Application</button>
              </div>
              <div className="rightd">
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
             
              
              <br />
              
            </div>
            
          </div>
        </div>
      </div>
    );
  }
}

export default ApplicationForm;
