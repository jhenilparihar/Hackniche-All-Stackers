import React, { Component } from "react";
import "./assets/popup.css";
import { Link } from "react-router-dom";

class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      certificateType: null,
      createType: "excel",
      toc: false,
    };
  }
  componentDidMount() {
    document.getElementById("excel").checked = true;
  }
  render() {
    return (
      <div>
        <div className="modal-mask">
          <div class="modal-content">
            <Link to="../dashboard">
              <button class="modal-close">
                <span class="modal-close-x">
                  <span
                    role="img"
                    aria-label="close"
                    class="anticon anticon-close ant-modal-close-icon"
                  >
                    <svg
                      viewBox="64 64 896 896"
                      focusable="false"
                      data-icon="close"
                      width="1em"
                      height="1em"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"></path>
                    </svg>
                  </span>
                </span>
              </button>
            </Link>

            <div class="modal-header">
              <div class="modal-title">Select group of recipients</div>
            </div>
            <div class="modal-body">
              <div class="modal-form">
                <div class="form-item">
                  <div>
                    <label title="Group name">
                      <span className="required">*</span> Group name
                    </label>
                  </div>
                  <div>
                    <div class="div-input-select">
                      <div class="select-selector">
                        <select
                          class="select-selection-search"
                          onChange={(e) => {
                            this.setState({
                              certificateType: e.target.value,
                            });
                          }}
                        >
                          <option selected disabled>
                            Select certificate type
                          </option>
                          <option value="academic">Academic Certificate</option>
                          <option value="event">Event Certificate</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="form-item">
                  <label title="How would you like to add recipient details?">
                    How would you like to add recipient details?
                  </label>
                  <br />
                   {" "}
                  <input
                    id="excel"
                    value="excel"
                    type="radio"
                    className="small_input"
                    onChange={() => {
                      this.setState({
                        createType: "excel",
                      });
                      document.getElementById("single").checked = false;
                    }}
                  />
                   {" "}
                  <label for="excel">
                    I would like to upload a spreadsheet with a list of
                    recipients.
                  </label>{" "}
                  <br /> {" "}
                  <input
                    type="radio"
                    id="single"
                    value="single"
                    className="small_input"
                    onChange={() => {
                      this.setState({
                        createType: "single",
                      });
                      document.getElementById("excel").checked = false;
                    }}
                  />
                   {" "}
                  <label for="single">
                    I would like to add the recipient details manually, one by
                    one.
                  </label>
                </div>
                <div>
                  <label>
                     {" "}
                    <input
                      id="toc"
                      type="checkbox"
                      className="small_input"
                      checked={this.state.toc}
                      onChange={() => {
                        this.setState({
                          toc: document.getElementById("toc").checked,
                        });
                      }}
                    />
                     {" "}
                    <span>
                      I have the right to use the personal data of these
                      recipients.
                    </span>
                  </label>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              {this.state.certificateType === null || !this.state.toc ? (
                <button className="publish_btn" type="submit" disabled="true">
                  <span>Add Recipients</span>
                </button>
              ) : (
                <button
                  className="publish_btn"
                  type="submit"
                  onClick={() =>
                    this.props.modalFormHandle(
                      this.state.createType,
                      this.state.certificateType
                    )
                  }
                >
                  <span>Add Recipients</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;
