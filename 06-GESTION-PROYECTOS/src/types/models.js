/**
 * @typedef {'todo' | 'in-progress' | 'review' | 'done'} StatusKey
 */

/**
 * @typedef {'low' | 'medium' | 'high'} Priority
 */

/**
 * @typedef {object} Task
 * @property {string} id
 * @property {string} title
 * @property {string} description
 * @property {number} estimatedHours
 * @property {Priority} priority
 * @property {string} createdAt - ISO date string
 * @property {string} updatedAt - ISO date string
 */

/**
 * @typedef {object} Column
 * @property {string} id
 * @property {string} name
 * @property {StatusKey} statusKey
 * @property {number} order
 * @property {Task[]} tasks
 */

/**
 * @typedef {object} Project
 * @property {string} id
 * @property {string} name
 * @property {string} createdAt - ISO date string
 * @property {Column[]} columns
 */

/**
 * @typedef {object} BoardState
 * @property {number} schemaVersion
 * @property {Project[]} projects
 * @property {string | null} activeProjectId
 */

export {}
