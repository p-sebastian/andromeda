import { createReducer } from 'typesafe-actions'
import { TActions } from '@utils/types.util'
import {
  API_SONARR_GET_SERIES_SUCCESS,
  API_SONARR_GET_CALENDAR_SUCCESS
} from '@actions/types'
import { ISeries } from '@interfaces/series.interface'
import { ICalendar } from '@interfaces/calendar.interface'

type State = { series: ISeries; calendar: ICalendar }
const DEFAULT_STATE: State = {
  series: {
    entities: {
      series: {}
    },
    result: []
  },
  calendar: {
    entities: {
      calendar: {}
    },
    result: []
  }
}

export const sonarrReducer = createReducer<typeof DEFAULT_STATE, TActions>(
  DEFAULT_STATE
)
  .handleAction(API_SONARR_GET_SERIES_SUCCESS, (state, action) => ({
    ...state,
    series: action.payload
  }))
  .handleAction(API_SONARR_GET_CALENDAR_SUCCESS, (state, action) => ({
    ...state,
    calendar: action.payload
  }))
