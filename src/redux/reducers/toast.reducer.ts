import { createReducer } from 'typesafe-actions'
import { TActions } from '@utils/types.util'
import { TOAST_SHOW, TOAST_HIDE } from '@src/redux/actions/types'

type State = {
  msg: string
  position: 'top' | 'bottom' | 'center'
  visible: boolean
  duration: number
  type: 'error' | 'warning' | 'success' | 'info'
}
const DEFAULT_STATE: State = {
  msg: '',
  position: 'top',
  visible: false,
  duration: 5000,
  type: 'info'
}

export const toastReducer = createReducer<State, TActions>(DEFAULT_STATE)
  .handleAction(TOAST_SHOW, (state, { payload }) => ({
    visible: true,
    msg: payload.msg,
    position: payload.position,
    duration: payload.duration,
    type: payload.type
  }))
  .handleAction(TOAST_HIDE, state => ({ ...state, visible: false }))
