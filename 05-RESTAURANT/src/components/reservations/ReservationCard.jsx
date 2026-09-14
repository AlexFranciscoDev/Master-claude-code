import Badge from '../ui/Badge'
import Button from '../ui/Button'
import { formatDisplayDate } from '../../utils/dateHelpers'
import { ZONE_LABELS } from '../../utils/constants'

const ReservationCard = ({ reservation, onCancel }) => {
  const isCancelled = reservation.status === 'cancelled'

  return (
    <article className="bg-surface-container rounded-xl p-space-lg shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-space-md">
      <div className="flex flex-col gap-space-xs">
        <div className="flex items-center gap-space-sm">
          <Badge variant={isCancelled ? 'error' : 'success'}>{isCancelled ? 'Cancelled' : 'Confirmed'}</Badge>
          <span className="font-label-md text-label-md text-on-surface-variant">
            Table {reservation.restaurant_tables?.table_number} · {ZONE_LABELS[reservation.restaurant_tables?.zone]}
          </span>
        </div>
        <h3 className="font-headline-sm text-headline-sm text-on-surface uppercase">
          {formatDisplayDate(reservation.reservation_date)} · {reservation.start_time.slice(0, 5)}
        </h3>
        <p className="font-body-sm text-body-sm text-on-surface-variant">
          Party of {reservation.party_size}
          {reservation.notes ? ` · ${reservation.notes}` : ''}
        </p>
      </div>
      {!isCancelled ? (
        <Button variant="danger" onClick={() => onCancel(reservation)}>
          Cancel Reservation
        </Button>
      ) : null}
    </article>
  )
}

export default ReservationCard
