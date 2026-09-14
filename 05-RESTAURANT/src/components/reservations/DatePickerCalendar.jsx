import { useState } from 'react'
import { getMonthMatrix, isPastDate, toDateInputValue } from '../../utils/dateHelpers'

const WEEKDAY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

const DatePickerCalendar = ({ value, onChange }) => {
  const today = new Date()
  const [viewYear, setViewYear] = useState(today.getFullYear())
  const [viewMonth, setViewMonth] = useState(today.getMonth())

  const cells = getMonthMatrix(viewYear, viewMonth)
  const monthLabel = new Date(viewYear, viewMonth, 1).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })

  const goToPreviousMonth = () => {
    const previous = new Date(viewYear, viewMonth - 1, 1)
    setViewYear(previous.getFullYear())
    setViewMonth(previous.getMonth())
  }

  const goToNextMonth = () => {
    const next = new Date(viewYear, viewMonth + 1, 1)
    setViewYear(next.getFullYear())
    setViewMonth(next.getMonth())
  }

  return (
    <div className="bg-surface-container-low rounded-xl p-space-md flex flex-col gap-space-md">
      <div className="flex items-center justify-between">
        <span className="font-headline-sm text-headline-sm text-on-surface uppercase">{monthLabel}</span>
        <div className="flex items-center gap-space-xs">
          <button type="button" onClick={goToPreviousMonth} className="w-8 h-8 rounded bg-surface-container text-on-surface" aria-label="Previous month">
            ‹
          </button>
          <button type="button" onClick={goToNextMonth} className="w-8 h-8 rounded bg-surface-container text-on-surface" aria-label="Next month">
            ›
          </button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center font-label-sm text-label-sm text-on-surface-variant uppercase">
        {WEEKDAY_LABELS.map((day) => (
          <span key={day}>{day}</span>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1.5">
        {cells.map((day, index) => {
          if (day === null) return <div key={`empty-${index}`} />
          const dateValue = toDateInputValue(new Date(viewYear, viewMonth, day))
          const disabled = isPastDate(dateValue)
          const isSelected = value === dateValue

          return (
            <button
              key={dateValue}
              type="button"
              disabled={disabled}
              onClick={() => onChange(dateValue)}
              className={`p-2 rounded text-center font-body-md text-body-md transition-colors ${
                disabled
                  ? 'bg-surface-container-lowest/40 text-on-surface-variant/30 cursor-not-allowed'
                  : isSelected
                    ? 'bg-primary-container text-on-primary-container font-bold'
                    : 'bg-surface-container hover:bg-surface-container-high text-on-surface'
              }`}
            >
              {day}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default DatePickerCalendar
