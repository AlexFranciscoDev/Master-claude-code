import { NavLink, Outlet } from 'react-router-dom'

const adminLinkClass = ({ isActive }) =>
  `flex items-center gap-space-sm px-space-md py-space-sm rounded font-label-md text-label-md uppercase tracking-wider transition-colors ${
    isActive ? 'bg-primary-container text-on-primary-container' : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
  }`

const AdminLayout = () => (
  <div className="min-h-screen flex bg-background">
    <aside className="w-64 flex-shrink-0 bg-surface-container-lowest flex flex-col py-space-lg px-space-md gap-space-xs">
      <div className="px-space-sm mb-space-lg">
        <span className="font-headline-sm text-headline-sm uppercase text-on-surface">Admin Panel</span>
      </div>
      <nav className="flex flex-col gap-space-xs">
        <NavLink to="/admin" end className={adminLinkClass}>
          Dashboard
        </NavLink>
        <NavLink to="/admin/reservations" className={adminLinkClass}>
          Reservations
        </NavLink>
        <NavLink to="/admin/sections" className={adminLinkClass}>
          Menu Sections
        </NavLink>
        <NavLink to="/admin/dishes" className={adminLinkClass}>
          Dishes
        </NavLink>
        <NavLink to="/" className={adminLinkClass}>
          Exit to Storefront
        </NavLink>
      </nav>
    </aside>
    <main className="flex-1 px-gutter py-space-lg overflow-x-hidden">
      <Outlet />
    </main>
  </div>
)

export default AdminLayout
