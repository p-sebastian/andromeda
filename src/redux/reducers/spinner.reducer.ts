import { createReducer } from 'typesafe-actions'
import { TActions } from '@utils/types.util'
import { SPINNER_TOGGLE } from '@actions/types'

const DEFAULT_STATE: { [key: string]: boolean; loading: boolean } = {
  // for Activity Spinner
  loading: false
}
export const spinnerReducer = createReducer<typeof DEFAULT_STATE, TActions>(
  DEFAULT_STATE
).handleAction(SPINNER_TOGGLE, (state, { payload }) => {
  const _state = { ...state, [payload.isOf]: payload.toggle }
  _state.loading = Object.keys(_state).some(k =>
    k === 'loading' ? false : _state[k]
  )
  return _state
})
