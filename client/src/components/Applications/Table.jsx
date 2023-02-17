import React, { Component } from "react";
import { Add, Edit, Delete, Confirm, Cancel } from "./Svg";

class Table extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <>
        <div className="table-btn">
          <h5> Applications</h5>
        </div>
        <div className="hr2"></div>
        <div className="tab">
          {/* {this.props.data != undefined ? ( */}
          <>
            <table class="content-table">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Department</th>
                  <th>Application Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {/* {this.props.data.map((item) => ( */}
                <tr className={"commontr tr"}>
                  <td>
                    <a href={"certificate/"}>1</a>
                  </td>
                  <td>Jhenil</td>
                  <td>jhenil@mail.com</td>
                  <td>IT</td>
                  <td>1/2/2023</td>
                  <td>
                    <div className="">
                      <button name="conform-edit" className="action-btn">
                        <Confirm />
                      </button>
                      <button name="cancel-edit" className="action-btn">
                        <Cancel />
                      </button>
                    </div>
                  </td>
                </tr>
                {/* ))} */}
              </tbody>
            </table>
          </>
          {/* ) : null} */}
        </div>
      </>
    );
  }
}

export default Table;
