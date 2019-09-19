import { createReducer } from 'typesafe-actions'
import { TActions } from '@utils/types.util'
import { IEpisode } from '@interfaces/episode.interface'
import {
  API_SONARR_GET_EPISODES_SUCCESS,
  CLEAR_EPISODES,
  SIDEBAR_TOGGLE,
  API_SONARR_GET_SEARCH_SUCCESS,
  CLEAR_SEARCH_SERIES
} from '@actions/types'
import { IRawSeries } from '@src/interfaces/common.interface'

type State = {
  episodes: { [key: string]: IEpisode[] }
  search: IRawSeries<{ coverType: string; url: string }>[]
  sidebarToggle: { watch: number; toggle: boolean }
  network: 'celular' | 'wifi'
}
const DEFAULT_STATE: State = {
  episodes: {},
  search: [],
  sidebarToggle: {
    watch: 0,
    toggle: false
  },
  network: 'celular'
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
