import { createId } from './ids.js'

const STORAGE_KEY = 'dailywork:v1'
const SCHEMA_VERSION = 1

const STATUS_COLUMNS = [
  { name: 'To Do', statusKey: 'todo' },
  { name: 'In Progress', statusKey: 'in-progress' },
  { name: 'Review', statusKey: 'review' },
  { name: 'Done', statusKey: 'done' },
]

function createSeedState() {
  const now = new Date().toISOString()
  const projectId = createId('proj')

  return {
    schemaVersion: SCHEMA_VERSION,
    activeProjectId: projectId,
    projects: [
      {
        id: projectId,
        name: 'Marketing Site',
        createdAt: now,
        columns: STATUS_COLUMNS.map((column, index) => ({
          id: createId('col'),
          name: column.name,
          statusKey: column.statusKey,
          order: index,
          tasks: [],
        })),
      },
    ],
  }
}

export function loadBoardState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      return createSeedState()
    }

    const parsed = JSON.parse(raw)
    if (parsed?.schemaVersion !== SCHEMA_VERSION) {
      return createSeedState()
    }

    return parsed
  } catch {
    return createSeedState()
  }
}

export function saveBoardState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    // localStorage may be unavailable (private mode, quota exceeded, etc).
    // The app keeps working in-memory for the current session.
  }
}

export { STATUS_COLUMNS }
