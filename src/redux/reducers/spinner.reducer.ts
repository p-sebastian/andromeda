import { SPINNER_CLEAR, SPINNER_TOGGLE } from '@actions/types'
import { TActions } from '@utils/types.util'
import { omit } from 'lodash'
import { createReducer } from 'typesafe-actions'

const DEFAULT_STATE: { [key: string]: boolean; loading: boolean } = {
  // for Activity Spinner
  loading: false
}
export const spinnerReducer = createReducer<typeof DEFAULT_STATE, TActions>(
  DEFAULT_STATE
)
  .handleAction(SPINNER_TOGGLE, (state, { payload }) => {
    // remove from state but after loading
    const remove =
      !payload.toggle && [/^\/series\/[0-9]+$/].some(v => v.test(payload.isOf))
    const _state = remove
      ? (omit(state, [payload.isOf]) as typeof DEFAULT_STATE)
      : { ...state, [payload.isOf]: payload.toggle }
    _state.loading = Object.keys(_state).some(k =>
      k === 'loading' ? false : _state[k]
    )
    return _state
  })
  .handleAction(SPINNER_CLEAR, state => {
    const obj: typeof DEFAULT_STATE = { loading: false }
    Object.keys(state).forEach(k => (obj[k] = false))
    return obj
  })
