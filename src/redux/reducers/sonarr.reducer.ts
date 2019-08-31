import { createReducer } from 'typesafe-actions'
import { TActions } from '@utils/types.util'
import {
  API_SONARR_GET_SERIES_SUCCESS,
  API_SONARR_GET_CALENDAR_SUCCESS
} from '@actions/types'
import { TSeries } from '@interfaces/series.interface'
import { TCalendar } from '@interfaces/calendar.interface'
import { TImage } from '@interfaces/common.interface'

type State = {
  entities: { series: TSeries; calendar: TCalendar; images: TImage }
  result: {
    series: number[]
    calendar: number[]
  }
}
const DEFAULT_STATE: State = {
  entities: {
    series: {},
    calendar: {},
    images: {}
  },
  result: {
    series: [],
    calendar: []
  }
}

export const sonarrReducer = createReducer<typeof DEFAULT_STATE, TActions>(
  DEFAULT_STATE
)
  .handleAction(API_SONARR_GET_SERIES_SUCCESS, (state, action) => {
    const { result, entities } = action.payload
    return {
      entities: {
        ...state.entities,
        series: { ...entities['series'] },
        images: { ...entities['images'] }
      },
      result: { ...state.result, series: [...result] }
    }
  })
  .handleAction(API_SONARR_GET_CALENDAR_SUCCESS, (state, action) => {
    const { entities, result } = action.payload
    return {
      entities: {
        ...state.entities,
        calendar: { ...entities['calendar'] }
      },
      result: { ...state.result, calendar: [...result] }
    }
  })
