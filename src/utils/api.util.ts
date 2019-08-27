import { ServerEnum } from './enums.util'
import { TServerState } from '@reducers/server.reducer'
import { memoize, values } from 'lodash'
import { Observable, OperatorFunction, of, iif } from 'rxjs'
import { ajax } from 'rxjs/ajax'
import { RootState } from '@reducers/index'
import { StateObservable } from 'redux-observable'
import { withLatestFrom, map, catchError, mergeMap, tap } from 'rxjs/operators'
import { AjaxResponse } from 'rxjs/internal/observable/dom/AjaxObservable'
import { ApiActionsType, ApiSuccessActionsType } from '@actions/index'
import { do_api_ajax_fail } from '@actions/general.actions'
import { TActions } from './types.util'
import { isOfType, getType } from 'typesafe-actions'
import { API_AJAX_FAIL } from '@actions/types'

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE'
type AjaxCreator = (
  endpoint: any,
  method: Method,
  body: any
) => Observable<AjaxResponse>
/**
 * @param usable params that will be used to create the key for caching
 */
const _ajaxConfig = ({
  enabled,
  status,
  ...usable
}: TServerState): AjaxCreator => (endpoint, method, body) => {
  const memo = memoize(formUrl, (...args) => values(args).join('_'))
  const [baseURL, headers] = memo(usable as any)
  const url = `${baseURL}${endpoint}`
  return ajax({ headers, body, method, url })
}
type WithApi = (
  state$: StateObservable<RootState>,
  method: Method
) => OperatorFunction<
  ApiActionsType,
  Observable<[ApiActionsType, AjaxResponse]>
>
/**
 * returns mapped tuple [action, responseObservable]
 * all actions merging this MUST HAVE meta with ServerEnum
 * @param state$ passed when calling manually
 * @param method: {Method}
 * @arg action$ incoming input stream
 */
export const withApi: WithApi = (state$, method) => action$ =>
  action$.pipe(
    withLatestFrom(state$),
    map(([action, state]) => {
      const { endpoint, params } = action.payload
      return _ajaxConfig(state.server[action.meta])(
        endpoint,
        method,
        params
      ).pipe(
        map(response => [action, response] as [ApiActionsType, AjaxResponse])
        // catchError(error => of(do_api_ajax_fail(error)))
      )
    })
  )
/**
 * [C] type constant
 * [I] incoming action
 * [R] result of callback
 */
type OnCase<
  C = string,
  I = ApiActionsType,
  R = ApiSuccessActionsType | AjaxResponse
> = (
  CONSTANT: C
) => (
  callback: (response: AjaxResponse) => R
) => OperatorFunction<
  [I, AjaxResponse],
  [I, ApiSuccessActionsType | AjaxResponse]
>
/**
 *
 * @param CONSTANT Action constant
 */
export const onCase: OnCase = CONSTANT => callback => action$ =>
  action$.pipe(
    mergeMap(
      ([action, response]) =>
        // iif must return an Observable
        iif(
          () => isOfType(CONSTANT, action),
          of([action, callback(response)]),
          of([action, response])
        ) as Observable<[ApiActionsType, ApiSuccessActionsType | AjaxResponse]>
    ),
    tap(([a, r]) => {})
  )

type FormUrl = (
  server: TServerState,
  ssl?: boolean
) => [string, { [key: string]: string }]
/**
 * returns tuple [url, headers]
 * @param server
 * @param ssl use https
 */
const formUrl: FormUrl = (
  { key, lanPort, lanUrl, remotePort, remoteUrl, endpoint, apiKey },
  ssl = false
) => {
  const url = endpoint === 'lan' ? lanUrl : remoteUrl
  const port = endpoint === 'lan' ? lanPort : remotePort

  switch (key) {
    case ServerEnum.SONARR:
      return [
        `http${ssl ? 's' : ''}://${url}:${port}/api`,
        { 'X-Api-Key': apiKey }
      ]
    default:
      return ['', { '0': '0' }]
  }
}
