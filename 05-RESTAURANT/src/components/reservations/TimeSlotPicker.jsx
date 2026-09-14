import { TIME_SLOTS } from '../../utils/constants'

const TimeSlotPicker = ({ value, onChange, availability }) => (
  <fieldset className="flex flex-col gap-space-sm">
    <legend className="font-headline-md text-headline-md text-on-surface uppercase mb-space-xs">3. Time Slot</legend>
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-space-sm">
      {TIME_SLOTS.map((slot) => {
        const isFull = availability[slot] === false
        return (
          <label key={slot} className={isFull ? 'cursor-not-allowed' : 'cursor-pointer'}>
            <input
              type="radio"
              name="slot_time"
              value={slot}
              checked={value === slot}
              disabled={isFull}
              onChange={() => onChange(slot)}
              className="peer sr-only"
            />
            <div
              className={`p-space-md rounded flex flex-col items-center justify-center gap-1 transition-all ${
                isFull
                  ? 'bg-surface-container-lowest/60 text-on-surface-variant/40'
                  : 'bg-surface-container-low peer-checked:bg-primary-container peer-checked:text-on-primary-container hover:bg-surface-container-high'
              }`}
            >
              <span className="font-headline-sm text-headline-sm">{slot}</span>
              <span className="font-label-sm text-label-sm uppercase">{isFull ? 'Fully Booked' : 'Available'}</span>
            </div>
          </label>
        )
      })}
    </div>
  </fieldset>
)

export default TimeSlotPicker
