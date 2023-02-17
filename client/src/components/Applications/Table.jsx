import React, { Component } from "react";
import { Add, Edit, Delete, Confirm, Cancel } from "./Svg";

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
        applicationData: []
    }
  }

  fetchApplications = async () => {
      const response = await fetch(
          "http://localhost:8080/applications?organizationId=DJSCE"
      )
      if (response.ok) {
          const resData = await response.json()
          const {applicationData} = resData

          let filteredApplicationData = applicationData.filter(app => {
              return app.applicationstatus == "IN_PROGRESS"
          })

          filteredApplicationData = filteredApplicationData.sort((a, b) => {
              return (
                  new Date(a.applicationdate)
                  <
                  new Date(b.applicationdate)
              )
          })

          this.setState({
              applicationData: filteredApplicationData
          })
      }
  }

  componentWillMount(){
    this.fetchApplications()
  }

  approveApplication = async (applicationid, applicantname,applicantgroup,applicantemail,applicantuniqueid,applicantiontype) => {
    this.props.addExtraCert(applicantname,applicantgroup,applicantemail,applicantuniqueid,applicantiontype)

    const nowTs = (new Date()).getTime()

    const randChars = Array.from(applicantname).sort((a, b) => {
        return a.charCodeAt(0) < b.charCodeAt(0)
    })

    const finalTokenId = `0x${applicationid}${nowTs}${randChars.join()}`

    const resp = await fetch(
        `http://localhost:8080/applications/${applicationid}/approve`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                chainToken: finalTokenId
            })
        }
    )

    if (resp.ok){
        const respJson = await resp.json()
        if (respJson.actionStatus == "SUCCESS"){
            this.setState((prevState) => {
                return prevState.applicationData.map((application) => {
                    if (application.applicationid === applicationid){
                        return {
                            ...application,
                            applicationstatus: "APPROVED"
                        }
                    } else {
                        return application;
                    }
                })
            })
        }
    }
  }

  rejectApplication = async (applicationid) => {
      const resp = await fetch(
          `http://localhost:8080/applications/${applicationid}/reject`,
          {
              method: "POST"
          }
      )

      if (resp.ok){
          const respJson = await resp.json()
          if (respJson.actionStatus == "SUCCESS"){
              this.setState({
                  applicationData: this.state.applicationData.filter((app) => {
                      return app.applicationid != applicationid
                  })
            })
          }
      }
  }

  render() {
    return (
      <>
        <div className="table-btn">
          <h5> Applications</h5>
        </div>
        <div className="hr2"></div>
        <div className="tab">
           {this.state.applicationData.length ? (
          <>
            <table className="content-table">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Status</th>
                  <th>Group</th>
                  <th>Application Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {this.state.applicationData.map((application) => (
                <tr className={"commontr tr"}>
                  <td>
                    <a href={"certificate/"}>{application.applicationid}</a>
                  </td>
                  <td>{application.applicantname}</td>
                  <td>{application.applicationstatus.replace("_", " ")}</td>
                  <td>{application.applicantgroup}</td>
                  <td>{new Date(application.applicationdate).toLocaleDateString()}</td>
                  <td>
                    <div className="">
                      <button name="conform-edit" className="action-btn" onClick={()=>{this.approveApplication(
                          application.applicationid, application.applicantname,application.applicantgroup,application.applicantemail,application.applicantuniqueid,application.applicationtype
                      )}}>
                        <Confirm />
                      </button>
                      <button name="cancel-edit" className="action-btn" onClick={() => this.rejectApplication(application.applicationid)}>
                        <Cancel />
                      </button>
                    </div>
                  </td>
                </tr>
                    ))}
              </tbody>
            </table>
          </>
           ) : null}
        </div>
      </>
    );
  }
}

export default Table;
