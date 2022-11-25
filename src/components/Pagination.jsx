import React, { useState, useEffect } from "react";

function Pagination({ numberOfPages, currentPage, setCurrentPage }) {
  const [disabledPrev, setDisabledPrev] = useState(true);
  const [disabledNext, setDisabledNext] = useState(true);

  const pageNumbers = [...Array(numberOfPages + 1).keys()].slice(1);

  const nextPage = () => {
    if (currentPage !== numberOfPages) setCurrentPage(currentPage + 1);
  };
  const prevPage = () => {
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
  };

  useEffect(() => {
    if (currentPage > 1) {
      setDisabledPrev(false);
    } else {
      setDisabledPrev(true);
    }

    if (currentPage === numberOfPages) {
      setDisabledNext(true);
    } else {
      setDisabledNext(false);
    }
  }, [currentPage, numberOfPages]);
  return (
    <>
      <section>
        <ul className="pagination">
          <li>
            <p
              className={disabledPrev ? "disable-pag" : "prev"}
              onClick={prevPage}
            >
              Previous
            </p>
          </li>
          {pageNumbers.map((pgNumber) => (
            <li key={pgNumber}>
              <p
                onClick={() => setCurrentPage(pgNumber)}
                className="pagination-num"
              >
                {pgNumber}
              </p>
            </li>
          ))}
          <li>
            <p
              className={disabledNext ? "disable-pag" : "next"}
              onClick={nextPage}
            >
              Next
            </p>
          </li>
        </ul>
      </section>
    </>
  );
}

export default Pagination;
