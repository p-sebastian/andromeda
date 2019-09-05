import { ScreenNames } from 'app.routes'
import { AVAILABLE_SERVERS } from './constants.util'
import { ServerEnum } from './enums.util'

/**
 * checks if navigation screen is within the screens of the current server
 * to maintain the check in the sidebar
 */
export const withinScreen = (
  serverKey: ServerEnum,
  screenName: ScreenNames
) => {
  const server = AVAILABLE_SERVERS[serverKey]
  return (
    server.title === screenName ||
    server.tabs.findIndex(name => name === screenName) > -1
  )
}

export const byteToGB = (size: number = 0) => {
  const gb = 1073741824
  return (size / gb).toFixed(1)
}
