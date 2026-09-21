import { useState } from 'react'
import { useBoard } from '../../hooks/useBoard.js'
import { useToast } from '../../hooks/useToast.js'
import { TaskCard } from './TaskCard.jsx'
import { TaskForm } from './TaskForm.jsx'
import { ColumnHeader } from './ColumnHeader.jsx'
import { Modal } from '../ui/Modal.jsx'

const STATUS_STRIPE_CLASSES = {
  todo: 'border-t-status-todo',
  'in-progress': 'border-t-status-progress',
  review: 'border-t-status-review',
  done: 'border-t-status-done',
}

export function Column({ project, column }) {
  const { dispatch, state } = useBoard()
  const { showToast } = useToast()
  const [isAddingTask, setIsAddingTask] = useState(false)
  const [draggedTaskId, setDraggedTaskId] = useState(null)
  const [isDropTarget, setIsDropTarget] = useState(false)

  function handleDragStart(event, task) {
    event.dataTransfer.setData('text/plain', task.id)
    event.dataTransfer.effectAllowed = 'move'
    setDraggedTaskId(task.id)
  }

  function handleDragEnd() {
    setDraggedTaskId(null)
  }

  function handleDragOver(event) {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'
  }

  function handleDragEnter(event) {
    event.preventDefault()
    setIsDropTarget(true)
  }

  function handleDragLeave(event) {
    if (event.currentTarget.contains(event.relatedTarget)) return
    setIsDropTarget(false)
  }

  function handleDrop(event) {
    event.preventDefault()
    setIsDropTarget(false)

    const taskId = event.dataTransfer.getData('text/plain')
    if (!taskId) return

    const activeProject = state.projects.find((p) => p.id === project.id)
    const fromColumn = activeProject?.columns.find((c) =>
      c.tasks.some((task) => task.id === taskId),
    )
    if (!fromColumn) return

    dispatch({
      type: 'MOVE_TASK',
      projectId: project.id,
      taskId,
      fromColumnId: fromColumn.id,
      toColumnId: column.id,
      toIndex: column.tasks.length,
    })

    if (fromColumn.id !== column.id) {
      showToast(`Task moved to ${column.name}`)
    }
  }

  return (
    <div
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`flex flex-col rounded-b-lg rounded-t-md border border-border border-t-4 bg-surface transition-colors ${
        STATUS_STRIPE_CLASSES[column.statusKey]
      } ${isDropTarget ? 'bg-surface-raised' : ''}`}
    >
      <ColumnHeader project={project} column={column} />

      <div className="flex flex-1 flex-col gap-2 px-3 pb-3">
        {column.tasks.map((task) => (
          <TaskCard
            key={task.id}
            project={project}
            column={column}
            task={task}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            isDragging={draggedTaskId === task.id}
          />
        ))}

        <button
          type="button"
          onClick={() => setIsAddingTask(true)}
          className="rounded-md border border-dashed border-border px-3 py-2 text-left text-sm text-text-muted transition-colors hover:border-accent hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          + Add task
        </button>
      </div>

      {isAddingTask ? (
        <Modal title="New task" onClose={() => setIsAddingTask(false)}>
          <TaskForm
            projectId={project.id}
            columnId={column.id}
            onDone={() => setIsAddingTask(false)}
          />
        </Modal>
      ) : null}
    </div>
  )
}
