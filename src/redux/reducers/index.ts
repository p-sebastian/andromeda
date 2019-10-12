import { commandReducer } from '@reducers/command.reducer'
import { toastReducer } from '@reducers/toast.reducer'
import { combineReducers } from 'redux'
import { StateType } from 'typesafe-actions'

import { navigationReducer } from './navigation.reducer'
import { radarrReducer } from './radarr.reducer'
import { serverReducer } from './server.reducer'
import { sonarrReducer } from './sonarr.reducer'
import { spinnerReducer } from './spinner.reducer'
import { tempReducer } from './temp.reducer'
import { themeReducer } from './theme.reducer'

export const rootReducer = combineReducers({
  navigation: navigationReducer,
  theme: themeReducer,
  server: serverReducer,
  sonarr: sonarrReducer,
  radarr: radarrReducer,
  spinner: spinnerReducer,
  temp: tempReducer,
  toast: toastReducer,
  command: commandReducer
})

export type RootState = StateType<typeof rootReducer>
export type ThemeState = StateType<typeof themeReducer>
export type NavigationState = StateType<typeof navigationReducer>
export type ServerState = StateType<typeof serverReducer>
export type SonarrState = StateType<typeof sonarrReducer>
export type RadarrState = StateType<typeof radarrReducer>
export type SpinnerState = StateType<typeof spinnerReducer>
export type TempState = StateType<typeof tempReducer>
export type CommandState = StateType<typeof commandReducer>
export type ToastState = StateType<typeof toastReducer>
