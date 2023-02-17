import React, { Component } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Web3 from "web3";
import emailjs from "emailjs-com";
import ParticipationTemplate from "./DisplayCertificate/ParticipationTemplate";
import "./bootstrap/css/bootstrap.css";
import "./App.css";
import Ecertify from "../abis/Ecertify.json";
import Loading from "./Loading/Loading";
import NoPage from "./NoPage/NoPage";
import Home from "./Home/Home";
import ContractNotDeployed from "./ContractNotDeployed/ContractNotDeployed";
import Navbar from "./Navbar/Navbar";
import DisplayAllCert from "./Dashboard/displayAllCert";
import StudentDetail from "./StudentDetails/StudentDetail";
import ParticipantDetail from "./StudentDetails/ParticipantDetails";
import DisplayCert from "./DisplayCertificate/displaycert";
import UploadExcelPage from "./uploadExcel/uploadExcel";
import RecipientsList from "./RecipientsList/RecipientsList";
import Query from "./Query/Query";
import DisplayEventCert from "./Dashboard/displayEventCertificate";
import ApplicationForm from "./ApplicationForm/ApplicationForm";
import { contractAddress } from "../abis/contractAddress";
import Application from "./Applications/Application";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accountAddress: "",
      accountBalance: "",
      EcertoContract: null,
      loading: true,
      metamaskConnected: false,
      contractDetected: false,
      certCount: 0,
      extraCertCount: 0,
      AcademicCertificate: [],
      EventCertificate: [],
      ExtraCertificate: [],
      transactionHash: "",
      excelFile: null,
      certificateCreated: false,
      certificateType: null,
      createType: null,
      isAdmin: false,
    };
  }

  componentWillMount = async () => {
    await this.loadWeb3();
    await this.loadBlockchainData();
    await this.authenticateWithBackendAndRole();
  };

  loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  };

  loadBlockchainData = async () => {
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    if (accounts.length === 0) {
      this.setState({ metamaskConnected: false });
    } else {
      this.setState({ metamaskConnected: true });
      this.setState({ loading: true });
      this.setState({ accountAddress: accounts[0] });

      this.setState({ loading: false });
      if (contractAddress) {
        this.setState({ loading: true });
        const EcertoContract = web3.eth.Contract(Ecertify.abi, contractAddress);
        this.setState({ EcertoContract });
        this.setState({ contractDetected: true });

        this.setState({ loading: false });
        const certCount = await EcertoContract.methods
          .certificateCounter()
          .call();

        const eventCertCount = await EcertoContract.methods
          .eventCertificateCounter()
          .call();

        this.setState({ certCount });
        for (var i = 1; i <= certCount; i++) {
          const certificate = await EcertoContract.methods
            .allCertificates(i)
            .call();
          this.setState({
            AcademicCertificate: [
              ...this.state.AcademicCertificate,
              certificate,
            ],
          });
        }
        for (var i = 1; i <= eventCertCount; i++) {
          const certificate = await EcertoContract.methods
            .allEventCertificates(i)
            .call();
          this.setState({
            EventCertificate: [...this.state.EventCertificate, certificate],
          });
        }

        // extra cert

        const extraCertCount = await EcertoContract.methods
          .extracertificateCounter()
          .call();

        this.setState({ extraCertCount });

        for (var i = 1; i <= extraCertCount; i++) {
          const certificate = await EcertoContract.methods
            .allExtraCertificates(i)
            .call();
          this.setState({
            ExtraCertificate: [...this.state.ExtraCertificate, certificate],
          });
        }
        console.log(this.state.ExtraCertificate);
      } else {
        this.setState({ contractDetected: false });
      }
    }
  };
  authenticateWithBackendAndRole = async () => {
    if (this.state.accountAddress.toString().trim() === "") {
      return;
    }

    const response = await fetch("http://localhost:8080/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        walletId: this.state.accountAddress,
        userOrganization: "DJSCE",
        userRole: "APPLICANT",
      }),
    });

    if (response.ok) {
      const resJson = await response.json();
      const { userRole } = resJson.authData;
      if (userRole === "ADMIN") {
        console.log("ADMIN TRUE");
        this.setState({ isAdmin: true });
      }
    } else {
      console.error("Invalid authentication credentials provided");
    }
  };

  connectToMetamask = async () => {
    await window.ethereum.enable();
    this.setState({ metamaskConnected: true });
    window.location.reload();
  };

  getCuurentDate = async () => {
    var months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    var currentTime = new Date();
    // returns the month (from 0 to 11)
    var month = months[currentTime.getMonth()];

    // returns the day of the month (from 1 to 31)
    var day = currentTime.getDate();

    // returns the year (four digits)
    var year = currentTime.getFullYear();
    const issueDate = month + " " + day + " " + year;
    return issueDate;
  };

  createBulkCertificate = async (struct) => {
    this.setState({ loading: true });
    const issueDate = await this.getCuurentDate();
    var dataStruc = [];
    struct.map((details) =>
      dataStruc.push({
        certid: 0,
        transactionHash: "0x00",
        name: details.name,
        course: details.course,
        email: details.email,
        passoutYear: details.passoutYear,
        percentage: details.percentage,
        SAP: details.SAP,
        contact: details.contact,
        issueDate: issueDate,
      })
    );

    this.state.EcertoContract.methods
      .addInBulk(dataStruc)
      .send({ from: this.state.accountAddress })
      .on("confirmation", () => {
        localStorage.setItem(this.state.accountAddress, new Date().getTime());
        this.setState({ loading: false, certificateCreated: true });
        // window.location.reload();
      });
  };

  createBulkEventCertificate = async (
    struct,
    eventName,
    eventType,
    eventDate
  ) => {
    this.setState({ loading: true });
    const issueDate = await this.getCuurentDate();
    var dataStruc = [];
    struct.map((details) =>
      dataStruc.push({
        certid: 0,
        transactionHash: "0x00",
        name: details.name,
        email: details.email,
        domain: details.domain,
        contact: details.contact,
        eventName: eventName,
        eventType: eventType,
        eventDate: eventDate,
        issueDate: issueDate,
      })
    );

    this.state.EcertoContract.methods
      .addEventInBulk(dataStruc)
      .send({ from: this.state.accountAddress })
      .on("confirmation", () => {
        localStorage.setItem(this.state.accountAddress, new Date().getTime());
        this.setState({ loading: false, certificateCreated: true });
        // window.location.reload();
      });
  };

  certficateExist = async (hash) => {
    const exi = await this.state.EcertoContract.methods
      .certficateHashExist(hash)
      .call();

    return exi;
  };

  handleActiveLink = (id) => {
    if (this.state.isAdmin) {
      document.querySelector("#all").classList.remove("nav-active");
      document.querySelector("#all2").classList.remove("nav-active");
      document.querySelector("#create").classList.remove("nav-active");
    }

    document.querySelector("#query").classList.remove("nav-active");

    if (id.length > 0) {
      const link = document.querySelector(id);
      link.classList.add("nav-active");
    }
  };

  // add extra user
  // string memory _name,
  // string memory _course,
  // string memory _email,
  // uint256 _SAP,
  // string memory _reason,
  // string memory _type
  addExtraCert = async (name, course, email, sap, type) => {
    const issueDate = await this.getCuurentDate();
    console.log(name, course, email, sap, type,issueDate);
    this.state.EcertoContract.methods
      .addExtraCertificate(name, course, email, sap, type,issueDate)
      .send({ from: this.state.accountAddress })
      .on("confirmation", () => {
        localStorage.setItem(this.state.accountAddress, new Date().getTime());
        this.setState({ loading: false, certificateCreated: true });
        // window.location.reload();
      });
  };

  sendEmail = async (name, email, hash, department) => {
    console.log("Here");
    var sendparams = {
      to_name: name,
      department: department,
      reply_to: email,
      message: hash,
    };

    emailjs
      .send(
        "service_ysr730a",
        "template_v0a1xxc",
        sendparams,
        "e9JuUEfd3BAc8hdQi"
      )
      .then(
        function(response) {
          console.log("SUCCESS!", response.status, response.text);
          window.location.reload();
        },
        function(error) {
          console.log("FAILED...", error);
        }
      );
  };

  displayRecipientsList = async (excelFile) => {
    this.setState({ excelFile: excelFile });
  };

  modalFormHandle = (createType, certificateType) => {
    this.setState({ certificateType: certificateType, createType: createType });
  };

  render() {
    console.log(this.state.EventCertificate);
    return (
      <>
        {!this.state.metamaskConnected ? (
          <Home connectToMetamask={this.connectToMetamask} />
        ) : !this.state.contractDetected ? (
          <ContractNotDeployed />
        ) : this.state.loading ? (
          <Loading />
        ) : (
          <>
            <BrowserRouter>
              <Routes>
                <Route
                  path="/"
                  element={
                    <Navbar
                      accountAddress={this.state.accountAddress}
                      isAdmin={this.state.isAdmin}
                    />
                  }
                >
                  {this.state.isAdmin ? (
                    <>
                      <Route
                        path="/"
                        element={<Navigate replace to="/dashboard" />}
                      />
                      <Route
                        path="/applications"
                        element={
                          <Application addExtraCert={this.addExtraCert} />
                        }
                      />
                      <Route
                        path="/dashboard"
                        element={
                          <DisplayAllCert
                            allCert={this.state.AcademicCertificate}
                            sendEmail={this.sendEmail}
                            handleActiveLink={this.handleActiveLink}
                          />
                        }
                      />
                      <Route
                        path="/event-certificates"
                        element={
                          <DisplayEventCert
                            allCert={this.state.EventCertificate}
                            sendEmail={this.sendEmail}
                            handleActiveLink={this.handleActiveLink}
                          />
                        }
                      />
                      <Route
                        path="/upload-spreadsheet"
                        element={
                          <>
                            {this.state.createType === "excel" ? (
                              <UploadExcelPage
                                displayRecipientsList={
                                  this.displayRecipientsList
                                }
                                certificateType={this.state.certificateType}
                                handleActiveLink={this.handleActiveLink}
                              />
                            ) : (
                              <Navigate
                                replace
                                to="../certificates/recipients"
                              />
                            )}
                          </>
                        }
                      />
                      <Route
                        path="certificates/recipients"
                        element={
                          <RecipientsList
                            certificateType={this.state.certificateType}
                            createType={this.state.createType}
                            modalFormHandle={this.modalFormHandle}
                            excelFile={this.state.excelFile}
                            createBulkCertificate={this.createBulkCertificate}
                            createBulkEventCertificate={
                              this.createBulkEventCertificate
                            }
                            handleActiveLink={this.handleActiveLink}
                            certificateCreated={this.state.certificateCreated}
                          />
                        }
                      />
                    </>
                  ) : (
                    <>
                      <Route
                        index
                        element={
                          <Home
                            handleActiveLink={this.handleActiveLink}
                            connectToMetamask={this.connectToMetamask}
                            isMetamaskConnected={this.state.metamaskConnected}
                          />
                        }
                      />
                    </>
                  )}

                  <Route
                    path="details/:hash"
                    element={
                      <StudentDetail
                        AllCert={this.state.AcademicCertificate}
                        handleActiveLink={this.handleActiveLink}
                      />
                    }
                  />
                  <Route
                    path="/participant-details/:hash"
                    element={
                      <ParticipantDetail
                        AllEventCert={this.state.EventCertificate}
                        handleActiveLink={this.handleActiveLink}
                      />
                    }
                  />
                  <Route
                    path="certificate/:hash"
                    element={
                      <DisplayCert
                        AllCert={this.state.AcademicCertificate}
                        sendEmail={this.sendEmail}
                        handleActiveLink={this.handleActiveLink}
                      />
                    }
                  />
                  <Route
                    path="event-certificate/:hash"
                    element={
                      <ParticipationTemplate
                        AllCert={this.state.EventCertificate}
                        sendEmail={this.sendEmail}
                        handleActiveLink={this.handleActiveLink}
                      />
                    }
                  />
                  <Route
                    path="findmycertificate"
                    element={
                      <Query
                        sendEmail={this.sendEmail}
                        certficateExist={this.certficateExist}
                        AllCert={this.state.AcademicCertificate}
                        handleActiveLink={this.handleActiveLink}
                      />
                    }
                  />
                  <Route
                    path="application-form"
                    element={<ApplicationForm accountAddress={this.state.accountAddress} />}
                  />
                  <Route
                    path="*"
                    element={
                      <NoPage handleActiveLink={this.handleActiveLink} />
                    }
                  />
                </Route>
              </Routes>
            </BrowserRouter>
          </>
        )}
      </>
    );
  }
}

export default App;
