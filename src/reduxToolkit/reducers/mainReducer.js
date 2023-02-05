import {createAction, createReducer} from '@reduxjs/toolkit'
import {patterns} from "../../utils/patterns";

const initialState = {
  lastPatterns: patterns,
  selectedGrid: null
}

export const addPattern = createAction('ADD_PATTERN')
export const addSelectedGrid = createAction('ADD_SELECTED_GRID')

export default createReducer(initialState, {
    [addPattern.type]: (state, action) => {
      state.lastPatterns.push(action.payload)
    },
  [addSelectedGrid.type]: (state, action) => {
    console.log(action.payload)
    state.selectedGrid = action.payload
  },
  }
)