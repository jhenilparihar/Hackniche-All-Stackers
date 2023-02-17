import React, { Component } from "react";

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailList: [],
      checked: 0,
      checkList: [],
      index: 0,
      seconds: parseInt(props.startTimeInSeconds, 10) || 0,
    };
  }

  componentDidMount() {
    this.interval = setInterval(() => this.tick(), 500);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }
  tick() {
    const dt = this.props.data;
    const ckList = this.state.checkList;
    dt.forEach((cert) => {
      const tr = document.querySelector(".tr" + cert.SAP.toNumber());
      if (ckList.includes(cert.SAP.toNumber()) == false) {
        tr.style.backgroundColor = "white";
        document.querySelector(".chk" + cert.SAP.toNumber()).checked = false;
      } else {
        tr.style.backgroundColor = "#e6f7ff";
        document.querySelector(".chk" + cert.SAP.toNumber()).checked = true;
      }
    });
    if (this.props.modified == 1) {
      if (this.state.checked != this.props.data.length) {
        document.querySelector(".allCheck").checked = false;
      } else {
        document.querySelector(".allCheck").checked = true;
      }
    } else {
      if (this.state.checked != this.props.allCert.length) {
        document.querySelector(".allCheck").checked = false;
      } else {
        document.querySelector(".allCheck").checked = true;
      }
    }
  }
  send = async (cert, clsname) => {
    var checkBox = document.querySelector(".chk" + clsname);
    var tr = document.querySelector(".tr" + clsname);
    if (checkBox.checked == true) {
      tr.style.backgroundColor = "#e6f7ff";
      await this.setState({ emailList: [...this.state.emailList, cert] });
      await this.setState({ checked: this.state.checked + 1 });
      await this.setState({ checkList: [...this.state.checkList, clsname] });
      this.props.enableState();
      if (this.state.checked == this.props.data.length) {
        document.querySelector(".allCheck").checked = true;
      } else {
        document.querySelector(".allCheck").checked = false;
      }
      console.log("checked");
    } else {
      var slicedData = this.state.emailList;
      var slicedCheck = this.state.checkList;
      let index = slicedData.indexOf(cert);
      let checkIndex = slicedCheck.indexOf(clsname);
      console.log(index);

      if (index > -1) {
        slicedData.splice(index, 1);
      }
      if (checkIndex > -1) {
        slicedCheck.splice(checkIndex, 1);
      }
      await this.setState({ checkList: slicedCheck });
      await this.setState({ emailList: slicedData });
      await this.setState({ checked: this.state.checked - 1 });
      if (this.state.checked <= 0) {
        this.props.disableState();
      }
      tr.style.backgroundColor = "white";
      document.querySelector(".allCheck").checked = false;
      // console.log("unchecked")
    }

    console.log(this.state.emailList);
    console.log(this.state.checkList);
    // console.log(this.state.checked);
  };
  tog = async () => {
    await this.setState({ emailList: [] });
    await this.setState({ checkList: [] });
    const trs = document.querySelectorAll(".commontr");
    const checkBoxes = document.querySelectorAll(".commonChk");
    const allCheck = document.querySelector(".allCheck");
    if (allCheck.checked == true) {
      console.log("yes");
      const dts = this.props.allCert;
      // await this.setState({emailList:dts})
      await this.setState({ checked: dts.length });
      dts.forEach((cert) => {
        this.setState({ emailList: [...this.state.emailList, cert] });
      });
      checkBoxes.forEach((chk) => {
        chk.checked = true;
      });
      trs.forEach((tr) => {
        tr.style.backgroundColor = "#e6f7ff";
      });
      const data1 = this.props.allCert;
      var chkList = [];
      data1.forEach((cert) => {
        chkList.push(cert.SAP.toNumber());
      });
      await this.setState({ checkList: chkList });
      console.log(this.state.emailList);
      this.props.enableState();
    } else {
      await this.setState({ chkList: [] });
      await this.setState({ emailList: [] });
      await this.setState({ checked: 0 });
      checkBoxes.forEach((chk) => {
        chk.checked = false;
      });
      trs.forEach((tr) => {
        tr.style.backgroundColor = "white";
      });
      console.log(this.state.emailList);
      this.props.disableState();
      console.log("unchecked");
    }
  };
  togData = async () => {
    await this.setState({ emailList: [] });
    await this.setState({ checkList: [] });
    const trs = document.querySelectorAll(".commontr");
    const checkBoxes = document.querySelectorAll(".commonChk");
    const allCheck = document.querySelector(".allCheck");
    if (allCheck.checked == true) {
      console.log("yes");
      const dts = this.props.data;
      // await this.setState({emailList:dts})
      await this.setState({ checked: dts.length });
      dts.forEach((cert) => {
        this.setState({ emailList: [...this.state.emailList, cert] });
      });
      checkBoxes.forEach((chk) => {
        chk.checked = true;
      });
      trs.forEach((tr) => {
        tr.style.backgroundColor = "#e6f7ff";
      });
      const data1 = this.props.data;
      var chkList = [];
      data1.forEach((cert) => {
        chkList.push(cert.SAP.toNumber());
      });
      await this.setState({ checkList: chkList });
      console.log(this.state.emailList);
      this.props.enableState();
    } else {
      await this.setState({ chkList: [] });
      await this.setState({ emailList: [] });
      await this.setState({ checked: 0 });
      checkBoxes.forEach((chk) => {
        chk.checked = false;
      });
      trs.forEach((tr) => {
        tr.style.backgroundColor = "white";
      });
      console.log(this.state.emailList);
      this.props.disableState();
      console.log("unchecked");
    }
  };
  render() {
    return (
      <>
        <div className="table-btn">
          {this.state.checked <= 1 ? (
            <>
              {this.state.checked == 1 ? (
                <>
                  <h5>1 Certificate Selected</h5>
                </>
              ) : (
                <>
                  {this.props.modified == 1 ? (
                    <>
                      <h5>{this.props.data.length} Certificates</h5>
                    </>
                  ) : (
                    <>
                      <h5>{this.props.allCert.length} Certificates</h5>
                    </>
                  )}
                </>
              )}
            </>
          ) : (
            <>
              <h5>{this.state.checked} Certificates Selected</h5>
            </>
          )}

          <div
            id="resend-btn"
            onClick={() => this.props.emailLoop(this.state.emailList)}
          >
            Resend Email
          </div>
        </div>
        <div className="hr2"></div>
        <div className="tab">
          {this.props.data != undefined ? (
            <>
              <table class="content-table">
                <thead>
                  <tr>
                    {this.props.data.length != 0 ? (
                      <>
                        {this.props.modified == 1 ? (
                          <>
                            <th>
                              <input
                                type="checkbox"
                                className="commonChk allCheck"
                                onClick={() => this.togData()}
                              />
                            </th>
                          </>
                        ) : (
                          <>
                            <th>
                              <input
                                type="checkbox"
                                className="commonChk allCheck"
                                onClick={() => this.tog()}
                              />
                            </th>
                          </>
                        )}
                      </>
                    ) : (
                      <>
                        <th>
                          <input
                            type="checkbox"
                            className="commonChk allCheck"
                            onClick={() => this.tog()}
                            disabled
                          />
                        </th>
                      </>
                    )}
                    <th>Id</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Department</th>
                    <th>Issue Date</th>
                  </tr>
                </thead>
                <tbody>
                  {this.props.data.map((item) => (
                    <tr className={"commontr tr" + item.SAP.toNumber()}>
                      <td>
                        <input
                          type="checkbox"
                          className={"commonChk  chk" + item.SAP.toNumber()}
                          onChange={() => this.send(item, item.SAP.toNumber())}
                        />
                      </td>
                      <td>
                        <a href={"certificate/" + item.transactionHash}>
                          {item.certid.toNumber()}
                        </a>
                      </td>
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                      <td>{item.course}</td>
                      <td>{item.issueDate}</td>
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
