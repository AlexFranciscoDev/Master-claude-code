import { useState } from 'react'
import { useAdminDishes, useAdminMenuSections } from '../../hooks/useAdminData'
import { useToast } from '../../hooks/useToast'
import DataTable from '../../components/ui/DataTable'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import Modal from '../../components/ui/Modal'
import FormField from '../../components/ui/FormField'
import ConfirmDialog from '../../components/ui/ConfirmDialog'

const EMPTY_FORM = {
  name: '',
  description: '',
  price: '',
  sectionId: '',
  allergens: '',
  imageUrl: '',
}

const AdminDishesPage = () => {
  const { dishes, createDish, updateDish, deleteDish } = useAdminDishes()
  const { sections } = useAdminMenuSections()
  const { showToast } = useToast()

  const [editingDish, setEditingDish] = useState(null)
  const [isModalOpen, setModalOpen] = useState(false)
  const [form, setForm] = useState(EMPTY_FORM)
  const [dishToDelete, setDishToDelete] = useState(null)

  const openCreateModal = () => {
    setEditingDish(null)
    setForm({ ...EMPTY_FORM, sectionId: sections[0]?.id ?? '' })
    setModalOpen(true)
  }

  const openEditModal = (dish) => {
    setEditingDish(dish)
    setForm({
      name: dish.name,
      description: dish.description,
      price: String(dish.price),
      sectionId: dish.section_id,
      allergens: dish.allergens.join(', '),
      imageUrl: dish.image_url ?? '',
    })
    setModalOpen(true)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const payload = {
      name: form.name.trim(),
      description: form.description.trim(),
      price: Number(form.price),
      section_id: form.sectionId,
      allergens: form.allergens
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean),
      image_url: form.imageUrl.trim() || null,
    }

    const { error } = editingDish ? await updateDish(editingDish.id, payload) : await createDish(payload)

    setModalOpen(false)
    if (error) {
      showToast(error, 'error')
      return
    }
    showToast(editingDish ? 'Dish updated.' : 'Dish created.', 'success')
  }

  const handleToggleActive = async (dish) => {
    const { error } = await updateDish(dish.id, { is_active: !dish.is_active })
    if (error) showToast(error, 'error')
  }

  const handleDeleteConfirm = async () => {
    const { error } = await deleteDish(dishToDelete.id)
    setDishToDelete(null)
    if (error) {
      showToast(error, 'error')
      return
    }
    showToast('Dish deleted.', 'success')
  }

  const columns = [
    {
      key: 'image',
      header: 'Image',
      render: (row) =>
        row.image_url ? (
          <img src={row.image_url} alt={row.name} className="w-14 h-14 rounded object-cover bg-surface-container-high" />
        ) : (
          <span className="w-14 h-14 rounded bg-surface-container-high flex items-center justify-center text-on-surface-variant text-label-sm">
            —
          </span>
        ),
    },
    { key: 'name', header: 'Dish' },
    { key: 'section', header: 'Section', render: (row) => row.menu_sections?.name },
    { key: 'price', header: 'Price', render: (row) => `$${Number(row.price).toFixed(2)}` },
    {
      key: 'is_active',
      header: 'Status',
      render: (row) => (
        <button type="button" onClick={() => handleToggleActive(row)}>
          <Badge variant={row.is_active ? 'success' : 'neutral'}>{row.is_active ? 'In Stock' : 'Hidden'}</Badge>
        </button>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (row) => (
        <div className="flex items-center gap-space-xs">
          <button type="button" onClick={() => openEditModal(row)} className="text-primary font-label-sm text-label-sm uppercase">
            Edit
          </button>
          <button type="button" onClick={() => setDishToDelete(row)} className="text-error font-label-sm text-label-sm uppercase">
            Delete
          </button>
        </div>
      ),
    },
  ]

  return (
    <div className="flex flex-col gap-space-lg">
      <div className="flex items-center justify-between">
        <h1 className="font-headline-lg text-headline-lg text-on-surface uppercase tracking-tight">Dishes</h1>
        <Button onClick={openCreateModal}>+ Add Dish</Button>
      </div>

      <DataTable columns={columns} rows={dishes} getRowKey={(row) => row.id} />

      <Modal isOpen={isModalOpen} title={editingDish ? 'Edit Dish' : 'New Dish'} onClose={() => setModalOpen(false)}>
        <form className="flex flex-col gap-space-md" onSubmit={handleSubmit}>
          <FormField label="Name" htmlFor="dish-name">
            <input
              id="dish-name"
              type="text"
              value={form.name}
              onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
              className="w-full bg-surface-container text-on-surface px-space-sm py-2 rounded"
              required
            />
          </FormField>
          <FormField label="Description" htmlFor="dish-description">
            <textarea
              id="dish-description"
              value={form.description}
              onChange={(event) => setForm((prev) => ({ ...prev, description: event.target.value }))}
              rows={3}
              className="w-full bg-surface-container text-on-surface px-space-sm py-2 rounded"
            />
          </FormField>
          <div className="grid grid-cols-2 gap-space-md">
            <FormField label="Price ($)" htmlFor="dish-price">
              <input
                id="dish-price"
                type="number"
                step="0.01"
                min="0"
                value={form.price}
                onChange={(event) => setForm((prev) => ({ ...prev, price: event.target.value }))}
                className="w-full bg-surface-container text-on-surface px-space-sm py-2 rounded"
                required
              />
            </FormField>
            <FormField label="Section" htmlFor="dish-section">
              <select
                id="dish-section"
                value={form.sectionId}
                onChange={(event) => setForm((prev) => ({ ...prev, sectionId: event.target.value }))}
                className="w-full bg-surface-container text-on-surface px-space-sm py-2 rounded"
                required
              >
                {sections.map((section) => (
                  <option key={section.id} value={section.id}>
                    {section.name}
                  </option>
                ))}
              </select>
            </FormField>
          </div>
          <FormField label="Allergens (comma-separated)" htmlFor="dish-allergens">
            <input
              id="dish-allergens"
              type="text"
              value={form.allergens}
              onChange={(event) => setForm((prev) => ({ ...prev, allergens: event.target.value }))}
              placeholder="gluten, dairy"
              className="w-full bg-surface-container text-on-surface px-space-sm py-2 rounded"
            />
          </FormField>
          <FormField label="Image URL" htmlFor="dish-image-url">
            <input
              id="dish-image-url"
              type="url"
              value={form.imageUrl}
              onChange={(event) => setForm((prev) => ({ ...prev, imageUrl: event.target.value }))}
              placeholder="https://example.com/dish-photo.jpg"
              className="w-full bg-surface-container text-on-surface px-space-sm py-2 rounded"
            />
            {form.imageUrl ? (
              <img
                src={form.imageUrl}
                alt="Preview"
                className="mt-space-xs w-full h-40 object-cover rounded bg-surface-container-high"
              />
            ) : null}
          </FormField>
          <div className="flex justify-end gap-space-sm pt-space-sm">
            <Button variant="ghost" type="button" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">{editingDish ? 'Save Changes' : 'Create Dish'}</Button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        isOpen={Boolean(dishToDelete)}
        title="Delete Dish?"
        message="This will permanently remove the dish from the menu."
        confirmLabel="Delete"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDishToDelete(null)}
      />
    </div>
  )
}

export default AdminDishesPage
