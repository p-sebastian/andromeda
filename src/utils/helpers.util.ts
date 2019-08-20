import { ServerNames } from './types.util'
import { ScreenNames } from 'app.routes'
import { AVAILABLE_SERVERS } from './constants.util'

/**
 * checks if navigation screen is within the screens of the current server
 * to maintain the check in the sidebar
 */
export const withinScreen = (
  serverName: ServerNames,
  screenName: ScreenNames
) =>
  serverName === screenName ||
  AVAILABLE_SERVERS.find(s => s.title === serverName)!.tabs.findIndex(
    t => t === screenName
  ) >= 0
