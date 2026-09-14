import { useToast } from '../../hooks/useToast'

const VARIANT_STYLES = {
  success: 'border-primary-container text-primary',
  error: 'border-error text-error',
  info: 'border-outline-variant text-on-surface',
}

const ToastContainer = () => {
  const { toasts, dismissToast } = useToast()

  return (
    <div className="fixed bottom-space-lg right-space-lg z-50 flex flex-col gap-space-sm">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          role="status"
          className={`min-w-[24rem] max-w-sm rounded bg-surface-container-high border px-space-md py-space-sm shadow-lg flex items-center justify-between gap-space-sm ${VARIANT_STYLES[toast.variant] ?? VARIANT_STYLES.info}`}
        >
          <p className="font-body-md text-body-md text-on-surface">{toast.message}</p>
          <button
            type="button"
            onClick={() => dismissToast(toast.id)}
            className="text-on-surface-variant hover:text-on-surface font-label-sm text-label-sm uppercase"
            aria-label="Dismiss notification"
          >
            Close
          </button>
        </div>
      ))}
    </div>
  )
}

export default ToastContainer
