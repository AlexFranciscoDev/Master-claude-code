import { RESERVATION_DURATION_MINUTES } from './constants'

export const toDateInputValue = (date) => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export const isPastDate = (dateString) => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const target = new Date(`${dateString}T00:00:00`)
  return target < today
}

export const addMinutesToTime = (time, minutesToAdd) => {
  const [hours, minutes] = time.split(':').map(Number)
  const totalMinutes = hours * 60 + minutes + minutesToAdd
  const newHours = String(Math.floor(totalMinutes / 60) % 24).padStart(2, '0')
  const newMinutes = String(totalMinutes % 60).padStart(2, '0')
  return `${newHours}:${newMinutes}`
}

export const getReservationEndTime = (startTime) =>
  addMinutesToTime(startTime, RESERVATION_DURATION_MINUTES)

export const formatDisplayDate = (dateString) => {
  const date = new Date(`${dateString}T00:00:00`)
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export const getMonthMatrix = (year, month) => {
  const firstDay = new Date(year, month, 1)
  const startWeekday = (firstDay.getDay() + 6) % 7 // Monday-first
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const cells = []
  for (let i = 0; i < startWeekday; i += 1) {
    cells.push(null)
  }
  for (let day = 1; day <= daysInMonth; day += 1) {
    cells.push(day)
  }
  return cells
}
