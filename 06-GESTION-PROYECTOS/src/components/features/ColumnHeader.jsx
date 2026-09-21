import { useState } from 'react'
import { useBoard } from '../../hooks/useBoard.js'
import { useToast } from '../../hooks/useToast.js'
import { IconButton } from '../ui/IconButton.jsx'
import { Modal } from '../ui/Modal.jsx'
import { ConfirmDialog } from './ConfirmDialog.jsx'
import { ColumnForm } from './ColumnForm.jsx'

export function ColumnHeader({ project, column }) {
  const { dispatch } = useBoard()
  const { showToast } = useToast()
  const [isEditing, setIsEditing] = useState(false)
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  function handleEdit() {
    setIsEditing(true)
    setIsMenuOpen(false)
  }

  function handleDelete() {
    setIsConfirmingDelete(true)
    setIsMenuOpen(false)
  }

  function confirmDelete() {
    dispatch({
      type: 'DELETE_COLUMN',
      projectId: project.id,
      columnId: column.id,
    })
    showToast('Column deleted')
    setIsConfirmingDelete(false)
  }

  return (
    <>
      <div className="flex items-center justify-between px-3 py-3">
        <h3 className="text-sm font-semibold text-text">{column.name}</h3>
        <div className="flex items-center gap-1">
          <span className="text-xs text-text-muted mr-1">{column.tasks.length}</span>
          <div className="relative">
            <IconButton label={`Column options for ${column.name}`} onClick={() => setIsMenuOpen((open) => !open)}>
              <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4" aria-hidden="true">
                <circle cx="10" cy="4" r="1.4" />
                <circle cx="10" cy="10" r="1.4" />
                <circle cx="10" cy="16" r="1.4" />
              </svg>
            </IconButton>

            {isMenuOpen ? (
              <div
                role="menu"
                className="absolute right-0 z-10 mt-1 w-[14rem] rounded-md border border-border bg-surface-raised py-1 shadow-xl"
              >
                <button
                  type="button"
                  role="menuitem"
                  onClick={handleEdit}
                  className="block w-full px-3 py-2 text-left text-sm text-text hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  Edit column
                </button>
                <div className="border-t border-border pt-1">
                  <button
                    type="button"
                    role="menuitem"
                    onClick={handleDelete}
                    className="block w-full px-3 py-2 text-left text-sm text-danger hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  >
                    Delete column
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      {isEditing ? (
        <Modal title="Edit column" onClose={() => setIsEditing(false)}>
          <ColumnForm
            projectId={project.id}
            column={column}
            onDone={() => setIsEditing(false)}
          />
        </Modal>
      ) : null}

      {isConfirmingDelete ? (
        <ConfirmDialog
          title="Delete column"
          message={`Delete "${column.name}"? All tasks in this column will be removed.`}
          confirmLabel="Delete"
          onConfirm={confirmDelete}
          onCancel={() => setIsConfirmingDelete(false)}
        />
      ) : null}
    </>
  )
}
