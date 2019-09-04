import { createReducer } from 'typesafe-actions'
import { TActions } from '@utils/types.util'
import { IEpisode } from '@interfaces/episode.interface'
import {
  API_SONARR_GET_EPISODES_SUCCESS,
  API_SONARR_GET_EPISODES,
  CLEAR_EPISODES
} from '@actions/types'

type State = { episodes: { [key: string]: IEpisode[] } }
const DEFAULT_STATE: State = {
  episodes: {}
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
