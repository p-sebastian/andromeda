import { createReducer } from 'typesafe-actions'
import { TActions } from '@utils/types.util'
import { API_SONARR_GET_SERIES_SUCCESS } from '@actions/types'
import { ISeries } from '@interfaces/series.interface'

const DEFAULT_STATE = {
  series: {
    entities: null,
    result: []
  } as ISeries
}

export const sonarrReducer = createReducer<typeof DEFAULT_STATE, TActions>(
  DEFAULT_STATE
).handleAction(API_SONARR_GET_SERIES_SUCCESS, (state, action) => ({
  ...state,
  series: action.payload
}))
