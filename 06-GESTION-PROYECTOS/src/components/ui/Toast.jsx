import { useToast } from '../../hooks/useToast.js'

const VARIANT_BORDER = {
  success: 'border-l-status-done',
  error: 'border-l-danger',
  info: 'border-l-status-progress',
}

export function ToastViewport() {
  const { toasts, dismissToast } = useToast()

  if (toasts.length === 0) return null

  return (
    <div
      className="fixed bottom-4 right-4 z-50 flex flex-col gap-2"
      role="status"
      aria-live="polite"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`flex items-center gap-3 rounded-md border border-border border-l-4 bg-surface-raised px-4 py-3 text-sm text-text shadow-lg motion-safe:animate-toast-in ${VARIANT_BORDER[toast.variant] ?? VARIANT_BORDER.success}`}
        >
          <p>{toast.message}</p>
          <button
            type="button"
            onClick={() => dismissToast(toast.id)}
            aria-label="Dismiss notification"
            className="ml-2 text-text-muted hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <svg viewBox="0 0 20 20" fill="none" className="h-3.5 w-3.5" aria-hidden="true">
              <path
                d="M5 5l10 10M15 5L5 15"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      ))}
    </div>
  )
}
