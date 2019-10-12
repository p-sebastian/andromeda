import {
  API_SONARR_POST_COMMAND,
  API_SONARR_POST_COMMAND_SUCCESS,
  CLEAR_COMMAND,
  COMMAND_COMPLETE
} from '@actions/types'
import { TActions } from '@utils/types.util'
import { without } from 'lodash'
import { createReducer } from 'typesafe-actions'

type State = {
  // { [seriesId]: tvdbId }
  commandSeriesIds: { [key: number]: number }
  // Manually started commands from the app
  runningCommands: number[]
  // these are dismissable
  completedCommands: number[]
}
const DEFAULT_STATE: State = {
  commandSeriesIds: {},
  runningCommands: [],
  completedCommands: []
}

export const commandReducer = createReducer<typeof DEFAULT_STATE, TActions>(
  DEFAULT_STATE
)
  .handleAction(API_SONARR_POST_COMMAND, (state, { payload }) => ({
    ...state,
    commandSeriesIds: {
      ...state.commandSeriesIds,
      [payload.params.seriesId]: payload.params.tvdbId
    }
  }))
  .handleAction(API_SONARR_POST_COMMAND_SUCCESS, (state, { payload }) => ({
    ...state,
    runningCommands: [...state.runningCommands, payload.id]
  }))
  .handleAction(COMMAND_COMPLETE, (state, { payload }) => ({
    ...state,
    runningCommands: without(state.runningCommands, ...payload),
    completedCommands: [...state.completedCommands, ...payload]
  }))
  // cleared on sonarrReducer state, cleanup here
  // these are dismissed commands, which can only be done once completed
  .handleAction(CLEAR_COMMAND, (state, { payload }) => {
    const completedCommands = without(state.completedCommands, ...payload)
    // clear if no commands showing
    const commandSeriesIds =
      !completedCommands.length && !state.runningCommands.length
        ? {}
        : state.commandSeriesIds

    return {
      ...state,
      completedCommands,
      commandSeriesIds
    }
  })
