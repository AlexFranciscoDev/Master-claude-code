import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'
import { useReservations } from '../../hooks/useReservations'
import { useToast } from '../../hooks/useToast'
import PartySizeStep from '../../components/reservations/PartySizeStep'
import DatePickerCalendar from '../../components/reservations/DatePickerCalendar'
import TimeSlotPicker from '../../components/reservations/TimeSlotPicker'
import ReservationSummarySidebar from '../../components/reservations/ReservationSummarySidebar'
import ReservationCard from '../../components/reservations/ReservationCard'
import CancelReservationModal from '../../components/reservations/CancelReservationModal'
import { TIME_SLOTS, ZONE_OPTIONS } from '../../utils/constants'
import { getReservationEndTime } from '../../utils/dateHelpers'

const ReservationPage = () => {
  const { reservations, createReservation, cancelReservation } = useReservations()
  const { showToast } = useToast()

  const [partySize, setPartySize] = useState(2)
  const [date, setDate] = useState('')
  const [startTime, setStartTime] = useState('')
  const [zone, setZone] = useState(ZONE_OPTIONS[0].value)
  const [notes, setNotes] = useState('')
  const [availability, setAvailability] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [reservationToCancel, setReservationToCancel] = useState(null)

  useEffect(() => {
    if (!date || !zone) return undefined
    let isCancelled = false

    const checkAvailability = async () => {
      const { data: candidateTables } = await supabase
        .from('restaurant_tables')
        .select('id')
        .eq('zone', zone)
        .eq('is_active', true)
        .gte('capacity', partySize)

      const { data: existingReservations } = await supabase
        .from('reservations')
        .select('table_id, start_time, end_time')
        .eq('reservation_date', date)
        .eq('status', 'confirmed')

      if (isCancelled || !candidateTables) return

      const totalCandidateTables = candidateTables.length
      const nextAvailability = {}

      TIME_SLOTS.forEach((slot) => {
        const slotEnd = getReservationEndTime(slot)
        const busyTableIds = new Set(
          (existingReservations ?? [])
            .filter((reservation) => reservation.start_time < slotEnd && reservation.end_time > slot)
            .map((reservation) => reservation.table_id),
        )
        const freeTables = candidateTables.filter((table) => !busyTableIds.has(table.id)).length
        nextAvailability[slot] = totalCandidateTables > 0 && freeTables > 0
      })

      setAvailability(nextAvailability)
    }

    checkAvailability()
    return () => {
      isCancelled = true
    }
  }, [date, zone, partySize])

  const canConfirm = Boolean(partySize && date && startTime && zone)

  const handleConfirm = async () => {
    setSubmitting(true)
    const { error } = await createReservation({ date, startTime, zone, partySize, notes })
    setSubmitting(false)

    if (error) {
      showToast(error, 'error')
      return
    }

    showToast('Reservation confirmed!', 'success')
    setStartTime('')
    setNotes('')
  }

  const handleCancelConfirm = async () => {
    if (!reservationToCancel) return
    const { error } = await cancelReservation(reservationToCancel.id)
    setReservationToCancel(null)

    if (error) {
      showToast(error, 'error')
      return
    }
    showToast('Reservation cancelled.', 'success')
  }

  return (
    <section className="w-full px-gutter-mobile md:px-margin py-space-xl flex flex-col gap-space-xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
        <div className="lg:col-span-8 flex flex-col gap-space-xl">
          <h1 className="font-headline-xl text-headline-xl text-on-surface uppercase tracking-tight">Reserve Your Table</h1>
          <PartySizeStep value={partySize} onChange={setPartySize} />

          <fieldset className="flex flex-col gap-space-sm">
            <legend className="font-headline-md text-headline-md text-on-surface uppercase mb-space-xs">2. Date</legend>
            <DatePickerCalendar value={date} onChange={setDate} />
          </fieldset>

          <fieldset className="flex flex-col gap-space-sm">
            <legend className="font-headline-md text-headline-md text-on-surface uppercase mb-space-xs">3. Zone</legend>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-space-sm">
              {ZONE_OPTIONS.map((option) => (
                <label key={option.value} className="cursor-pointer">
                  <input
                    type="radio"
                    name="zone"
                    value={option.value}
                    checked={zone === option.value}
                    onChange={() => setZone(option.value)}
                    className="peer sr-only"
                  />
                  <div className="p-space-md rounded bg-surface-container-low peer-checked:bg-surface-container-highest peer-checked:text-primary transition-all text-center">
                    <span className="font-headline-sm text-headline-sm text-on-surface">{option.label}</span>
                  </div>
                </label>
              ))}
            </div>
          </fieldset>

          {date ? <TimeSlotPicker value={startTime} onChange={setStartTime} availability={availability} /> : null}

          <fieldset className="flex flex-col gap-space-sm">
            <legend className="font-headline-md text-headline-md text-on-surface uppercase mb-space-xs">4. Special Requests</legend>
            <textarea
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              rows={3}
              placeholder="Allergies, celebrations, seating preferences…"
              className="w-full bg-surface-container-low rounded p-space-md text-on-surface font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-primary-container"
            />
          </fieldset>
        </div>

        <div className="lg:col-span-4">
          <ReservationSummarySidebar
            partySize={partySize}
            date={date}
            startTime={startTime}
            zone={zone}
            onConfirm={handleConfirm}
            submitting={submitting}
            canConfirm={canConfirm}
          />
        </div>
      </div>

      <div className="flex flex-col gap-space-md">
        <h2 className="font-headline-lg text-headline-lg text-on-surface uppercase tracking-tight">My Reservations</h2>
        {reservations.length === 0 ? (
          <p className="text-on-surface-variant">You have no reservations yet.</p>
        ) : (
          <div className="flex flex-col gap-space-md">
            {reservations.map((reservation) => (
              <ReservationCard key={reservation.id} reservation={reservation} onCancel={setReservationToCancel} />
            ))}
          </div>
        )}
      </div>

      <CancelReservationModal
        reservation={reservationToCancel}
        onConfirm={handleCancelConfirm}
        onCancel={() => setReservationToCancel(null)}
      />
    </section>
  )
}

export default ReservationPage
