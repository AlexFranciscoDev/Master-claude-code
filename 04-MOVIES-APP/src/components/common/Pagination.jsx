import './Pagination.css';

function getPageNumbers(currentPage, totalPages) {
  const pages = [];
  const start = Math.max(1, currentPage - 2);
  const end = Math.min(totalPages, start + 4);
  for (let page = start; page <= end; page += 1) {
    pages.push(page);
  }
  return pages;
}

export function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const pages = getPageNumbers(currentPage, totalPages);

  return (
    <nav className="pagination" aria-label="Pagination">
      <button
        type="button"
        className="btn btn-secondary"
        disabled={currentPage <= 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Prev
      </button>

      <ul className="pagination__pages">
        {pages.map((page) => (
          <li key={page}>
            <button
              type="button"
              className={`pagination__page ${page === currentPage ? 'is-active' : ''}`}
              aria-current={page === currentPage ? 'page' : undefined}
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          </li>
        ))}
      </ul>

      <p className="pagination__summary">
        Page {currentPage} of {totalPages}
      </p>

      <button
        type="button"
        className="btn btn-secondary"
        disabled={currentPage >= totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </button>
    </nav>
  );
}
