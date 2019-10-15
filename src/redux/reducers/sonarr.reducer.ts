import {
  API_SONARR_GET_CALENDAR_SUCCESS,
  API_SONARR_GET_COMMAND_SUCCESS,
  API_SONARR_GET_HISTORY_SUCCESS,
  API_SONARR_GET_SERIES_SUCCESS,
  API_SONARR_PUT_SERIES_SUCCESS,
  CLEAR_COMMAND
} from '@actions/types'
import { TCalendar } from '@interfaces/calendar.interface'
import { TCommand } from '@interfaces/command.interface'
import { TImage } from '@interfaces/common.interface'
import { THistory } from '@interfaces/history.interface'
import { TSeries } from '@interfaces/series.interface'
import { TActions } from '@utils/types.util'
import { omit, uniq, without } from 'lodash'
import { createReducer } from 'typesafe-actions'

type State = {
  entities: {
    series: TSeries
    calendar: TCalendar
    images: TImage
    history: THistory
    command: TCommand
  }
  result: {
    series: number[]
    calendar: number[]
    history: number[]
    command: number[]
  }
}
const DEFAULT_STATE: State = {
  entities: {
    series: {},
    calendar: {},
    images: {},
    history: {},
    command: {}
  },
  result: {
    series: [],
    calendar: [],
    history: [],
    command: []
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
  .handleAction(API_SONARR_GET_HISTORY_SUCCESS, (state, action) => {
    const { entities, result } = action.payload
    return {
      entities: {
        ...state.entities,
        history: { ...entities['history'] }
      },
      result: { ...state.result, history: [...result] }
    }
  })
  /*
   * Adds all commands without deleting previous ones (updates instead)
   */
  .handleAction(API_SONARR_GET_COMMAND_SUCCESS, (state, { payload }) => {
    const result = uniq([...state.result.command, ...payload.result])
    return {
      entities: {
        ...state.entities,
        command: { ...state.entities.command, ...payload.entities['command'] }
      },
      result: { ...state.result, command: [...result] }
    }
  })
  .handleAction(API_SONARR_PUT_SERIES_SUCCESS, (state, action) => {
    const { tvdbId, monitored, seasons } = action.payload
    const series = state.entities.series[tvdbId]
    return {
      ...state,
      entities: {
        ...state.entities,
        series: {
          ...state.entities.series,
          [tvdbId]: { ...series, monitored, seasons: [...seasons] }
        }
      }
    }
  })
  .handleAction(CLEAR_COMMAND, (state, { payload }) => {
    const result = without(state.result.command, ...payload)
    const command = omit(state.entities.command, payload)
    return {
      entities: {
        ...state.entities,
        command
      },
      result: { ...state.result, command: result }
    }
  })
