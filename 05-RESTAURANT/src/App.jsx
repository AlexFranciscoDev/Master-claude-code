import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { ToastProvider } from './context/ToastContext'
import ToastContainer from './components/ui/ToastContainer'
import AppRouter from './router/AppRouter'

const App = () => (
  <BrowserRouter>
    <AuthProvider>
      <ToastProvider>
        <AppRouter />
        <ToastContainer />
      </ToastProvider>
    </AuthProvider>
  </BrowserRouter>
)

export default App
