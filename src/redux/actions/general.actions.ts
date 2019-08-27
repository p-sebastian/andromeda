import { createAction } from 'typesafe-actions'
import { API_AJAX_FAIL } from './types'

export const do_api_ajax_fail = createAction(
  API_AJAX_FAIL,
  action => (error: any) => action(error)
)
