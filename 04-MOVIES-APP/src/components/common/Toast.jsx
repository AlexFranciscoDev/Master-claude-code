import { useToast } from '../../hooks/useToast';
import './Toast.css';

export function ToastHost() {
  const { toasts, removeToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className="toast-host" role="status" aria-live="polite">
      {toasts.map((toast) => (
        <div key={toast.id} className={`toast toast--${toast.variant}`}>
          <p className="toast__message">{toast.message}</p>
          <button
            type="button"
            className="toast__close"
            aria-label="Dismiss notification"
            onClick={() => removeToast(toast.id)}
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
}
