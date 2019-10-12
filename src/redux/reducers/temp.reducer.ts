import {
  API_SONARR_GET_EPISODES_SUCCESS,
  API_SONARR_GET_PATHS_SUCCESS,
  API_SONARR_GET_PROFILES_SUCCESS,
  API_SONARR_GET_SEARCH_SUCCESS,
  CLEAR_EPISODES,
  CLEAR_SEARCH_SERIES,
  NETWORK_CHANGE,
  SERVER_MODIFY_COMPLETE,
  SERVER_SET_ENABLED,
  SIDEBAR_TOGGLE
} from '@actions/types'
import { IRawSeries } from '@interfaces/common.interface'
import { IEpisode } from '@interfaces/episode.interface'
import { IPath } from '@interfaces/path.interface'
import { IProfile } from '@interfaces/profile.interface'
import { NetInfoStateType } from '@react-native-community/netinfo'
import { ServerEnum } from '@utils/enums.util'
import { TActions } from '@utils/types.util'
import { createReducer } from 'typesafe-actions'

type State = {
  episodes: { [key: string]: IEpisode[] }
  search: IRawSeries<{ coverType: string; url: string }>[]
  sidebarToggle: { watch: number; toggle: boolean }
  network: NetInfoStateType
  profiles: IProfile[]
  paths: IPath[]
  enabledServers: ServerEnum[]
}
const DEFAULT_STATE: State = {
  episodes: {},
  search: [],
  sidebarToggle: {
    watch: 0,
    toggle: false
  },
  profiles: [],
  paths: [],
  network: NetInfoStateType.cellular,
  enabledServers: []
}

export const tempReducer = createReducer<typeof DEFAULT_STATE, TActions>(
  DEFAULT_STATE
)
  // reset when calling episodes again
  .handleAction(CLEAR_EPISODES, state => ({ ...state, episodes: {} }))
  .handleAction(CLEAR_SEARCH_SERIES, state => ({ ...state, search: [] }))
  .handleAction(API_SONARR_GET_EPISODES_SUCCESS, (state, action) => ({
    ...state,
    episodes: { ...action.payload }
  }))
  .handleAction(SIDEBAR_TOGGLE, (state, action) => ({
    ...state,
    sidebarToggle: {
      watch: state.sidebarToggle.watch + 1,
      toggle: action.payload
    }
  }))
  .handleAction(API_SONARR_GET_SEARCH_SUCCESS, (state, action) => ({
    ...state,
    search: [...action.payload]
  }))
  .handleAction(NETWORK_CHANGE, (state, action) => ({
    ...state,
    network: action.payload
  }))
  // will be used at some point when I add delete server
  .handleAction(SERVER_SET_ENABLED, (state, action) => {
    const { which, enabled } = action.payload
    const i = state.enabledServers.findIndex(s => s === which)
    let copy = [...state.enabledServers]
    enabled ? copy.push(which) : copy.splice(i, 1)
    return { ...state, enabledServers: copy }
  })
  .handleAction(SERVER_MODIFY_COMPLETE, (state, action) => {
    const { serverKey } = action.payload
    const i = state.enabledServers.findIndex(s => s === serverKey) > -1
    if (i) {
      return state
    }
    return { ...state, enabledServers: [...state.enabledServers, serverKey] }
  })
  .handleAction(API_SONARR_GET_PATHS_SUCCESS, (state, { payload }) => ({
    ...state,
    paths: [...payload]
  }))
  .handleAction(API_SONARR_GET_PROFILES_SUCCESS, (state, { payload }) => ({
    ...state,
    profiles: [...payload]
  }))
