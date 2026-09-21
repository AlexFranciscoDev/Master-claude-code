import { useState } from 'react'
import { useBoard } from '../../hooks/useBoard.js'
import { useToast } from '../../hooks/useToast.js'
import { TextField } from '../ui/TextField.jsx'
import { Button } from '../ui/Button.jsx'

export function ProjectForm({ onDone }) {
  const { dispatch } = useBoard()
  const { showToast } = useToast()
  const [name, setName] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(event) {
    event.preventDefault()

    const trimmedName = name.trim()
    if (!trimmedName) {
      setError('Add a name to continue')
      return
    }

    dispatch({ type: 'CREATE_PROJECT', name: trimmedName })
    showToast('Project created')
    onDone()
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <TextField
        label="Project name"
        id="project-name"
        value={name}
        onChange={(event) => {
          setName(event.target.value)
          if (error) setError('')
        }}
        error={error}
        placeholder="e.g. Marketing Site"
        autoFocus
      />
      <div className="flex justify-end gap-2">
        <Button variant="secondary" onClick={onDone}>
          Cancel
        </Button>
        <Button type="submit">Create project</Button>
      </div>
    </form>
  )
}
