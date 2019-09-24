import { createReducer } from 'typesafe-actions'
import { TActions } from '@utils/types.util'
import { IEpisode } from '@interfaces/episode.interface'
import {
  API_SONARR_GET_EPISODES_SUCCESS,
  CLEAR_EPISODES,
  SIDEBAR_TOGGLE,
  API_SONARR_GET_SEARCH_SUCCESS,
  CLEAR_SEARCH_SERIES,
  NETWORK_CHANGE,
  SERVER_SET_ENABLED,
  SERVER_MODIFY_COMPLETE
} from '@actions/types'
import { IRawSeries } from '@src/interfaces/common.interface'
import { NetInfoStateType } from '@react-native-community/netinfo'
import { ServerEnum } from '@src/utils/enums.util'

type State = {
  episodes: { [key: string]: IEpisode[] }
  search: IRawSeries<{ coverType: string; url: string }>[]
  sidebarToggle: { watch: number; toggle: boolean }
  network: NetInfoStateType
  enabledServers: ServerEnum[]
}
const DEFAULT_STATE: State = {
  episodes: {},
  search: [],
  sidebarToggle: {
    watch: 0,
    toggle: false
  },
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
