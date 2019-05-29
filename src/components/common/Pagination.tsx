import React from 'react';
import { Link } from 'react-router-dom';

const Pagination = ({
  totalItems,
  pageSize,
  currentPage,
  generateLinkForPage
}: {
  totalItems: number;
  pageSize: number;
  currentPage: number;
  generateLinkForPage: (arg0: string | number) => string;
}) => {
  const getPager = () => {
    // calculate total pages
    const totalPages = Math.ceil(totalItems / pageSize);

    let startPage = 1;
    let endPage;
    if (totalPages <= 10) {
      // less than 10 total pages so show all
      startPage = 1;
      endPage = totalPages;
    } else if (currentPage <= 6) {
      startPage = 1;
      endPage = 10;
    } else if (currentPage + 4 >= totalPages) {
      startPage = totalPages - 9;
      endPage = totalPages;
    } else {
      startPage = currentPage - 5;
      endPage = currentPage + 4;
    }

    // calculate start and end item indexes
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

    // create an array of pages
    const pages = [...Array(endPage + 1 - startPage).keys()].map(
      i => startPage + i
    );

    // return object with all pager properties required by the view
    return {
      totalItems,
      currentPage,
      pageSize,
      totalPages,
      startPage,
      endPage,
      startIndex,
      endIndex,
      pages
    };
  };

  const pager = getPager();

  if (!pager.pages || pager.pages.length <= 1) {
    // don't display pager if there is only 1 page
    return null;
  }

  return (
    <ul className="pagination">
      <li className={`page-item ${pager.currentPage === 1 ? 'disabled' : ''}`}>
        <Link className="page-link" to={generateLinkForPage(1)}>
          Primera
        </Link>
      </li>
      <li className={`page-item ${pager.currentPage === 1 ? 'disabled' : ''}`}>
        <Link
          className="page-link"
          to={generateLinkForPage(pager.currentPage - 1)}
        >
          Anterior
        </Link>
      </li>
      {pager.pages.map(page => (
        <li
          key={`page-${page}`}
          className={`page-item ${pager.currentPage === page ? 'active' : ''}`}
        >
          <Link className="page-link" to={generateLinkForPage(page)}>
            {page}
          </Link>
        </li>
      ))}
      <li
        className={`page-item ${
          pager.currentPage === pager.totalPages ? 'disabled' : ''
        }`}
      >
        <Link
          className="page-link"
          to={generateLinkForPage(pager.currentPage + 1)}
        >
          Siguiente
        </Link>
      </li>
      <li
        className={`page-item ${
          pager.currentPage === pager.totalPages ? 'disabled' : ''
        }`}
      >
        <Link className="page-link" to={generateLinkForPage(pager.totalPages)}>
          Última
        </Link>
      </li>
    </ul>
  );
};

export default Pagination;
