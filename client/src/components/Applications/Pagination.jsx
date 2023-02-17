import React from "react";
import { useState } from "react";
import left from "./assets/left.svg";
import right from "./assets/right.svg";

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  const [page, setPage] = useState(1);

  function pagination(decision) {
    var p = 0;
    if (decision == "inc") {
      p = page + 1;
      setPage(p);
    } else {
      p = page - 1;
      setPage(p);
    }
    dopainate(p);
  }
  function dopainate(pno) {
    paginate(pno);
  }
  return (
    <nav>
      <ul className="pagination">
        <li className="page-item">
          {page <= 1 ? (
            <button disabled className="page-link">
              <img class="pagination-img" src={left} alt="" />
            </button>
          ) : (
            <button onClick={() => pagination("dec")} className="page-link">
              <img class="pagination-img" src={left} alt="" />
            </button>
          )}
        </li>
        <li className="page-item">
          <button disabled className="page-link">
            {page}
          </button>
        </li>
        <li className="page-item">
          {page >= Math.ceil(totalPosts / postsPerPage) ? (
            <button disabled className="page-link">
              <img class="pagination-img" src={right} alt="" />
            </button>
          ) : (
            <button onClick={() => pagination("inc")} className="page-link">
              <img class="pagination-img" src={right} alt="" />
            </button>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
