import './Modal.css';

export function Modal({ title, children, onClose, onConfirm, confirmLabel = 'Confirm' }) {
  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) onClose();
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <header className="modal__header">
          <h2 id="modal-title" className="modal__title">
            {title}
          </h2>
          <button type="button" className="modal__close" aria-label="Close dialog" onClick={onClose}>
            ×
          </button>
        </header>
        <div className="modal__body">{children}</div>
        <footer className="modal__footer">
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          {onConfirm && (
            <button type="button" className="btn btn-primary" onClick={onConfirm}>
              {confirmLabel}
            </button>
          )}
        </footer>
      </div>
    </div>
  );
}
