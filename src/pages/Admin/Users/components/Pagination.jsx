export default function UserPagination({ pageNumber, totalPages, onChange }) {
  if (!totalPages || totalPages <= 1) return null;

  return (
    <div className="pagination">
      {/* Prev */}
      <button
        onClick={() => onChange(pageNumber - 1)}
        disabled={pageNumber === 1}
        className="pagination__btn"
      >
        Prev
      </button>

      {/* Page info */}
      <div className="pagination__info">
        Page <b>{pageNumber}</b> / {totalPages}
      </div>

      {/* Next */}
      <button
        onClick={() => onChange(pageNumber + 1)}
        disabled={pageNumber === totalPages}
        className="pagination__btn"
      >
        Next
      </button>
    </div>
  );
}
