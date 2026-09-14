import { NavLink } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { supabase } from '../../lib/supabaseClient'

const navLinkClass = ({ isActive }) =>
  `font-label-md text-label-md uppercase tracking-wider transition-colors ${
    isActive ? 'text-primary' : 'text-on-surface-variant hover:text-on-surface'
  }`

const Header = () => {
  const { user, isAdmin } = useAuth()

  const handleSignOut = async (event) => {
    event.preventDefault()
    await supabase.auth.signOut()
  }

  return (
    <header className="sticky top-0 z-40 h-20 bg-surface-container-lowest/90 backdrop-blur-xl shadow-md flex items-center justify-between px-gutter-mobile md:px-gutter">
      <NavLink to="/" className="flex flex-col">
        <span className="font-headline-sm text-headline-sm uppercase tracking-tight text-on-surface">The Kinetic Table</span>
        <span className="font-label-sm text-label-sm text-primary uppercase tracking-widest">Restaurant &amp; Reservations</span>
      </NavLink>
      <nav className="flex items-center gap-space-md">
        <NavLink to="/" className={navLinkClass} end>
          Menu
        </NavLink>
        <NavLink to="/reservations" className={navLinkClass}>
          Reservations
        </NavLink>
        {isAdmin ? (
          <NavLink to="/admin" className={navLinkClass}>
            Admin
          </NavLink>
        ) : null}
        {user ? (
          <button
            type="button"
            onClick={handleSignOut}
            className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant hover:text-error transition-colors"
          >
            Sign Out
          </button>
        ) : (
          <NavLink to="/login" className={navLinkClass}>
            Sign In
          </NavLink>
        )}
      </nav>
    </header>
  )
}

export default Header
