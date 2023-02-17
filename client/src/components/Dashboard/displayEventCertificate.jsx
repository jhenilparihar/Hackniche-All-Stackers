import React, { Component } from "react";
import EventTable from "./EventTable";
import Pagination from "./Pagination";
import s from "./assets/search.svg";
import close from "./assets/close.svg";
import filter from "./assets/filter.svg";

class DisplayEventCert extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      currentPage: 1,
      postsPerPage: 10,
      passoutyear: 0,
      py: 0,
      filters: 0,
      eventName: "",
      dept: "",
      certid: 0,
      sp: 0,
      modified: 0,
    };
  }
  componentDidMount() {
    this.interval = setInterval(() => this.tick(), 500);
    this.props.handleActiveLink("#all2");
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }
  tick() {
    if (this.state.query.length != "") {
      this.setState({ modified: 1 });
    } else if (this.state.filters != 0) {
      this.setState({ modified: 1 });
    } else {
      this.setState({ modified: 0 });
    }
  }

  emailLoop = (certList) => {
    certList.forEach((cert) => {
      this.props.sendEmail(
        cert.name,
        cert.email,
        "http://localhost:3000/event-certificate/" + cert.transactionHash,
        cert.eventName
      );
    });
  };
  enableState = () => {
    var btnstate = document.getElementById("resend-btn");
    btnstate.style.backgroundColor = "white";
    btnstate.style.color = "#40a9ff";
    btnstate.style.border = "1px solid #40a9ff";
    btnstate.style.cursor = "pointer";
  };
  disableState = () => {
    var btnstate = document.getElementById("resend-btn");
    btnstate.style.color = "rgba(0,0,0,0.25)";
    btnstate.style.border = "1px solid #d9d9d9";
    btnstate.style.cursor = "not-allowed";
  };
  paginate = (pageNumber) => this.setState({ currentPage: pageNumber });
  search = () => {
    const indexOfLastPost = this.state.currentPage * this.state.postsPerPage;
    const indexOfFirstPost = indexOfLastPost - this.state.postsPerPage;
    const allCert = this.props.allCert;

    if (this.state.query.length != "") {
      return allCert.filter((item) =>
        item.name.toLowerCase().includes(this.state.query)
      );
    } else if (this.state.filters != 0) {
      if (this.state.filters == 1) {
        if (this.state.passoutyear != 0) {
          return allCert.filter(
            (item) => item.passoutYear.toNumber() == this.state.passoutyear
          );
        } else if (this.state.certid != 0) {
          return allCert.filter(
            (item) => item.certid.toNumber() == this.state.certid
          );
        } else {
          return allCert.filter(
            (item) => item.eventName.toLowerCase() == this.state.eventName
          );
        }
      } else if (this.state.filters == 2) {
        if (this.state.eventName != "") {
          if (this.state.passoutyear != 0) {
            const dt = allCert.filter(
              (item) => item.eventName.toLowerCase() == this.state.eventName
            );
            return dt.filter(
              (item) => item.passoutYear == this.state.passoutyear
            );
          } else {
            const dt = allCert.filter(
              (item) => item.eventName.toLowerCase() == this.state.eventName
            );
            return dt.filter((item) => item.certid == this.state.certid);
          }
        } else {
          const dt = allCert.filter(
            (item) => item.passoutYear == this.state.passoutyear
          );
          return dt.filter((item) => item.certid == this.state.certid);
        }
      } else {
        console.log("yes its ");
        const at1 = allCert.filter(
          (item) => item.passoutYear.toNumber() == this.state.passoutyear
        );

        const at = at1.filter(
          (item) => item.certid.toNumber() == this.state.certid
        );
        return at.filter(
          (item) => item.eventName.toLowerCase() == this.state.eventName
        );
      }
    } else {
      return allCert.slice(indexOfFirstPost, indexOfLastPost);
    }
  };
  toggleFilterdiv = () => {
    document.querySelector(".eventName-div").style.display = "none";
    document.querySelector(".passout-div").style.display = "none";
    document.querySelector(".certid-div").style.display = "none";
    var x = document.querySelector(".fill");
    if (x.style.display == "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
    // console.log(this.state.passoutyear);
  };
  setquery = async (query) => {
    await this.setState({ query: query });
  };
  dept = () => {
    document.querySelector(".fill").style.display = "none";
    document.querySelector(".eventName-div").style.display = "block";
  };
  passout = () => {
    document.querySelector(".fill").style.display = "none";
    document.querySelector(".passout-div").style.display = "block";
  };
  certid = () => {
    document.querySelector(".fill").style.display = "none";
    document.querySelector(".certid-div").style.display = "block";
  };
  addYear = async () => {
    if (this.state.passoutyear == 0) {
      await this.setState({ filters: this.state.filters + 1 });
    }
    await this.setState({ query: "" });
    await this.setState({ passoutyear: this.state.py });
    await this.setState({ py: 0 });

    document.querySelector(".passout-div").style.display = "none";
    console.log(this.state.passoutyear);
  };
  addDept = async () => {
    if (this.state.eventName == "") {
      await this.setState({ filters: this.state.filters + 1 });
    }
    await this.setState({ query: "" });
    await this.setState({ eventName: this.state.dept });

    document.querySelector(".eventName-div").style.display = "none";
    console.log(this.state.eventName);
  };
  addcertid = async () => {
    if (this.state.certid == 0) {
      await this.setState({ filters: this.state.filters + 1 });
    }
    await this.setState({ query: "" });
    await this.setState({ certid: this.state.sp });
    await this.setState({ sp: 0 });

    document.querySelector(".certid-div").style.display = "none";
    console.log(this.state.certid);
  };
  clearFilters = async () => {
    await this.setState({ certid: 0 });
    await this.setState({ sp: 0 });
    await this.setState({ eventName: "" });
    await this.setState({ dept: "" });
    await this.setState({ passoutyear: 0 });
    await this.setState({ py: 0 });
    await this.setState({ filters: 0 });
  };
  clearDept = async () => {
    await this.setState({ eventName: "" });
    await this.setState({ dept: "" });
    await this.setState({ filters: this.state.filters - 1 });
  };
  clearcertid = async () => {
    await this.setState({ certid: 0 });
    await this.setState({ sp: 0 });
    await this.setState({ filters: this.state.filters - 1 });
  };
  clearYear = async () => {
    await this.setState({ passoutyear: 0 });
    await this.setState({ py: 0 });
    await this.setState({ filters: this.state.filters - 1 });
  };
  render() {
    return (
      <>
        <div class="wap">
          <div className="upper-div">
            <div className="tag-div">
              <span class="cer1">Certificates</span>
              <h1 class="cer2">Certificates</h1>
            </div>
          </div>
          <div className="lower-div">
            <div className="filter-div">
              <div className="search-div">
                <h5>
                  <span>
                    <img src={s} alt="" />
                  </span>
                  Search
                </h5>
                <div className="input-box">
                  <input
                    type="text"
                    class="search"
                    placeholder="Search by Name"
                    onChange={(event) =>
                      this.setquery(event.target.value.toLowerCase())
                    }
                  />
                </div>
              </div>
              <div className="hr-div"></div>
              <div className="search-div">
                <div className="filter-header">
                  <h5>
                    <span>
                      <img src={filter} alt="" />
                    </span>
                    Filter
                  </h5>
                </div>

                <div className="add-filter">
                  <span>
                    <span class="filter-plus">+</span> Add Filters
                  </span>
                </div>
              </div>
              
            </div>
            <div className="table-div">
              <EventTable
                allCert={this.props.allCert}
                data={this.search()}
                enableState={this.enableState}
                disableState={this.disableState}
                emailLoop={this.emailLoop}
                modified={this.state.modified}
              />

              <div className="pagination-div">
                {this.state.modified == 0 ? (
                  <Pagination
                    postsPerPage={this.state.postsPerPage}
                    totalPosts={this.props.allCert.length}
                    paginate={this.paginate}
                  />
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default DisplayEventCert;
