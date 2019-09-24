import { ScreenNames } from '@routes'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '@utils/dimensions.util'
import { TServer } from '@utils/types.util'
import Fuse from 'fuse.js'
import { memoize } from 'lodash'
import { Platform } from 'react-native'

import { AVAILABLE_SERVERS } from './constants.util'

const _withinScreen = (screenName: ScreenNames) => {
  let _server = null
  Object.values(AVAILABLE_SERVERS).forEach(server => {
    if (
      server.title === screenName ||
      server.tabs.findIndex(n => n === screenName) > -1
    ) {
      _server = { ...server }
    }
  })
  return _server as TServer | null
}
export const withinScreen = memoize(_withinScreen)

export const byteToGB = (size: number = 0) => {
  const gb = 1073741824
  return (size / gb).toFixed(1)
}

const fuseOptions = {
  keys: ['title'],
  id: 'id'
}
export const fuzzySearch = (data: {}, id: string) =>
  new Fuse(Object.values(data), { ...fuseOptions, id })

export const isIphoneX = () =>
  (Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    (SCREEN_HEIGHT === 812 || SCREEN_WIDTH === 812)) ||
  (SCREEN_HEIGHT === 896 || SCREEN_WIDTH === 896)
