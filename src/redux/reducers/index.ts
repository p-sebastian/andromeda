import { combineReducers } from 'redux'
import { StateType } from 'typesafe-actions'
import { themeReducer } from './theme.reducer'
import { navigationReducer } from './navigation.reducer'

export const rootReducer = combineReducers({
  navigation: navigationReducer,
  theme: themeReducer
})

export type RootState = StateType<typeof rootReducer>
export type ThemeState = StateType<typeof themeReducer>
export type NavigationState = StateType<typeof navigationReducer>
