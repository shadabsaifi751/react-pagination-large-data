import React from "react";

const Pagination = ({
  NoOFProduct,
  pageCount,
  paginationPrevHandle,
  paginationHandle,
  paginationNextHandle,
}) => {
  return (
    <div className="pagination">
      <button
        className="prev"
        disabled={pageCount === 0}
        onClick={paginationPrevHandle}
      >
        prev
      </button>
      {[...Array(NoOFProduct).keys()].map((n, key) => (
        <button
          key={key}
          className={pageCount === n ? "active" : ""}
          onClick={() => paginationHandle(n)}
        >
          {n + 1}
        </button>
      ))}
      <button
        className="Next"
        disabled={pageCount === NoOFProduct - 1}
        onClick={paginationNextHandle}
      >
        next
      </button>
    </div>
  );
};

export default Pagination;
