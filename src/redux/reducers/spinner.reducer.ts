import { createReducer } from 'typesafe-actions'
import { TActions } from '@utils/types.util'
import { SPINNER_TOGGLE } from '@actions/types'

const DEFAULT_STATE = {
  loading: false
}
export const spinnerReducer = createReducer<typeof DEFAULT_STATE, TActions>(
  DEFAULT_STATE
).handleAction(SPINNER_TOGGLE, (state, action) => ({
  ...state,
  loading: action.payload
}))
