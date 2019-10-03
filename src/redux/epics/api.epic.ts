import {
  on_api_radarr_get_movies_success,
  on_api_sonarr_get_calendar_success,
  on_api_sonarr_get_episodes_success,
  on_api_sonarr_get_history_success,
  on_api_sonarr_get_paths_success,
  on_api_sonarr_get_profiles_success,
  on_api_sonarr_get_search_success,
  on_api_sonarr_get_series_success
} from '@actions/api.success.actions'
import {
  do_api_ajax_fail,
  do_network_endpoint_toggle,
  do_spinner_clear,
  do_spinner_toggle,
  do_toast_show
} from '@actions/general.actions'
import { ApiSuccessActionsType } from '@actions/index'
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
  API_SONARR_GET_SERIES
} from '@actions/types'
import { NetInfoStateType } from '@react-native-community/netinfo'
import { onCase, withApi } from '@utils/api.util'
import { logger } from '@utils/logger.util'
import { TActions, TEpic } from '@utils/types.util'
import { ImpactFeedbackStyle, impactAsync } from 'expo-haptics'
import { of } from 'rxjs'
import {
  catchError,
  concatMap,
  filter,
  map,
  mergeMap,
  tap,
  withLatestFrom
} from 'rxjs/operators'
import { isOfType } from 'typesafe-actions'

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
        .pipe(
          /* SONARR */
          onCase(API_SONARR_GET_SERIES)(on_api_sonarr_get_series_success),
          onCase(API_SONARR_GET_CALENDAR)(on_api_sonarr_get_calendar_success),
          onCase(API_SONARR_GET_EPISODES)(on_api_sonarr_get_episodes_success),
          onCase(API_SONARR_GET_HISTORY)(on_api_sonarr_get_history_success),
          onCase(API_SONARR_GET_SEARCH)(on_api_sonarr_get_search_success),
          onCase(API_SONARR_GET_PATHS)(on_api_sonarr_get_paths_success),
          onCase(API_SONARR_GET_PROFILES)(on_api_sonarr_get_profiles_success),
          /* RADARR */
          onCase(API_RADARR_GET_MOVIES)(on_api_radarr_get_movies_success),
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
    withLatestFrom(state$),
    concatMap(([action, state]) => {
      const actions: TActions[] = isOfType(API_AJAX_FAIL, action)
        ? [do_spinner_clear()]
        : [
            do_spinner_toggle((action as ApiSuccessActionsType).meta, false),
            do_server_set_status(state.theme.selectedServer, 'online')
          ]
      actions.push(action)
      return actions
    })
  )
// const apiPostEpic: TEpic
// const apiPutEpic: TEpic
// const apiDeleteEpic: TEpic

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

export const API_EPICS = [spinnerStartEpic, apiGetEpic, apiErrorEpic]
