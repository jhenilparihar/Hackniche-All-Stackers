import React, { Component } from "react";
import { Add, Edit, Delete, Confirm, Cancel } from "./Svg";
import axios from "axios";
import { Buffer } from 'buffer';

// import { create } from "ipfs-http-client";
// import { Buffer } from "buffer";

// const projectId = "2LsorBsjfMAZIt0x67uZarPu3sM";
//   const projectSecret = "d2ad2619c1b0e37610b600143bf589af";
//   const auth =
//     "Basic " + Buffer.from(projectId + ":" + projectSecret).toString("base64");
  
//   const client = create({
//     host: "ipfs.infura.io",
//     port: 5001,
//     protocol: "https",
//     headers: {
//       authorization: auth,
//     },
//   });


class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
        applicationData: []
    }
  }
  uploadFileToIPFS = async (fileBlob) => {
    const apiKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDE5NzkzNUM4NUQxODZmNEJCN2NlN2U1RjhGYjY4NWQ4NUJlY0ZkREEiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY3NjE5OTY3NzU0MywibmFtZSI6ImhhcnNoQDIzMDQifQ.gEWeVVohValCGdXRyGorzcYkc0umfpjcJOsPJxDMkQU";

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
  onUpload = async (e) => {
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
        const imageUploadResponse = await this.uploadFileToIPFS(imageblob);
        const imageIPFS = imageUploadResponse.value.cid;
        const imageLink = `https://alchemy.mypinata.cloud/ipfs/${imageIPFS}/`;
 console.log(imageLink)
      //   image.style.height = "100%";
      // image.style.width = "100%";
      // fileInput.style.opacity = "0";

      // this.setState({ fileUrl: imageLink });
      // this.setState({ imageIsUpload: true });
      }

      
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  };
  
  
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
