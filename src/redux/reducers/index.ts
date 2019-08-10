import { combineReducers } from 'redux'
import { StateType } from 'typesafe-actions'
import { themeReducer } from './theme.reducer'

export const rootReducer = combineReducers({
  theme: themeReducer
})

export type RootState = StateType<typeof rootReducer>
export type ThemeState = StateType<typeof themeReducer>
