import Modal from './Modal'
import Button from './Button'

const ConfirmDialog = ({ isOpen, title, message, confirmLabel = 'Confirm', onConfirm, onCancel }) => (
  <Modal
    isOpen={isOpen}
    title={title}
    onClose={onCancel}
    footer={
      <>
        <Button variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="danger" onClick={onConfirm}>
          {confirmLabel}
        </Button>
      </>
    }
  >
    <p className="font-body-md text-body-md text-on-surface-variant">{message}</p>
  </Modal>
)

export default ConfirmDialog
