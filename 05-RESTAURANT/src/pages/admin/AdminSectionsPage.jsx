import { useState } from 'react'
import { useAdminMenuSections } from '../../hooks/useAdminData'
import { useToast } from '../../hooks/useToast'
import DataTable from '../../components/ui/DataTable'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import Modal from '../../components/ui/Modal'
import FormField from '../../components/ui/FormField'
import ConfirmDialog from '../../components/ui/ConfirmDialog'

const AdminSectionsPage = () => {
  const { sections, createSection, updateSection, deleteSection } = useAdminMenuSections()
  const { showToast } = useToast()

  const [isCreateOpen, setCreateOpen] = useState(false)
  const [newName, setNewName] = useState('')
  const [sectionToDelete, setSectionToDelete] = useState(null)

  const handleCreate = async (event) => {
    event.preventDefault()
    if (!newName.trim()) return

    const { error } = await createSection({ name: newName.trim(), displayOrder: sections.length + 1 })
    if (error) {
      showToast(error, 'error')
      return
    }
    setNewName('')
    setCreateOpen(false)
    showToast('Section created.', 'success')
  }

  const handleToggleActive = async (section) => {
    const { error } = await updateSection(section.id, { is_active: !section.is_active })
    if (error) showToast(error, 'error')
  }

  const handleDeleteConfirm = async () => {
    const { error } = await deleteSection(sectionToDelete.id)
    setSectionToDelete(null)
    if (error) {
      showToast(error, 'error')
      return
    }
    showToast('Section deleted.', 'success')
  }

  const columns = [
    { key: 'name', header: 'Name' },
    { key: 'display_order', header: 'Order' },
    {
      key: 'is_active',
      header: 'Status',
      render: (row) => <Badge variant={row.is_active ? 'success' : 'neutral'}>{row.is_active ? 'Active' : 'Hidden'}</Badge>,
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (row) => (
        <div className="flex items-center gap-space-xs">
          <button type="button" onClick={() => handleToggleActive(row)} className="text-primary font-label-sm text-label-sm uppercase">
            {row.is_active ? 'Hide' : 'Show'}
          </button>
          <button type="button" onClick={() => setSectionToDelete(row)} className="text-error font-label-sm text-label-sm uppercase">
            Delete
          </button>
        </div>
      ),
    },
  ]

  return (
    <div className="flex flex-col gap-space-lg">
      <div className="flex items-center justify-between">
        <h1 className="font-headline-lg text-headline-lg text-on-surface uppercase tracking-tight">Menu Sections</h1>
        <Button onClick={() => setCreateOpen(true)}>+ Add Section</Button>
      </div>

      <DataTable columns={columns} rows={sections} getRowKey={(row) => row.id} />

      <Modal isOpen={isCreateOpen} title="New Menu Section" onClose={() => setCreateOpen(false)}>
        <form className="flex flex-col gap-space-md" onSubmit={handleCreate}>
          <FormField label="Section Name" htmlFor="new-section-name">
            <input
              id="new-section-name"
              type="text"
              value={newName}
              onChange={(event) => setNewName(event.target.value)}
              placeholder="e.g. Starters"
              className="w-full bg-surface-container text-on-surface px-space-sm py-2 rounded"
            />
          </FormField>
          <div className="flex justify-end gap-space-sm pt-space-sm">
            <Button variant="ghost" type="button" onClick={() => setCreateOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Create</Button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        isOpen={Boolean(sectionToDelete)}
        title="Delete Section?"
        message="This section must have no dishes assigned to it before it can be deleted."
        confirmLabel="Delete"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setSectionToDelete(null)}
      />
    </div>
  )
}

export default AdminSectionsPage
