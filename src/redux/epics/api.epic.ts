import { isOfType } from 'typesafe-actions'
import { TEpic, TActions } from '@utils/types.util'
import { impactAsync, ImpactFeedbackStyle } from 'expo-haptics'
import {
  API_SONARR_GET_SERIES,
  API_SONARR_GET_CALENDAR,
  API_SONARR_GET_EPISODES,
  API_SONARR_GET_HISTORY,
  API_RADARR_GET_MOVIES,
  API_SONARR_GET_SEARCH,
  API_AJAX_FAIL
} from '@actions/types'
import {
  mergeMap,
  filter,
  map,
  tap,
  catchError,
  concatMap,
  withLatestFrom
} from 'rxjs/operators'
import { of } from 'rxjs'
import { withApi, onCase } from '@utils/api.util'
import { logger } from '@utils/logger.util'
import {
  do_api_ajax_fail,
  do_spinner_toggle,
  do_spinner_clear,
  do_toast_show,
  do_network_endpoint_toggle
} from '@actions/general.actions'
import { ApiSuccessActionsType } from '@actions/index'
import {
  on_api_sonarr_get_series_success,
  on_api_sonarr_get_calendar_success,
  on_api_sonarr_get_episodes_success,
  on_api_sonarr_get_history_success,
  on_api_radarr_get_movies_success,
  on_api_sonarr_get_search_success
} from '@actions/api.success.actions'
import { NetInfoStateType } from '@react-native-community/netinfo'
import { do_server_set_status } from '@src/redux/actions/server.actions'

const spinnerStartEpic: TEpic = action$ =>
  action$.pipe(
    filter(
      isOfType([
        API_SONARR_GET_SERIES,
        API_SONARR_GET_CALENDAR,
        API_SONARR_GET_EPISODES,
        API_SONARR_GET_HISTORY,
        API_RADARR_GET_MOVIES,
        API_SONARR_GET_SEARCH
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
        API_SONARR_GET_SEARCH
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
    concatMap(action => {
      return of(
        isOfType(API_AJAX_FAIL, action)
          ? do_spinner_clear()
          : do_spinner_toggle((action as ApiSuccessActionsType).meta, false),
        action
      )
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
      let actions: TActions[] = []
      const serverKey = action.meta.serverKey
      const endpoint = state.server[serverKey].endpoint
      const status = error.status
      const network = state.temp.network
      // Authentication Error
      if (!isNaN(status) && (status >= 400 && status < 499)) {
        actions.push(do_toast_show('Authentication Error', 'error'))
      } else {
        // server error, or timeout
        // net === none -> err not connected
        if (network === NetInfoStateType.none) {
          actions.push(do_toast_show('Not connected to a network', 'error'))
        }
        // net !== none & lan -> retry remote
        if (network !== NetInfoStateType.none && endpoint === 'lan') {
          actions = actions.concat([
            do_network_endpoint_toggle(serverKey, 'remote'),
            action
          ])
        }
        // net !== none & remote -> offline
        if (network !== NetInfoStateType.none && endpoint === 'remote') {
          actions = actions.concat([
            do_server_set_status(serverKey, 'offline'),
            do_toast_show('Server Offline', 'error')
          ])
        }
      }
      return actions
    })
  )
// const responseEpic: TEpic
// @note make responseEpic call helper functions to organize state before sending to reducer
// since its called by all requests it should be generalized, but function calls spetialized

export const API_EPICS = [spinnerStartEpic, apiGetEpic, apiErrorEpic]
