import { do_api_sonarr_get_command } from '@actions/api.actions'
import { on_api_get_command_success } from '@actions/api.success.actions'
import { do_command_complete, do_toast_show } from '@actions/general.actions'
import { ApiActionsType } from '@actions/index'
import {
  API_SONARR_GET_COMMAND,
  API_SONARR_POST_COMMAND_SUCCESS,
  COMMAND_TRIGGER_REFRESH
} from '@actions/types'
import { withApi } from '@utils/api.util'
import { nrmlz } from '@utils/normalizr.util'
import { TActions, TEpic } from '@utils/types.util'
import { without } from 'lodash'
import moment from 'moment'
import { timer } from 'rxjs'
import {
  concatMap,
  filter,
  map,
  mapTo,
  switchMap,
  takeWhile,
  tap,
  withLatestFrom
} from 'rxjs/operators'
import { isOfType } from 'typesafe-actions'

/*
 * These are set in reducers before epics
 * POST_COMMAND -> sets commandSeriesIds // this is needed for indexing the series
 * POST_COMMAND_SUCCESS -> sets runningCommands // to know which where manually started in the app
 * Server Reducer
 * GET_COMMAND_SUCCESS -> sets entity.command & result.command // all running commands
 * */
const commandPollingEpic: TEpic = (action$, state$) =>
  action$.pipe(
    filter(isOfType([API_SONARR_POST_COMMAND_SUCCESS, API_SONARR_GET_COMMAND])),
    mapTo(do_api_sonarr_get_command()),
    withApi(state$, 'GET'),
    withLatestFrom(state$),
    // cancel and start again on POST request
    switchMap(([ajax, state]) => {
      const now = moment().unix()
      const commands = state.sonarr.entities.command
      const times = Object.values(commands).map(
        c => moment(c.stateChangeTime || c.startedOn).unix() - now
      )
      const min = times.length ? Math.min(...times) : 0
      // start on next lowest stateChangeTime, then poll every 10 seconds
      return timer(min < 0 ? 0 : min, 10000).pipe(
        switchMap(() => ajax),
        map(([action, res]) =>
          on_api_get_command_success(
            nrmlz(API_SONARR_GET_COMMAND, res),
            (action as ApiActionsType).meta.isOf
          )
        ),
        withLatestFrom(state$),
        // runningCommands will always be 1 call behind this loop,
        // so takeWhile can take the last call of action.payload.result.length === 0
        // to clear the data in the reducers
        takeWhile(
          ([, _state]) =>
            _state.command.manual || _state.command.runningCommands.length > 0
        )
      )
    }),
    concatMap(([action, _state]) => {
      const actions: TActions[] = [action]
      const completed = without(
        _state.command.runningCommands,
        ...action.payload.result
      )
      const length = completed.length
      if (length) {
        actions.push(do_command_complete(completed))
        actions.push(
          do_toast_show(`#${length} Task${length > 1 ? 's' : ''} completed`)
        )
      }
      return actions
    })
  )

export const POLLING_EPICS = [commandPollingEpic]
