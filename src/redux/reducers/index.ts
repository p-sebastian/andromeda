import { combineReducers } from 'redux'
import { StateType } from 'typesafe-actions'
import { themeReducer } from './theme.reducer'
import { navigationReducer } from './navigation.reducer'
import { serverReducer } from './server.reducer'
import { sonarrReducer } from './sonarr.reducer'
import { spinnerReducer } from './spinner.reducer'
import { tempReducer } from './temp.reducer'

export const rootReducer = combineReducers({
  navigation: navigationReducer,
  theme: themeReducer,
  server: serverReducer,
  sonarr: sonarrReducer,
  spinner: spinnerReducer,
  temp: tempReducer
})

export type RootState = StateType<typeof rootReducer>
export type ThemeState = StateType<typeof themeReducer>
export type NavigationState = StateType<typeof navigationReducer>
export type ServerState = StateType<typeof serverReducer>
export type SonarrState = StateType<typeof sonarrReducer>
export type SpinnerState = StateType<typeof spinnerReducer>
export type TempState = StateType<typeof tempReducer>
