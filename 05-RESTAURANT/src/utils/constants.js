export const RESERVATION_DURATION_MINUTES = 90

export const TIME_SLOTS = [
  '12:00', '12:45', '13:30', '14:15',
  '19:00', '19:45', '20:30', '21:15', '22:00',
]

export const PARTY_SIZE_OPTIONS = [
  { value: 1, label: '1 Guest' },
  { value: 2, label: '2 Guests' },
  { value: 4, label: '3-4 Guests' },
  { value: 6, label: '5-6 Guests' },
]

export const ZONE_OPTIONS = [
  { value: 'counter', label: 'Counter' },
  { value: 'main_hall', label: 'Main Hall' },
  { value: 'terrace', label: 'Terrace' },
]

export const ZONE_LABELS = ZONE_OPTIONS.reduce((acc, zone) => {
  acc[zone.value] = zone.label
  return acc
}, {})

export const RESERVATION_STATUS_LABELS = {
  confirmed: 'Confirmed',
  cancelled: 'Cancelled',
}
