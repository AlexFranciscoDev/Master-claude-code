import { useCallback, useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { getReservationEndTime } from '../utils/dateHelpers'
import { useAuth } from './useAuth'

export const useReservations = () => {
  const { user } = useAuth()
  const [reservations, setReservations] = useState([])
  const [loading, setLoading] = useState(true)

  const loadReservations = useCallback(async () => {
    if (!user) {
      setReservations([])
      setLoading(false)
      return
    }
    setLoading(true)
    const { data, error } = await supabase
      .from('reservations')
      .select('id, reservation_date, start_time, end_time, party_size, status, notes, table_id, restaurant_tables(table_number, zone, capacity)')
      .eq('user_id', user.id)
      .order('reservation_date', { ascending: false })
      .order('start_time', { ascending: false })

    if (!error) setReservations(data)
    setLoading(false)
  }, [user])

  useEffect(() => {
    loadReservations()
  }, [loadReservations])

  const findAvailableTable = useCallback(async ({ date, startTime, endTime, zone, partySize }) => {
    const { data: candidateTables, error: tablesError } = await supabase
      .from('restaurant_tables')
      .select('id, table_number, capacity, zone')
      .eq('zone', zone)
      .eq('is_active', true)
      .gte('capacity', partySize)
      .order('capacity', { ascending: true })

    if (tablesError || !candidateTables?.length) return null

    const { data: overlapping, error: reservationsError } = await supabase
      .from('reservations')
      .select('table_id')
      .eq('reservation_date', date)
      .eq('status', 'confirmed')
      .lt('start_time', endTime)
      .gt('end_time', startTime)

    if (reservationsError) return null

    const busyTableIds = new Set(overlapping.map((row) => row.table_id))
    return candidateTables.find((table) => !busyTableIds.has(table.id)) ?? null
  }, [])

  const createReservation = useCallback(
    async ({ date, startTime, zone, partySize, notes }) => {
      const endTime = getReservationEndTime(startTime)
      const table = await findAvailableTable({ date, startTime, endTime, zone, partySize })

      if (!table) {
        return { error: 'This time slot is no longer available, please choose another.' }
      }

      const { error } = await supabase.from('reservations').insert({
        user_id: user.id,
        table_id: table.id,
        reservation_date: date,
        start_time: startTime,
        end_time: endTime,
        party_size: partySize,
        notes,
      })

      if (error) {
        if (error.code === '23P01') {
          return { error: 'This time slot is no longer available, please choose another.' }
        }
        return { error: 'Something went wrong while creating your reservation.' }
      }

      await loadReservations()
      return { error: null }
    },
    [findAvailableTable, loadReservations, user],
  )

  const cancelReservation = useCallback(
    async (reservationId) => {
      const { error } = await supabase
        .from('reservations')
        .update({ status: 'cancelled' })
        .eq('id', reservationId)

      if (!error) await loadReservations()
      return { error: error ? 'Unable to cancel this reservation.' : null }
    },
    [loadReservations],
  )

  return { reservations, loading, createReservation, cancelReservation, reload: loadReservations }
}
