import './ErrorMessage.css';

export function ErrorMessage({ message = 'Something went wrong.', onRetry }) {
  return (
    <div className="error-message" role="alert">
      <p className="error-message__text">{message}</p>
      {onRetry && (
        <button type="button" className="btn btn-secondary" onClick={onRetry}>
          Try again
        </button>
      )}
    </div>
  );
}
