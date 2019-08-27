import { isOfType, isActionOf } from 'typesafe-actions'
import { TEpic, TActions } from '@utils/types.util'
import { SERVER_MODIFY, API_SONARR_GET_SERIES } from '@actions/types'
import { mergeMap, filter, map, mapTo, catchError } from 'rxjs/operators'
import { concat, of, Observable } from 'rxjs'
import { do_navigate_back } from '@actions/navigation.actions'
import { ServerEnum } from '@utils/enums.util'
import { TServerConfig } from '@reducers/server.reducer'
import {
  do_server_modify_complete,
  do_server_enabled
} from '@actions/server.actions'
import { withApi, onCase } from '@utils/api.util'
import { logger } from '@utils/logger.util'
import { do_api_ajax_fail } from '@actions/general.actions'
import { ApiActionsType, ApiSuccessActionsType } from '@actions/index'
import { AjaxResponse } from 'rxjs/ajax'
import { on_api_sonarr_get_series_success } from '@actions/api.success.actions'

const apiGetEpic: TEpic = (action$, state$) =>
  action$.pipe(
    filter(isOfType([API_SONARR_GET_SERIES])),
    withApi(state$, 'GET'),
    mergeMap(ajax =>
      ajax
        /**
         * Switch cases
         * (TYPE_CONSTANT) => (ajax_response => successAction)
         */
        .pipe(
          onCase(API_SONARR_GET_SERIES)(response =>
            on_api_sonarr_get_series_success(response)
          ),
          /**
           * Maps successAction to stream
           */
          map(([, success]) => success as TActions)
        )
        .pipe(
          catchError(error => {
            logger.error(error)
            return of(do_api_ajax_fail(error))
          })
        )
    )
  )
// const apiPostEpic: TEpic
// const apiPutEpic: TEpic
// const apiDeleteEpic: TEpic

// const responseEpic: TEpic
// @note make responseEpic call helper functions to organize state before sending to reducer
// since its called by all requests it should be generalized, but function calls spetialized

export const API_EPICS = [apiGetEpic]
