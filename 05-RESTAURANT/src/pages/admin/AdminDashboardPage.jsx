import { useAdminReservations, useAdminDishes } from '../../hooks/useAdminData'

const AdminDashboardPage = () => {
  const { reservations } = useAdminReservations()
  const { dishes } = useAdminDishes()

  const today = new Date().toISOString().slice(0, 10)
  const todaysReservations = reservations.filter((r) => r.reservation_date === today && r.status === 'confirmed')
  const activeReservations = reservations.filter((r) => r.status === 'confirmed')
  const activeDishes = dishes.filter((d) => d.is_active)

  const metrics = [
    { label: "Today's Reservations", value: todaysReservations.length },
    { label: 'Total Active Reservations', value: activeReservations.length },
    { label: 'Active Menu Items', value: activeDishes.length },
  ]

  return (
    <div className="flex flex-col gap-space-lg">
      <h1 className="font-headline-lg text-headline-lg text-on-surface uppercase tracking-tight">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-md">
        {metrics.map((metric) => (
          <div key={metric.label} className="bg-surface-container-low p-space-md rounded shadow-sm">
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider block mb-space-xs">
              {metric.label}
            </span>
            <span className="font-headline-lg text-headline-lg text-on-surface">{metric.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AdminDashboardPage
