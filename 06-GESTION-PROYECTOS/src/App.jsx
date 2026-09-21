import { BoardProvider } from './context/BoardContext.jsx'
import { ToastProvider } from './context/ToastContext.jsx'
import { AppShell } from './components/features/AppShell.jsx'
import { ToastViewport } from './components/ui/Toast.jsx'

function App() {
  return (
    <BoardProvider>
      <ToastProvider>
        <AppShell />
        <ToastViewport />
      </ToastProvider>
    </BoardProvider>
  )
}

export default App
