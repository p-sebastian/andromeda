import { combineReducers } from 'redux'
import { StateType } from 'typesafe-actions'
import { themeReducer } from './theme.reducer'
import { navigationReducer } from './navigation.reducer'
import { serverReducer } from './server.reducer'
import { sonarrReducer } from './sonarr.reducer'

export const rootReducer = combineReducers({
  navigation: navigationReducer,
  theme: themeReducer,
  server: serverReducer,
  sonarr: sonarrReducer
})

export type RootState = StateType<typeof rootReducer>
export type ThemeState = StateType<typeof themeReducer>
export type NavigationState = StateType<typeof navigationReducer>
export type ServerState = StateType<typeof serverReducer>
export type SonarrState = StateType<typeof sonarrReducer>
