import React, { Component } from "react";
import Table from "./Table";
import Pagination from "./Pagination";
import s from "./assets/search.svg";
import close from "./assets/close.svg";
import filter from "./assets/filter.svg";

class DisplayAllCert extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      currentPage: 1,
      postsPerPage: 10,
      passoutyear: 0,
      py: 0,
      filters: 0,
      department: "",
      dept: "",
      SAP: 0,
      sp: 0,
      modified: 0,
    };
  }
  componentDidMount() {
    this.interval = setInterval(() => this.tick(), 500);
    this.props.handleActiveLink("#all");
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
        "http://localhost:3000/certificate/" + cert.transactionHash,
        cert.course
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
        } else if (this.state.SAP != 0) {
          return allCert.filter(
            (item) => item.SAP.toNumber() == this.state.SAP
          );
        } else {
          return allCert.filter(
            (item) => item.course.toLowerCase() == this.state.department
          );
        }
      } else if (this.state.filters == 2) {
        if (this.state.department != "") {
          if (this.state.passoutyear != 0) {
            const dt = allCert.filter(
              (item) => item.course.toLowerCase() == this.state.department
            );
            return dt.filter(
              (item) => item.passoutYear == this.state.passoutyear
            );
          } else {
            const dt = allCert.filter(
              (item) => item.course.toLowerCase() == this.state.department
            );
            return dt.filter((item) => item.SAP == this.state.SAP);
          }
        } else {
          const dt = allCert.filter(
            (item) => item.passoutYear == this.state.passoutyear
          );
          return dt.filter((item) => item.SAP == this.state.SAP);
        }
      } else {
        console.log("yes its ");
        const at1 = allCert.filter(
          (item) => item.passoutYear.toNumber() == this.state.passoutyear
        );

        const at = at1.filter((item) => item.SAP.toNumber() == this.state.SAP);
        return at.filter(
          (item) => item.course.toLowerCase() == this.state.department
        );
      }
    } else {
      return allCert.slice(indexOfFirstPost, indexOfLastPost);
    }
  };
  toggleFilterdiv = () => {
    document.querySelector(".department-div").style.display = "none";
    document.querySelector(".passout-div").style.display = "none";
    document.querySelector(".SAP-div").style.display = "none";
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
    document.querySelector(".department-div").style.display = "block";
  };
  passout = () => {
    document.querySelector(".fill").style.display = "none";
    document.querySelector(".passout-div").style.display = "block";
  };
  SAP = () => {
    document.querySelector(".fill").style.display = "none";
    document.querySelector(".SAP-div").style.display = "block";
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
    if (this.state.department == "") {
      await this.setState({ filters: this.state.filters + 1 });
    }
    await this.setState({ query: "" });
    await this.setState({ department: this.state.dept });

    document.querySelector(".department-div").style.display = "none";
    console.log(this.state.department);
  };
  addSAP = async () => {
    if (this.state.SAP == 0) {
      await this.setState({ filters: this.state.filters + 1 });
    }
    await this.setState({ query: "" });
    await this.setState({ SAP: this.state.sp });
    await this.setState({ sp: 0 });

    document.querySelector(".SAP-div").style.display = "none";
    console.log(this.state.SAP);
  };
  clearFilters = async () => {
    await this.setState({ SAP: 0 });
    await this.setState({ sp: 0 });
    await this.setState({ department: "" });
    await this.setState({ dept: "" });
    await this.setState({ passoutyear: 0 });
    await this.setState({ py: 0 });
    await this.setState({ filters: 0 });
  };
  clearDept = async () => {
    await this.setState({ department: "" });
    await this.setState({ dept: "" });
    await this.setState({ filters: this.state.filters - 1 });
  };
  clearSAP = async () => {
    await this.setState({ SAP: 0 });
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
                  {this.state.filters != 0 ? (
                    <>
                      <button class="filter-btn" onClick={this.clearFilters}>
                        <span>Clear all Filters</span>
                      </button>
                    </>
                  ) : (
                    <>
                      <button class="filter-btn" disabled>
                        <span>Clear all Filters</span>
                      </button>
                    </>
                  )}
                </div>

                <div className="add-filter" onClick={this.toggleFilterdiv}>
                  <span>
                    <span class="filter-plus">+</span> Add Filters
                  </span>
                </div>
                {this.state.filters != 0 ? (
                  <>
                    {this.state.department != "" ? (
                      <>
                        <div className="show-filters">
                          <span class="display-filter">
                            Department: {this.state.department.toUpperCase()}{" "}
                            <span class="close-filter" onClick={this.clearDept}>
                              <img src={close} alt="" />
                            </span>
                          </span>
                        </div>
                      </>
                    ) : null}

                    {this.state.SAP != 0 ? (
                      <>
                        <div className="show-filters">
                          <span class="display-filter">
                            SAP: {this.state.SAP}{" "}
                            <span class="close-filter" onClick={this.clearSAP}>
                              <img src={close} alt="" />
                            </span>
                          </span>
                        </div>
                      </>
                    ) : null}

                    {this.state.passoutyear != "" ? (
                      <>
                        <div className="show-filters">
                          <span class="display-filter">
                            Passout year: {this.state.passoutyear}{" "}
                            <span class="close-filter" onClick={this.clearYear}>
                              <img src={close} alt="" />
                            </span>
                          </span>
                        </div>
                      </>
                    ) : null}
                  </>
                ) : (
                  <></>
                )}
              </div>
              <div class="fill">
                <span onClick={this.dept}>Department</span>
                <span onClick={this.passout}>Passout year</span>
                <span onClick={this.SAP}>SAP Id</span>
              </div>
              <div className="department-div">
                <select
                  class="form-select"
                  onChange={(event) =>
                    this.setState({ dept: event.target.value.toLowerCase() })
                  }
                >
                  <option selected disabled>
                    Department
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
                  <option value="Plastic Engineering">
                    Plastic Engineering
                  </option>
                  <option value="Chemical Engineering">
                    Chemical Engineering
                  </option>
                </select>
                {this.state.dept.length == "" ? (
                  <>
                    <button
                      className="apply-btn"
                      onClick={this.addDept}
                      disabled
                    >
                      Apply filter
                    </button>
                  </>
                ) : (
                  <>
                    <button className="apply-btn" onClick={this.addDept}>
                      Apply filter
                    </button>
                  </>
                )}
              </div>
              <div className="passout-div">
                <input
                  list="browser"
                  placeholder="Passout year"
                  onChange={(event) =>
                    this.setState({ py: event.target.value.toLowerCase() })
                  }
                />
                <datalist id="browser">
                  <option value="2001" />
                  <option value="2002" />
                  <option value="2003" />
                  <option value="2004" />
                  <option value="2005" />
                  <option value="2006" />
                  <option value="2007" />
                  <option value="2008" />
                  <option value="2009" />
                  <option value="2010" />
                  <option value="2011" />
                  <option value="2012" />
                  <option value="2013" />
                  <option value="2014" />
                  <option value="2015" />
                  <option value="2016" />
                  <option value="2017" />
                  <option value="2018" />
                  <option value="2019" />
                  <option value="2020" />
                  <option value="2021" />
                  <option value="2022" />
                </datalist>
                {this.state.py == 0 ? (
                  <>
                    <button
                      className="apply-btn"
                      onClick={this.addYear}
                      disabled
                    >
                      Apply filter
                    </button>
                  </>
                ) : (
                  <>
                    <button className="apply-btn" onClick={this.addYear}>
                      Apply filter
                    </button>
                  </>
                )}
              </div>
              <div className="SAP-div">
                <input
                  placeholder="Enter SAP"
                  onChange={(event) =>
                    this.setState({ sp: event.target.value })
                  }
                />
                {this.state.sp == 0 ? (
                  <>
                    <button
                      className="apply-btn"
                      onClick={this.addSAP}
                      disabled
                    >
                      Apply filter
                    </button>
                  </>
                ) : (
                  <>
                    <button className="apply-btn" onClick={this.addSAP}>
                      Apply filter
                    </button>
                  </>
                )}
              </div>
            </div>
            <div className="table-div">
              <Table
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

export default DisplayAllCert;
