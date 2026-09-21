import { useState } from 'react'
import { Column } from './Column.jsx'
import { ColumnForm } from './ColumnForm.jsx'
import { Modal } from '../ui/Modal.jsx'
import { Button } from '../ui/Button.jsx'

export function Board({ project }) {
  const [isAddingColumn, setIsAddingColumn] = useState(false)
  const sortedColumns = [...project.columns].sort((a, b) => a.order - b.order)

  return (
    <section aria-label={`${project.name} board`}>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold">{project.name}</h2>
        <Button variant="secondary" onClick={() => setIsAddingColumn(true)}>
          Add column
        </Button>
      </div>

      <div className="grid auto-cols-[minmax(28rem,1fr)] grid-flow-col gap-4 overflow-x-auto pb-4">
        {sortedColumns.map((column) => (
          <Column key={column.id} project={project} column={column} />
        ))}
      </div>

      {isAddingColumn ? (
        <Modal title="New column" onClose={() => setIsAddingColumn(false)}>
          <ColumnForm projectId={project.id} onDone={() => setIsAddingColumn(false)} />
        </Modal>
      ) : null}
    </section>
  )
}
