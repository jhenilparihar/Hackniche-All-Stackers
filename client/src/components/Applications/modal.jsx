import React, { Component } from "react";
import { Link } from "react-router-dom";

class Modal2 extends Component {
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
            <Link to="/applications">
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
              
            </div>
            <div class="modal-footer">
              
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Modal2;
