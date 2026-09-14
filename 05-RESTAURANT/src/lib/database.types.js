/**
 * Reference shapes for Supabase tables, generated from the SmashBros project schema
 * (mcp__supabase__generate_typescript_types). Kept as JSDoc since the project uses plain JavaScript.
 *
 * @typedef {'customer' | 'admin'} UserRole
 * @typedef {'confirmed' | 'cancelled'} ReservationStatus
 *
 * @typedef {Object} Profile
 * @property {string} id
 * @property {string} full_name
 * @property {UserRole} role
 * @property {string} created_at
 * @property {string} updated_at
 *
 * @typedef {Object} RestaurantTable
 * @property {string} id
 * @property {string} table_number
 * @property {number} capacity
 * @property {string} zone
 * @property {boolean} is_active
 * @property {string} created_at
 *
 * @typedef {Object} MenuSection
 * @property {string} id
 * @property {string} name
 * @property {number} display_order
 * @property {boolean} is_active
 * @property {string} created_at
 * @property {string} updated_at
 *
 * @typedef {Object} Dish
 * @property {string} id
 * @property {string} section_id
 * @property {string} name
 * @property {string} description
 * @property {number} price
 * @property {string|null} image_url
 * @property {string[]} allergens
 * @property {boolean} is_active
 * @property {number} display_order
 * @property {string} created_at
 * @property {string} updated_at
 *
 * @typedef {Object} Reservation
 * @property {string} id
 * @property {string} user_id
 * @property {string} table_id
 * @property {string} reservation_date
 * @property {string} start_time
 * @property {string} end_time
 * @property {number} party_size
 * @property {ReservationStatus} status
 * @property {string} notes
 * @property {string} created_at
 * @property {string} updated_at
 */

export {}
