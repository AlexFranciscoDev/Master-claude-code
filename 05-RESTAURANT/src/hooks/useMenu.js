import { useCallback, useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export const useMenu = () => {
  const [sections, setSections] = useState([])
  const [dishes, setDishes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const loadMenu = useCallback(async () => {
    setLoading(true)
    setError('')

    const [sectionsResult, dishesResult] = await Promise.all([
      supabase.from('menu_sections').select('id, name, display_order').eq('is_active', true).order('display_order'),
      supabase.from('dishes').select('id, section_id, name, description, price, allergens, image_url').eq('is_active', true).order('display_order'),
    ])

    if (sectionsResult.error || dishesResult.error) {
      setError('Unable to load the menu right now. Please try again later.')
      setLoading(false)
      return
    }

    setSections(sectionsResult.data)
    setDishes(dishesResult.data)
    setLoading(false)
  }, [])

  useEffect(() => {
    loadMenu()
  }, [loadMenu])

  return { sections, dishes, loading, error, reload: loadMenu }
}
