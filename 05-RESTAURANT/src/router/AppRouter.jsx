import { Routes, Route } from 'react-router-dom'
import PublicLayout from '../components/layout/PublicLayout'
import AdminLayout from '../components/layout/AdminLayout'
import ProtectedRoute from './ProtectedRoute'
import AdminRoute from './AdminRoute'

import HomeMenuPage from '../pages/public/HomeMenuPage'
import LoginPage from '../pages/public/LoginPage'
import RegisterPage from '../pages/public/RegisterPage'
import ReservationPage from '../pages/public/ReservationPage'
import NotFoundPage from '../pages/public/NotFoundPage'

import AdminDashboardPage from '../pages/admin/AdminDashboardPage'
import AdminReservationsPage from '../pages/admin/AdminReservationsPage'
import AdminSectionsPage from '../pages/admin/AdminSectionsPage'
import AdminDishesPage from '../pages/admin/AdminDishesPage'

const AppRouter = () => (
  <Routes>
    <Route element={<PublicLayout />}>
      <Route path="/" element={<HomeMenuPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/reservations" element={<ReservationPage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Route>

    <Route element={<AdminRoute />}>
      <Route element={<AdminLayout />}>
        <Route path="/admin" element={<AdminDashboardPage />} />
        <Route path="/admin/reservations" element={<AdminReservationsPage />} />
        <Route path="/admin/sections" element={<AdminSectionsPage />} />
        <Route path="/admin/dishes" element={<AdminDishesPage />} />
      </Route>
    </Route>
  </Routes>
)

export default AppRouter
