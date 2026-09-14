import { useCallback, useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export const useAdminReservations = () => {
  const [reservations, setReservations] = useState([])
  const [loading, setLoading] = useState(true)

  const load = useCallback(async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('reservations')
      .select('id, reservation_date, start_time, end_time, party_size, status, notes, table_id, user_id, restaurant_tables(table_number, zone)')
      .order('reservation_date', { ascending: false })
      .order('start_time', { ascending: false })

    if (!error) setReservations(data)
    setLoading(false)
  }, [])

  useEffect(() => {
    load()
  }, [load])

  const updateReservation = useCallback(
    async (id, changes) => {
      const { error } = await supabase.from('reservations').update(changes).eq('id', id)
      if (!error) await load()
      return { error: error ? 'Unable to update this reservation.' : null }
    },
    [load],
  )

  const cancelReservation = useCallback((id) => updateReservation(id, { status: 'cancelled' }), [updateReservation])

  return { reservations, loading, updateReservation, cancelReservation, reload: load }
}

export const useAdminMenuSections = () => {
  const [sections, setSections] = useState([])
  const [loading, setLoading] = useState(true)

  const load = useCallback(async () => {
    setLoading(true)
    const { data, error } = await supabase.from('menu_sections').select('*').order('display_order')
    if (!error) setSections(data)
    setLoading(false)
  }, [])

  useEffect(() => {
    load()
  }, [load])

  const createSection = useCallback(
    async ({ name, displayOrder }) => {
      const { error } = await supabase.from('menu_sections').insert({ name, display_order: displayOrder })
      if (!error) await load()
      return { error: error ? 'Unable to create section.' : null }
    },
    [load],
  )

  const updateSection = useCallback(
    async (id, changes) => {
      const { error } = await supabase.from('menu_sections').update(changes).eq('id', id)
      if (!error) await load()
      return { error: error ? 'Unable to update section.' : null }
    },
    [load],
  )

  const deleteSection = useCallback(
    async (id) => {
      const { error } = await supabase.from('menu_sections').delete().eq('id', id)
      if (!error) await load()
      return { error: error ? 'Unable to delete section. Make sure it has no dishes assigned.' : null }
    },
    [load],
  )

  return { sections, loading, createSection, updateSection, deleteSection, reload: load }
}

export const useAdminDishes = () => {
  const [dishes, setDishes] = useState([])
  const [loading, setLoading] = useState(true)

  const load = useCallback(async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('dishes')
      .select('*, menu_sections(name)')
      .order('display_order')

    if (!error) setDishes(data)
    setLoading(false)
  }, [])

  useEffect(() => {
    load()
  }, [load])

  const createDish = useCallback(
    async (dish) => {
      const { error } = await supabase.from('dishes').insert(dish)
      if (!error) await load()
      return { error: error ? 'Unable to create dish.' : null }
    },
    [load],
  )

  const updateDish = useCallback(
    async (id, changes) => {
      const { error } = await supabase.from('dishes').update(changes).eq('id', id)
      if (!error) await load()
      return { error: error ? 'Unable to update dish.' : null }
    },
    [load],
  )

  const deleteDish = useCallback(
    async (id) => {
      const { error } = await supabase.from('dishes').delete().eq('id', id)
      if (!error) await load()
      return { error: error ? 'Unable to delete dish.' : null }
    },
    [load],
  )

  return { dishes, loading, createDish, updateDish, deleteDish, reload: load }
}
