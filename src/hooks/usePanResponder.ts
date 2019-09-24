import {
  PanResponder,
  Animated,
  Dimensions,
  PanResponderInstance,
  Keyboard
} from 'react-native'
import { useState, useMemo, useCallback, useEffect } from 'react'
import { useASelector, useShallowSelector } from '@utils/recipes.util'
import { logger } from '@utils/logger.util'

const SCREEN_WIDTH = Dimensions.get('window').width
// Sidebar size
const OFFSET = (SCREEN_WIDTH * 10) / 100
const DRAWER_WIDTH = (SCREEN_WIDTH * 75) / 100 + OFFSET
const HIDDEN_WIDTH = DRAWER_WIDTH - OFFSET

type usePanResponderFn = (
  position: Animated.Value
) => [PanResponderInstance, string]
export const usePanResponder: usePanResponderFn = position => {
  const { watch, toggle } = useShallowSelector(
    state => state.temp.sidebarToggle
  )
  const themeTitle = useASelector(state => state.theme.title)
  const [isOpen, setIsOpen] = useState(false)
  const panResponder = useMemo(
    () =>
      PanResponder.create({
        /**
         * only moves when dx is far greater than dy
         */
        onMoveShouldSetPanResponderCapture: (e, { dx, dy }) =>
          // makes sure you are moving horizontally significantly
          Math.abs(dx) > Math.abs(dy * 2),
        onPanResponderMove: (event, { dx }) => {
          const { _offset } = position as any
          // position the element has moved when finger released
          if (DRAWER_WIDTH - OFFSET - _offset > dx && dx > OFFSET - _offset) {
            // console.info (dx);
            position.setValue(dx)
          }
        },
        onPanResponderGrant: () => {
          Keyboard.dismiss()
          position.extractOffset()
        },
        onPanResponderRelease: (e, { dx, vx }) => {
          const { _value } = position as any
          // prevents resetting when position isnt moving
          if (_value > 0 || _value < 0) {
            position.flattenOffset()
            lock(dx > 0, vx)
          }
        }
      }),
    []
  )

  type Lock = (open: boolean, velocity?: number) => void
  const lock: Lock = useCallback((open, velocity = 0) => {
    const value = open ? HIDDEN_WIDTH : OFFSET
    Animated.spring(position, {
      toValue: value,
      velocity,
      overshootClamping: true,
      useNativeDriver: true
    }).start(() => {
      setIsOpen(open)
      // reset offset when animation finishes
      position.setOffset(value)
      position.setValue(0)
    })
  }, [])

  useEffect(() => {
    // only if action is different
    if (toggle !== isOpen) {
      position.flattenOffset()
      lock(toggle)
    }
  }, [watch])
  return [panResponder, isOpen ? 'Andromeda' : themeTitle]
}
