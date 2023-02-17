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

  render() {
    return (
      <>
        <div className="table-btn">
          <>
            <>
              <>
                <h5>{this.props.data.length} Certificates</h5>
              </>
            </>
          </>

          <div id="resend-btn">Resend Email</div>
        </div>
        <div className="hr2"></div>
        <div className="tab">
          {this.props.data != undefined ? (
            <>
              <table class="content-table">
                <thead>
                  <tr>
                    <th>
                      <input
                        type="checkbox"
                        className={"commonChk  chk"}
                      />
                    </th>
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
                        />
                      </td>
                      <td>
                        <a href={"bonfied-certificate/" + item.transactionHash}>
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
