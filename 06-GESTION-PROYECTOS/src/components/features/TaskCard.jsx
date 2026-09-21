import { useState } from 'react'
import { useBoard } from '../../hooks/useBoard.js'
import { useToast } from '../../hooks/useToast.js'
import { IconButton } from '../ui/IconButton.jsx'
import { Modal } from '../ui/Modal.jsx'
import { ConfirmDialog } from './ConfirmDialog.jsx'
import { TaskForm } from './TaskForm.jsx'

const STATUS_LABELS = {
  todo: 'To Do',
  'in-progress': 'In Progress',
  review: 'Review',
  done: 'Done',
}

const STATUS_DOT_CLASSES = {
  todo: 'bg-status-todo',
  'in-progress': 'bg-status-progress',
  review: 'bg-status-review',
  done: 'bg-status-done',
}

const PRIORITY_LABELS = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
}

const PRIORITY_CLASSES = {
  low: 'bg-priority-low',
  medium: 'bg-priority-medium',
  high: 'bg-priority-high',
}

export function TaskCard({ project, column, task, onDragStart, onDragEnd, isDragging }) {
  const { dispatch } = useBoard()
  const { showToast } = useToast()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false)

  const otherColumns = project.columns.filter((candidate) => candidate.id !== column.id)

  function handleMoveTo(targetColumn) {
    dispatch({
      type: 'MOVE_TASK',
      projectId: project.id,
      taskId: task.id,
      fromColumnId: column.id,
      toColumnId: targetColumn.id,
      toIndex: targetColumn.tasks.length,
    })
    showToast(`Task moved to ${targetColumn.name}`)
    setIsMenuOpen(false)
  }

  function handleDelete() {
    dispatch({
      type: 'DELETE_TASK',
      projectId: project.id,
      columnId: column.id,
      taskId: task.id,
    })
    showToast('Task deleted')
    setIsConfirmingDelete(false)
  }

  return (
    <article
      draggable
      onDragStart={(event) => onDragStart(event, task, column)}
      onDragEnd={onDragEnd}
      className={`group relative rounded-md border border-border bg-surface p-3 text-left shadow-sm transition-[transform,box-shadow] motion-safe:duration-150 ${
        isDragging ? 'rotate-1 scale-[1.02] shadow-xl' : ''
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-sm font-medium text-text">{task.title}</h3>
        <div className="relative shrink-0">
          <IconButton
            label={`More actions for ${task.title}`}
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4" aria-hidden="true">
              <circle cx="10" cy="4" r="1.4" />
              <circle cx="10" cy="10" r="1.4" />
              <circle cx="10" cy="16" r="1.4" />
            </svg>
          </IconButton>

          {isMenuOpen ? (
            <div
              role="menu"
              className="absolute right-0 z-10 mt-1 w-[18rem] rounded-md border border-border bg-surface-raised py-1 shadow-xl"
            >
              <button
                type="button"
                role="menuitem"
                onClick={() => {
                  setIsEditing(true)
                  setIsMenuOpen(false)
                }}
                className="block w-full px-3 py-2 text-left text-sm text-text hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                Edit task
              </button>

              {otherColumns.length > 0 ? (
                <div className="border-t border-border py-1">
                  <p className="px-3 pb-1 pt-1 text-xs text-text-muted">Move to</p>
                  {otherColumns.map((target) => (
                    <button
                      key={target.id}
                      type="button"
                      role="menuitem"
                      onClick={() => handleMoveTo(target)}
                      className="block w-full px-3 py-2 text-left text-sm text-text hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                    >
                      {target.name}
                    </button>
                  ))}
                </div>
              ) : null}

              <div className="border-t border-border pt-1">
                <button
                  type="button"
                  role="menuitem"
                  onClick={() => {
                    setIsConfirmingDelete(true)
                    setIsMenuOpen(false)
                  }}
                  className="block w-full px-3 py-2 text-left text-sm text-danger hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  Delete task
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </div>

      {task.description ? (
        <p className="mt-1 text-sm text-text-muted">{task.description}</p>
      ) : null}

      <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
        <span className="text-text-muted">{task.estimatedHours}h</span>
        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-text-muted">
          <span
            className={`h-1.5 w-1.5 rounded-full ${STATUS_DOT_CLASSES[column.statusKey]}`}
            aria-hidden="true"
          />
          {STATUS_LABELS[column.statusKey]}
        </span>
        <span
          className={`px-1.5 py-0.5 rounded text-bg font-medium ${PRIORITY_CLASSES[task.priority ?? 'medium']}`}
          title={`Priority: ${PRIORITY_LABELS[task.priority ?? 'medium']}`}
        >
          {PRIORITY_LABELS[task.priority ?? 'medium']}
        </span>
      </div>

      {isEditing ? (
        <Modal title="Edit task" onClose={() => setIsEditing(false)}>
          <TaskForm
            projectId={project.id}
            columnId={column.id}
            task={task}
            onDone={() => setIsEditing(false)}
          />
        </Modal>
      ) : null}

      {isConfirmingDelete ? (
        <ConfirmDialog
          title="Delete task"
          message={`Delete "${task.title}"? This can't be undone.`}
          confirmLabel="Delete"
          onConfirm={handleDelete}
          onCancel={() => setIsConfirmingDelete(false)}
        />
      ) : null}
    </article>
  )
}
