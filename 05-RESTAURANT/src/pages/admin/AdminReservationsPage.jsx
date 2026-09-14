import { useMemo, useState } from 'react'
import { useAdminReservations } from '../../hooks/useAdminData'
import { useToast } from '../../hooks/useToast'
import DataTable from '../../components/ui/DataTable'
import Badge from '../../components/ui/Badge'
import Modal from '../../components/ui/Modal'
import Button from '../../components/ui/Button'
import ConfirmDialog from '../../components/ui/ConfirmDialog'
import FormField from '../../components/ui/FormField'
import { ZONE_LABELS } from '../../utils/constants'

const AdminReservationsPage = () => {
  const { reservations, updateReservation, cancelReservation } = useAdminReservations()
  const { showToast } = useToast()

  const [statusFilter, setStatusFilter] = useState('ALL')
  const [dateFilter, setDateFilter] = useState('')
  const [editingReservation, setEditingReservation] = useState(null)
  const [cancellingReservation, setCancellingReservation] = useState(null)
  const [editForm, setEditForm] = useState({ startTime: '', partySize: '' })

  const filteredReservations = useMemo(
    () =>
      reservations.filter((reservation) => {
        const matchesStatus = statusFilter === 'ALL' || reservation.status === statusFilter.toLowerCase()
        const matchesDate = !dateFilter || reservation.reservation_date === dateFilter
        return matchesStatus && matchesDate
      }),
    [reservations, statusFilter, dateFilter],
  )

  const openEditModal = (reservation) => {
    setEditingReservation(reservation)
    setEditForm({ startTime: reservation.start_time.slice(0, 5), partySize: reservation.party_size })
  }

  const handleSaveEdit = async (event) => {
    event.preventDefault()
    const { error } = await updateReservation(editingReservation.id, {
      start_time: editForm.startTime,
      party_size: Number(editForm.partySize),
    })
    setEditingReservation(null)

    if (error) {
      showToast(error, 'error')
      return
    }
    showToast('Reservation updated.', 'success')
  }

  const handleCancelConfirm = async () => {
    const { error } = await cancelReservation(cancellingReservation.id)
    setCancellingReservation(null)

    if (error) {
      showToast(error, 'error')
      return
    }
    showToast('Reservation cancelled.', 'success')
  }

  const columns = [
    { key: 'reservation_date', header: 'Date & Time', render: (row) => `${row.reservation_date} · ${row.start_time.slice(0, 5)}` },
    { key: 'party_size', header: 'Party', render: (row) => row.party_size },
    { key: 'zone', header: 'Table & Zone', render: (row) => `${row.restaurant_tables?.table_number} · ${ZONE_LABELS[row.restaurant_tables?.zone]}` },
    {
      key: 'status',
      header: 'Status',
      render: (row) => <Badge variant={row.status === 'confirmed' ? 'success' : 'error'}>{row.status}</Badge>,
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (row) => (
        <div className="flex items-center gap-space-xs">
          <button type="button" onClick={() => openEditModal(row)} className="text-primary font-label-sm text-label-sm uppercase">
            Modify
          </button>
          {row.status === 'confirmed' ? (
            <button
              type="button"
              onClick={() => setCancellingReservation(row)}
              className="text-error font-label-sm text-label-sm uppercase"
            >
              Cancel
            </button>
          ) : null}
        </div>
      ),
    },
  ]

  return (
    <div className="flex flex-col gap-space-lg">
      <h1 className="font-headline-lg text-headline-lg text-on-surface uppercase tracking-tight">Reservations</h1>

      <div className="bg-surface-container-low p-space-md rounded flex flex-col sm:flex-row gap-space-md">
        <FormField label="Status" htmlFor="status-filter">
          <select
            id="status-filter"
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            className="bg-surface-container text-on-surface px-space-sm py-2 rounded"
          >
            <option value="ALL">All</option>
            <option value="CONFIRMED">Confirmed</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
        </FormField>
        <FormField label="Date" htmlFor="date-filter">
          <input
            id="date-filter"
            type="date"
            value={dateFilter}
            onChange={(event) => setDateFilter(event.target.value)}
            className="bg-surface-container text-on-surface px-space-sm py-2 rounded"
          />
        </FormField>
      </div>

      <DataTable columns={columns} rows={filteredReservations} getRowKey={(row) => row.id} />

      <Modal
        isOpen={Boolean(editingReservation)}
        title="Modify Reservation"
        onClose={() => setEditingReservation(null)}
      >
        <form className="flex flex-col gap-space-md" onSubmit={handleSaveEdit}>
          <FormField label="Start Time" htmlFor="edit-time">
            <input
              id="edit-time"
              type="time"
              value={editForm.startTime}
              onChange={(event) => setEditForm((prev) => ({ ...prev, startTime: event.target.value }))}
              className="w-full bg-surface-container text-on-surface px-space-sm py-2 rounded"
            />
          </FormField>
          <FormField label="Party Size" htmlFor="edit-party">
            <input
              id="edit-party"
              type="number"
              min="1"
              value={editForm.partySize}
              onChange={(event) => setEditForm((prev) => ({ ...prev, partySize: event.target.value }))}
              className="w-full bg-surface-container text-on-surface px-space-sm py-2 rounded"
            />
          </FormField>
          <div className="flex justify-end gap-space-sm pt-space-sm">
            <Button variant="ghost" type="button" onClick={() => setEditingReservation(null)}>
              Cancel
            </Button>
            <Button type="submit">Save Changes</Button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        isOpen={Boolean(cancellingReservation)}
        title="Cancel Reservation?"
        message="This will cancel the guest's reservation and free up the table."
        confirmLabel="Cancel Reservation"
        onConfirm={handleCancelConfirm}
        onCancel={() => setCancellingReservation(null)}
      />
    </div>
  )
}

export default AdminReservationsPage
