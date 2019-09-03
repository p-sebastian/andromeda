import { useMemo, useCallback } from 'react'
import { PanResponder, Animated } from 'react-native'
import { SCREEN_HEIGHT } from '@utils/dimensions.util'

export const makePan = (container: number, draggable: number) => (
  position: Animated.Value
) => {
  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onMoveShouldSetPanResponderCapture: (e, { dx, dy }) =>
          Math.abs(dy) > Math.abs(dx * 2),
        onPanResponderMove: (e, { dy, moveY }) => {
          if (
            moveY < SCREEN_HEIGHT - draggable &&
            moveY > container + draggable
          ) {
            position.setValue(dy)
          }
        },
        onPanResponderGrant: () => {
          position.extractOffset()
        },
        onPanResponderRelease: (e, { dy }) => {
          const { _value } = position as any
          // prevents resetting when position isnt moving
          if (_value > 0 || _value < 0) {
            position.flattenOffset()
            lock(dy < 0)
          }
        }
      }),
    []
  )
  const lock = useCallback((_open: boolean) => {
    // 0 is opened value, because element starts there in the container (I think)
    const value = _open ? 0 : container - draggable
    Animated.timing(position, {
      toValue: value,
      duration: 400,
      useNativeDriver: true
    }).start(() => {
      // reset offset when animation finishes
      position.setOffset(value)
      position.setValue(0)
    })
  }, [])

  return panResponder
}
