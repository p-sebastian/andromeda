import { isOfType } from 'typesafe-actions'
import { TEpic } from '@utils/types.util'
import {
  API_SONARR_GET_SERIES,
  API_SONARR_GET_CALENDAR,
  API_SONARR_GET_EPISODES,
  API_SONARR_GET_HISTORY,
  API_RADARR_GET_MOVIES,
  API_SONARR_GET_SEARCH
} from '@actions/types'
import { mergeMap, filter, map, tap, catchError } from 'rxjs/operators'
import { concat, of } from 'rxjs'
import { withApi, onCase } from '@utils/api.util'
import { logger } from '@utils/logger.util'
import { do_api_ajax_fail, do_spinner_toggle } from '@actions/general.actions'
import { ApiSuccessActionsType } from '@actions/index'
import {
  on_api_sonarr_get_series_success,
  on_api_sonarr_get_calendar_success,
  on_api_sonarr_get_episodes_success,
  on_api_sonarr_get_history_success,
  on_api_radarr_get_movies_success,
  on_api_sonarr_get_search_success
} from '@actions/api.success.actions'

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
    tap(action => logger.info('action', action)),
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
    mergeMap(action =>
      concat(
        ...[
          of(action),
          of(do_spinner_toggle((action as ApiSuccessActionsType).meta, false))
        ]
      )
    )
  )
// const apiPostEpic: TEpic
// const apiPutEpic: TEpic
// const apiDeleteEpic: TEpic

// const responseEpic: TEpic
// @note make responseEpic call helper functions to organize state before sending to reducer
// since its called by all requests it should be generalized, but function calls spetialized

export const API_EPICS = [spinnerStartEpic, apiGetEpic]
