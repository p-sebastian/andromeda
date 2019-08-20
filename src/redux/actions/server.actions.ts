import { action } from 'typesafe-actions'
import { SERVER_ENABLED, SERVER_SET_ENABLED, SERVER_SET_STATUS } from './types'
import { ThemeEnum } from '@utils/enums.util'
import { ServerStatus } from '@utils/types.util'

export const server_enabled = () => action(SERVER_ENABLED)
export const server_set_enabled = (which: ThemeEnum, toggle: boolean) =>
  action(SERVER_SET_ENABLED, { which, toggle })
export const server_set_status = (which: ThemeEnum, status: ServerStatus) =>
  action(SERVER_SET_STATUS, { which, status })
