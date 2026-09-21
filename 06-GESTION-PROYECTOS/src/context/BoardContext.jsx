import { createContext, useEffect, useReducer } from 'react'
import { boardReducer } from '../lib/boardReducer.js'
import { loadBoardState, saveBoardState } from '../lib/storage.js'

export const BoardContext = createContext(null)

export function BoardProvider({ children }) {
  const [state, dispatch] = useReducer(boardReducer, undefined, loadBoardState)

  useEffect(() => {
    saveBoardState(state)
  }, [state])

  return <BoardContext.Provider value={{ state, dispatch }}>{children}</BoardContext.Provider>
}
