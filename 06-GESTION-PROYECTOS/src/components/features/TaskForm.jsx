import { useState } from 'react'
import { useBoard } from '../../hooks/useBoard.js'
import { useToast } from '../../hooks/useToast.js'
import { TextField } from '../ui/TextField.jsx'
import { TextArea } from '../ui/TextArea.jsx'
import { Select } from '../ui/Select.jsx'
import { Button } from '../ui/Button.jsx'

export function TaskForm({ projectId, columnId, task, onDone }) {
  const { dispatch } = useBoard()
  const { showToast } = useToast()
  const isEditing = Boolean(task)

  const [title, setTitle] = useState(task?.title ?? '')
  const [description, setDescription] = useState(task?.description ?? '')
  const [estimatedHours, setEstimatedHours] = useState(task?.estimatedHours ?? '')
  const [priority, setPriority] = useState(task?.priority ?? 'medium')
  const [errors, setErrors] = useState({})

  function handleSubmit(event) {
    event.preventDefault()

    const trimmedTitle = title.trim()
    const nextErrors = {}

    if (!trimmedTitle) {
      nextErrors.title = 'Add a title to continue'
    }

    const hoursValue = Number(estimatedHours)
    if (estimatedHours === '' || Number.isNaN(hoursValue) || hoursValue < 0) {
      nextErrors.estimatedHours = 'Enter a valid estimate'
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      return
    }

    if (isEditing) {
      dispatch({
        type: 'UPDATE_TASK',
        projectId,
        columnId,
        taskId: task.id,
        updates: {
          title: trimmedTitle,
          description: description.trim(),
          estimatedHours: hoursValue,
          priority,
        },
      })
      showToast('Task saved')
    } else {
      dispatch({
        type: 'CREATE_TASK',
        projectId,
        columnId,
        title: trimmedTitle,
        description: description.trim(),
        estimatedHours: hoursValue,
        priority,
      })
      showToast('Task created')
    }

    onDone()
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <TextField
        label="Title"
        id="task-title"
        value={title}
        onChange={(event) => {
          setTitle(event.target.value)
          if (errors.title) setErrors((current) => ({ ...current, title: undefined }))
        }}
        error={errors.title}
        placeholder="e.g. Design landing hero"
        autoFocus
      />
      <TextArea
        label="Description (optional)"
        id="task-description"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        placeholder="Add more context for this task"
      />
      <div className="grid grid-cols-2 gap-3">
        <TextField
          label="Estimated hours"
          id="task-estimated-hours"
          type="number"
          min="0"
          step="0.5"
          value={estimatedHours}
          onChange={(event) => {
            setEstimatedHours(event.target.value)
            if (errors.estimatedHours) {
              setErrors((current) => ({ ...current, estimatedHours: undefined }))
            }
          }}
          error={errors.estimatedHours}
          placeholder="e.g. 4"
        />
        <Select
          label="Priority"
          id="task-priority"
          value={priority}
          onChange={(event) => setPriority(event.target.value)}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </Select>
      </div>
      <div className="flex justify-end gap-2">
        <Button variant="secondary" onClick={onDone}>
          Cancel
        </Button>
        <Button type="submit">{isEditing ? 'Save task' : 'Create task'}</Button>
      </div>
    </form>
  )
}
