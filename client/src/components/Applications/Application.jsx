import React, { Component } from "react";
import Table from "./Table";
import Pagination from "./Pagination";
import s from "./assets/search.svg";
import close from "./assets/close.svg";
import filter from "./assets/filter.svg";

class Application extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      SAP: "",
      course: "",
      email: "",
      comment: "",
    };
  }

  sendApplication = async () => {};

  render() {
    return (
      <div class="wap">
        <div className="upper-div">
          <div className="tag-div">
            <span class="cer1">Application</span>
            <h1 class="cer2">Application</h1>
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

                <>
                  <button class="filter-btn" disabled>
                    <span>Clear all Filters</span>
                  </button>
                </>
              </div>

              <div className="add-filter">
                <span>
                  <span class="filter-plus">+</span> Add Filters
                </span>
              </div>
            </div>
            <div class="fill">
              <span>Department</span>
              <span>Passout year</span>
              <span>SAP Id</span>
            </div>
            <div className="department-div">
              <select class="form-select">
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
                <option value="Plastic Engineering">Plastic Engineering</option>
                <option value="Chemical Engineering">
                  Chemical Engineering
                </option>
              </select>
            </div>
            <div className="passout-div">
              <input list="browser" placeholder="Passout year" />
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

              <>
                <button className="apply-btn">Apply filter</button>
              </>
            </div>
            <div className="SAP-div">
              <input placeholder="Enter SAP" />

              <>
                <button className="apply-btn" onClick={this.addSAP}>
                  Apply filter
                </button>
              </>
            </div>
          </div>
          <div className="table-div">
            <Table
            //   allCert={this.props.allCert}
              addExtraCert={this.props.addExtraCert}
            />

            <div className="pagination-div">
                <Pagination
                  postsPerPage={10}
                  totalPosts={10}
                />
              
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Application;
