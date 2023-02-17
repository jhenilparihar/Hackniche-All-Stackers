import React, { Component } from "react";

import "./assets/styles.css";
import { Navigate } from "react-router-dom";

import Modal from "./modal";

import AcademicRecipientList from "./AcademicRecipientList";

import EventRecipientList from "./EventRecipientList";

class RecipientsList extends Component {
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
    this.props.handleActiveLink("#create");
  };

  render() {
    console.log(this.props.certificateType);
    console.log(this.props.createType);
    return (
      <>
        {this.props.certificateCreated ? (
          <>
            {this.props.certificateType === "event" ? (
              <Navigate replace to="../event-certificates" />
            ) : (
              <Navigate replace to="../dashboard" />
            )}
          </>
        ) : null}
        {this.props.certificateType === null ||
        this.props.createType === null ? (
          <Modal modalFormHandle={this.props.modalFormHandle} />
        ) : (
          <>
            {this.props.createType === "excel" &&
            this.props.excelFile === null ? (
              <Navigate replace to="../upload-spreadsheet" />
            ) : null}
          </>
        )}

        {this.props.certificateType === "event" ? (
          <EventRecipientList
            excelFile={this.props.excelFile}
            createBulkEventCertificate={this.props.createBulkEventCertificate}
            handleActiveLink={this.props.handleActiveLink}
          />
        ) : (
          <AcademicRecipientList
            excelFile={this.props.excelFile}
            createBulkCertificate={this.props.createBulkCertificate}
            handleActiveLink={this.props.handleActiveLink}
          />
        )}
        {/* <EventRecipientList
          excelFile={this.props.excelFile}
          createBulkCertificate={this.props.createBulkCertificate}
          handleActiveLink={this.props.handleActiveLink}
        /> */}
      </>
    );
  }
}

export default RecipientsList;
