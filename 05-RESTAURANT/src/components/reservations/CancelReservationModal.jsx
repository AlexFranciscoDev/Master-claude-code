import ConfirmDialog from '../ui/ConfirmDialog'
import { formatDisplayDate } from '../../utils/dateHelpers'

const CancelReservationModal = ({ reservation, onConfirm, onCancel }) => (
  <ConfirmDialog
    isOpen={Boolean(reservation)}
    title="Cancel Reservation?"
    message={
      reservation
        ? `You are about to cancel your reservation for ${formatDisplayDate(reservation.reservation_date)} at ${reservation.start_time.slice(0, 5)}. This cannot be undone.`
        : ''
    }
    confirmLabel="Cancel Reservation"
    onConfirm={onConfirm}
    onCancel={onCancel}
  />
)

export default CancelReservationModal
