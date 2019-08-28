import { createAction } from 'typesafe-actions'
import { API_AJAX_FAIL, SPINNER_TOGGLE } from './types'

export const do_api_ajax_fail = createAction(
  API_AJAX_FAIL,
  action => (error: any) => action(error)
)

export const do_spinner_toggle = createAction(
  SPINNER_TOGGLE,
  action => (toggle: boolean) => action(toggle)
)
