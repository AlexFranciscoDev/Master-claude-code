import { useState } from 'react'
import { useBoard } from '../../hooks/useBoard.js'
import { Board } from './Board.jsx'
import { EmptyState } from './EmptyState.jsx'
import { ProjectForm } from './ProjectForm.jsx'
import { Modal } from '../ui/Modal.jsx'
import { Button } from '../ui/Button.jsx'

export function AppShell() {
  const { state, dispatch } = useBoard()
  const [isCreatingProject, setIsCreatingProject] = useState(false)

  const activeProject = state.projects.find((project) => project.id === state.activeProjectId)

  function handleSelectProject(projectId) {
    dispatch({ type: 'SET_ACTIVE_PROJECT', projectId })
  }

  return (
    <div className="flex min-h-screen flex-col bg-bg text-text">
      <header className="flex items-center justify-between border-b border-border px-6 py-4">
        <h1 className="text-2xl font-semibold">DailyWork</h1>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar con proyectos */}
        <aside className="w-60 border-r border-border bg-surface px-4 py-6 overflow-y-auto">
          <div className="mb-4">
            <h2 className="text-sm font-semibold text-text-muted mb-3">Projects</h2>
            <Button
              variant="secondary"
              onClick={() => setIsCreatingProject(true)}
              className="w-full"
            >
              New project
            </Button>
          </div>

          <nav className="flex flex-col gap-1">
            {state.projects.map((project) => (
              <button
                key={project.id}
                onClick={() => handleSelectProject(project.id)}
                type="button"
                className={`px-3 py-2 text-sm text-left rounded-md transition-colors ${
                  activeProject?.id === project.id
                    ? 'bg-accent text-bg font-medium'
                    : 'bg-surface-raised text-text hover:bg-surface-raised/80'
                }`}
              >
                {project.name}
              </button>
            ))}
          </nav>

          {state.projects.length === 0 ? (
            <p className="text-xs text-text-muted mt-4">No projects yet. Create one to get started.</p>
          ) : null}
        </aside>

        {/* Contenido principal */}
        <main className="flex-1 px-6 py-6 overflow-y-auto">
          {activeProject ? (
            <Board project={activeProject} />
          ) : (
            <EmptyState
              message="Select or create a project to start planning work."
              action={
                <button
                  type="button"
                  onClick={() => setIsCreatingProject(true)}
                  className="text-sm font-medium text-accent hover:text-accent-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  Create a project
                </button>
              }
            />
          )}
        </main>
      </div>

      {isCreatingProject ? (
        <Modal title="New project" onClose={() => setIsCreatingProject(false)}>
          <ProjectForm onDone={() => setIsCreatingProject(false)} />
        </Modal>
      ) : null}
    </div>
  )
}
