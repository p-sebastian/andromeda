import { do_api_sonarr_get_series } from '@actions/api.actions'
import {
  on_api_radarr_get_movies_success,
  on_api_sonarr_get_calendar_success,
  on_api_sonarr_get_episodes_success,
  on_api_sonarr_get_history_success,
  on_api_sonarr_get_paths_success,
  on_api_sonarr_get_profiles_success,
  on_api_sonarr_get_search_success,
  on_api_sonarr_get_series_success,
  on_api_sonarr_post_command_success,
  on_api_sonarr_post_series_success
} from '@actions/api.success.actions'
import {
  do_api_ajax_fail,
  do_network_endpoint_toggle,
  do_spinner_clear,
  do_spinner_toggle,
  do_toast_show
} from '@actions/general.actions'
import { ApiSuccessActionsType } from '@actions/index'
import { do_navigate } from '@actions/navigation.actions'
import { do_server_set_status } from '@actions/server.actions'
import {
  API_AJAX_FAIL,
  API_RADARR_GET_MOVIES,
  API_SONARR_GET_CALENDAR,
  API_SONARR_GET_EPISODES,
  API_SONARR_GET_HISTORY,
  API_SONARR_GET_PATHS,
  API_SONARR_GET_PROFILES,
  API_SONARR_GET_SEARCH,
  API_SONARR_GET_SERIES,
  API_SONARR_POST_COMMAND,
  API_SONARR_POST_COMMAND_SUCCESS,
  API_SONARR_POST_SERIES,
  API_SONARR_POST_SERIES_SUCCESS
} from '@actions/types'
import { NetInfoStateType } from '@react-native-community/netinfo'
import { onCase, onComplete, withApi } from '@utils/api.util'
import { logger } from '@utils/logger.util'
import { TActions, TEpic } from '@utils/types.util'
import { ImpactFeedbackStyle, impactAsync } from 'expo-haptics'
import { ofType } from 'redux-observable'
import { Observable, OperatorFunction, of } from 'rxjs'
import {
  catchError,
  concatMap,
  filter,
  map,
  mapTo,
  mergeMap,
  tap,
  withLatestFrom
} from 'rxjs/operators'
import { isOfType } from 'typesafe-actions'

/**
 * initial pipe overload only accepts
 * up to 9 fns
 */
Observable.prototype.pipeSwitch = Observable.prototype.pipe as any
declare module 'rxjs' {
  class Observable<T> {
    public pipeSwitch(
      ...operations: Array<OperatorFunction<[TActions, any], [TActions, any]>>
    ): Observable<[TActions, any]>
  }
}

const spinnerStartEpic: TEpic = action$ =>
  action$.pipe(
    filter(
      isOfType([
        API_SONARR_GET_SERIES,
        API_SONARR_GET_CALENDAR,
        API_SONARR_GET_EPISODES,
        API_SONARR_GET_HISTORY,
        API_RADARR_GET_MOVIES,
        API_SONARR_GET_SEARCH,
        API_SONARR_GET_PROFILES,
        API_SONARR_GET_PATHS
      ])
    ),
    tap(() => impactAsync(ImpactFeedbackStyle.Medium)),
    map(action => do_spinner_toggle(action.meta.isOf, true))
  )

// @todo add retry switch to remote on timeout error
const apiGetEpic: TEpic = (action$, state$) =>
  action$.pipe(
    filter(
      isOfType([
        API_SONARR_GET_SERIES,
        API_SONARR_GET_CALENDAR,
        API_SONARR_GET_EPISODES,
        API_SONARR_GET_HISTORY,
        API_RADARR_GET_MOVIES,
        API_SONARR_GET_SEARCH,
        API_SONARR_GET_PROFILES,
        API_SONARR_GET_PATHS
      ])
    ),
    withApi(state$, 'GET'),
    mergeMap(ajax =>
      ajax
        /**
         * Switch cases
         * (TYPE_CONSTANT) => (ajax_response => successAction)
         */
        .pipeSwitch(
          /* SONARR */
          onCase(API_SONARR_GET_SERIES)(on_api_sonarr_get_series_success),
          onCase(API_SONARR_GET_CALENDAR)(on_api_sonarr_get_calendar_success),
          onCase(API_SONARR_GET_EPISODES)(on_api_sonarr_get_episodes_success),
          onCase(API_SONARR_GET_HISTORY)(on_api_sonarr_get_history_success),
          onCase(API_SONARR_GET_SEARCH)(on_api_sonarr_get_search_success),
          onCase(API_SONARR_GET_PATHS)(on_api_sonarr_get_paths_success),
          onCase(API_SONARR_GET_PROFILES)(on_api_sonarr_get_profiles_success),
          /* RADARR */
          onCase(API_RADARR_GET_MOVIES)(on_api_radarr_get_movies_success)
        )
        .pipe(
          /**
           * Maps successAction to stream
           */
          map(([success]) => success as ApiSuccessActionsType),
          catchError(error => {
            logger.error(error)
            return of(do_api_ajax_fail(error))
          })
        )
    ),
    // finish loading
    onComplete(state$)
  )
const apiPostEpic: TEpic = (action$, state$) =>
  action$.pipe(
    filter(isOfType([API_SONARR_POST_SERIES, API_SONARR_POST_COMMAND])),
    withApi(state$, 'POST'),
    mergeMap(ajax =>
      ajax
        .pipeSwitch(
          /* SONARR */
          onCase(API_SONARR_POST_SERIES)(on_api_sonarr_post_series_success),
          onCase(API_SONARR_POST_COMMAND)(on_api_sonarr_post_command_success)
        )
        .pipe(
          /**
           * Maps successAction to stream
           */
          map(([success]) => success as ApiSuccessActionsType),
          catchError(error => {
            logger.error(error)
            return of(do_api_ajax_fail(error))
          })
        )
    ),
    onComplete(state$)
  )

const onPostSeriesCompleteEpic: TEpic = action$ =>
  action$.pipe(
    ofType(API_SONARR_POST_SERIES_SUCCESS),
    concatMap(() => [
      do_navigate('shows'),
      do_api_sonarr_get_series(),
      do_toast_show('Series added', 'success')
    ])
  )

const apiErrorEpic: TEpic = (action$, state$) =>
  action$.pipe(
    filter(isOfType(API_AJAX_FAIL)),
    withLatestFrom(state$),
    concatMap(([failure, state]) => {
      const { action, error } = failure.payload
      const serverKey = action.meta.serverKey
      const { endpoint, remoteUrl } = state.server[serverKey]
      const status = error.status
      const network = state.temp.network
      // Server Error
      if (!isNaN(status) && status >= 500) {
        return [do_toast_show('Server Error', 'error')]
      }
      // Authentication Error
      if (!isNaN(status) && (status >= 400 && status < 499)) {
        return [
          do_toast_show('Authentication Error', 'error'),
          do_server_set_status(serverKey, 'auth')
        ]
      }
      // timeout | unknown
      // net === none -> err not connected
      if (network === NetInfoStateType.none) {
        return [do_toast_show('Not connected to a network', 'error')]
      }
      // hasRemote & lan -> retry remote
      if (!!remoteUrl && endpoint === 'lan') {
        return [do_network_endpoint_toggle(serverKey, 'remote'), action]
      }
      // remote -> offline
      return [
        do_server_set_status(serverKey, 'offline'),
        do_toast_show('Server Offline', 'error')
      ]
    })
  )
// const responseEpic: TEpic
// @note make responseEpic call helper functions to organize state before sending to reducer
// since its called by all requests it should be generalized, but function calls spetialized

export const API_EPICS = [
  spinnerStartEpic,
  apiGetEpic,
  apiPostEpic,
  onPostSeriesCompleteEpic,
  apiErrorEpic
]
