import Button from '../ui/Button'
import { formatDisplayDate, getReservationEndTime } from '../../utils/dateHelpers'
import { ZONE_LABELS } from '../../utils/constants'

const ReservationSummarySidebar = ({ partySize, date, startTime, zone, onConfirm, submitting, canConfirm }) => (
  <aside className="bg-surface-container rounded-xl p-space-lg flex flex-col gap-space-md shadow-2xl sticky top-24 h-fit">
    <h2 className="font-headline-sm text-headline-sm uppercase text-on-surface">Booking Summary</h2>
    <dl className="flex flex-col gap-space-sm font-body-md text-body-md">
      <div className="flex items-center justify-between">
        <dt className="text-on-surface-variant font-label-md text-label-md uppercase">Guests</dt>
        <dd className="font-bold text-on-surface">{partySize ?? '—'}</dd>
      </div>
      <div className="flex items-center justify-between">
        <dt className="text-on-surface-variant font-label-md text-label-md uppercase">Date</dt>
        <dd className="font-bold text-on-surface">{date ? formatDisplayDate(date) : '—'}</dd>
      </div>
      <div className="flex items-center justify-between">
        <dt className="text-on-surface-variant font-label-md text-label-md uppercase">Time</dt>
        <dd className="font-bold text-primary">
          {startTime ? `${startTime} – ${getReservationEndTime(startTime)}` : '—'}
        </dd>
      </div>
      <div className="flex items-center justify-between">
        <dt className="text-on-surface-variant font-label-md text-label-md uppercase">Zone</dt>
        <dd className="font-bold text-on-surface">{zone ? ZONE_LABELS[zone] : '—'}</dd>
      </div>
    </dl>
    <Button onClick={onConfirm} disabled={!canConfirm || submitting} className="w-full">
      {submitting ? 'Confirming…' : 'Confirm Reservation'}
    </Button>
  </aside>
)

export default ReservationSummarySidebar
