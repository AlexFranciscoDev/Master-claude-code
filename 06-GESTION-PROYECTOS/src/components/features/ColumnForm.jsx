import { useState } from 'react'
import { useBoard } from '../../hooks/useBoard.js'
import { useToast } from '../../hooks/useToast.js'
import { TextField } from '../ui/TextField.jsx'
import { Select } from '../ui/Select.jsx'
import { Button } from '../ui/Button.jsx'

const STATUS_OPTIONS = [
  { value: 'todo', label: 'To Do' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'review', label: 'Review' },
  { value: 'done', label: 'Done' },
]

export function ColumnForm({ projectId, column, onDone }) {
  const { dispatch } = useBoard()
  const { showToast } = useToast()
  const isEditing = Boolean(column)

  const [name, setName] = useState(column?.name ?? '')
  const [statusKey, setStatusKey] = useState(column?.statusKey ?? 'todo')
  const [error, setError] = useState('')

  function handleSubmit(event) {
    event.preventDefault()

    const trimmedName = name.trim()
    if (!trimmedName) {
      setError('Add a name to continue')
      return
    }

    if (isEditing) {
      dispatch({
        type: 'UPDATE_COLUMN',
        projectId,
        columnId: column.id,
        updates: { name: trimmedName, statusKey },
      })
      showToast('Column saved')
    } else {
      dispatch({ type: 'CREATE_COLUMN', projectId, name: trimmedName, statusKey })
      showToast('Column created')
    }

    onDone()
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <TextField
        label="Column name"
        id="column-name"
        value={name}
        onChange={(event) => {
          setName(event.target.value)
          if (error) setError('')
        }}
        error={error}
        placeholder="e.g. Blocked"
        autoFocus
      />
      <Select
        label="Status"
        id="column-status"
        value={statusKey}
        onChange={(event) => setStatusKey(event.target.value)}
      >
        {STATUS_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>
      <div className="flex justify-end gap-2">
        <Button variant="secondary" onClick={onDone}>
          Cancel
        </Button>
        <Button type="submit">{isEditing ? 'Save column' : 'Create column'}</Button>
      </div>
    </form>
  )
}
