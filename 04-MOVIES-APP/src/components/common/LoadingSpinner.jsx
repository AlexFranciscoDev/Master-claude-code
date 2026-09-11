import './LoadingSpinner.css';

export function LoadingSpinner({ label = 'Loading…' }) {
  return (
    <div className="loading-spinner" role="status">
      <div className="loading-spinner__circle" aria-hidden="true" />
      <p className="loading-spinner__label">{label}</p>
    </div>
  );
}
