import React, { Component } from "react";

class CertificateNotExist extends Component {
  render() {
    return (
      <div className="root-div">
        <div className="certificate-not-exist">
          <h1>Invalid Certificate</h1>
          <h3>The Certificate doesn't exist in blockchain</h3>
        </div>
      </div>
    );
  }
}

export default CertificateNotExist;
