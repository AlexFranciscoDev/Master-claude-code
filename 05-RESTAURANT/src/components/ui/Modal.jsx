const Modal = ({ isOpen, title, onClose, children, footer }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-surface-container-lowest/80 backdrop-blur-md flex items-center justify-center p-space-md">
      <div className="bg-surface-container-low rounded-lg max-w-lg w-full p-space-lg shadow-2xl flex flex-col gap-space-md">
        <div className="flex items-center justify-between">
          <h3 className="font-headline-sm text-headline-sm text-on-surface uppercase">{title}</h3>
          <button
            type="button"
            onClick={onClose}
            className="text-on-surface-variant hover:text-on-surface bg-surface-container-high rounded px-space-sm py-space-xs"
            aria-label="Close dialog"
          >
            Close
          </button>
        </div>
        <div className="flex flex-col gap-space-md">{children}</div>
        {footer ? <div className="flex items-center justify-end gap-space-sm pt-space-sm">{footer}</div> : null}
      </div>
    </div>
  )
}

export default Modal
