import { createReducer } from 'typesafe-actions'
import { TActions } from '@utils/types.util'
import { IEpisode } from '@interfaces/episode.interface'
import {
  API_SONARR_GET_EPISODES_SUCCESS,
  CLEAR_EPISODES,
  SIDEBAR_TOGGLE
} from '@actions/types'

type State = {
  episodes: { [key: string]: IEpisode[] }
  sidebarToggle: { watch: number; toggle: boolean }
}
const DEFAULT_STATE: State = {
  episodes: {},
  sidebarToggle: {
    watch: 0,
    toggle: false
  }
}

export const tempReducer = createReducer<typeof DEFAULT_STATE, TActions>(
  DEFAULT_STATE
)
  // reset when calling episodes again
  .handleAction(CLEAR_EPISODES, state => ({ ...state, episodes: {} }))
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
