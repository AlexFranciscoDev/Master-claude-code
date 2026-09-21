import { createId } from './ids.js'
import { STATUS_COLUMNS } from './storage.js'

function findProject(state, projectId) {
  return state.projects.find((project) => project.id === projectId)
}

function updateProject(state, projectId, updateFn) {
  return {
    ...state,
    projects: state.projects.map((project) =>
      project.id === projectId ? updateFn(project) : project,
    ),
  }
}

export function boardReducer(state, action) {
  switch (action.type) {
    case 'CREATE_PROJECT': {
      const now = new Date().toISOString()
      const projectId = createId('proj')
      const newProject = {
        id: projectId,
        name: action.name,
        createdAt: now,
        columns: STATUS_COLUMNS.map((column, index) => ({
          id: createId('col'),
          name: column.name,
          statusKey: column.statusKey,
          order: index,
          tasks: [],
        })),
      }

      return {
        ...state,
        projects: [...state.projects, newProject],
        activeProjectId: projectId,
      }
    }

    case 'SET_ACTIVE_PROJECT': {
      return { ...state, activeProjectId: action.projectId }
    }

    case 'CREATE_COLUMN': {
      return updateProject(state, action.projectId, (project) => ({
        ...project,
        columns: [
          ...project.columns,
          {
            id: createId('col'),
            name: action.name,
            statusKey: action.statusKey,
            order: project.columns.length,
            tasks: [],
          },
        ],
      }))
    }

    case 'CREATE_TASK': {
      const now = new Date().toISOString()
      return updateProject(state, action.projectId, (project) => ({
        ...project,
        columns: project.columns.map((column) =>
          column.id === action.columnId
            ? {
                ...column,
                tasks: [
                  ...column.tasks,
                  {
                    id: createId('task'),
                    title: action.title,
                    description: action.description ?? '',
                    estimatedHours: action.estimatedHours,
                    priority: action.priority ?? 'medium',
                    createdAt: now,
                    updatedAt: now,
                  },
                ],
              }
            : column,
        ),
      }))
    }

    case 'UPDATE_TASK': {
      const now = new Date().toISOString()
      return updateProject(state, action.projectId, (project) => ({
        ...project,
        columns: project.columns.map((column) =>
          column.id === action.columnId
            ? {
                ...column,
                tasks: column.tasks.map((task) =>
                  task.id === action.taskId
                    ? { ...task, ...action.updates, updatedAt: now }
                    : task,
                ),
              }
            : column,
        ),
      }))
    }

    case 'DELETE_TASK': {
      return updateProject(state, action.projectId, (project) => ({
        ...project,
        columns: project.columns.map((column) =>
          column.id === action.columnId
            ? {
                ...column,
                tasks: column.tasks.filter((task) => task.id !== action.taskId),
              }
            : column,
        ),
      }))
    }

    case 'UPDATE_COLUMN': {
      return updateProject(state, action.projectId, (project) => ({
        ...project,
        columns: project.columns.map((column) =>
          column.id === action.columnId ? { ...column, ...action.updates } : column,
        ),
      }))
    }

    case 'DELETE_COLUMN': {
      return updateProject(state, action.projectId, (project) => ({
        ...project,
        columns: project.columns.filter((column) => column.id !== action.columnId),
      }))
    }

    case 'MOVE_TASK': {
      const project = findProject(state, action.projectId)
      if (!project) return state

      const fromColumn = project.columns.find((column) => column.id === action.fromColumnId)
      const task = fromColumn?.tasks.find((item) => item.id === action.taskId)
      if (!task) return state

      const now = new Date().toISOString()
      const movedTask = { ...task, updatedAt: now }

      return updateProject(state, action.projectId, (proj) => ({
        ...proj,
        columns: proj.columns.map((column) => {
          if (column.id === action.fromColumnId && column.id === action.toColumnId) {
            const withoutTask = column.tasks.filter((item) => item.id !== action.taskId)
            const insertAt = Math.min(action.toIndex, withoutTask.length)
            return {
              ...column,
              tasks: [
                ...withoutTask.slice(0, insertAt),
                movedTask,
                ...withoutTask.slice(insertAt),
              ],
            }
          }

          if (column.id === action.fromColumnId) {
            return {
              ...column,
              tasks: column.tasks.filter((item) => item.id !== action.taskId),
            }
          }

          if (column.id === action.toColumnId) {
            const insertAt = Math.min(action.toIndex, column.tasks.length)
            return {
              ...column,
              tasks: [
                ...column.tasks.slice(0, insertAt),
                movedTask,
                ...column.tasks.slice(insertAt),
              ],
            }
          }

          return column
        }),
      }))
    }

    default:
      return state
  }
}
