import { useCallback, useMemo } from 'react'
import { Animated, PanResponder } from 'react-native'

export const makePan = (container: number, draggable: number) => (
  position: Animated.Value
) => {
  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onMoveShouldSetPanResponderCapture: (e, { dx, dy }) =>
          Math.abs(dy) > Math.abs(dx * 2),
        onPanResponderMove: (e, { dy, moveY }) => {
          // _offset is the pixel value from the bottom of the screen
          // to the top of the element
          const { _offset } = position as any
          if (container - draggable - _offset > dy && dy > -_offset) {
            position.setValue(dy)
          }
        },
        onPanResponderGrant: () => {
          position.extractOffset()
        },
        onPanResponderRelease: (e, { dy, vy }) => {
          const { _value } = position as any
          // prevents resetting when position isnt moving
          if (_value !== 0) {
            position.flattenOffset()
            lock(dy < 0, vy)
          }
        }
      }),
    []
  )
  const lock = useCallback((_open: boolean, velocity = 0) => {
    // 0 is opened value, because element starts there in the container (I think)
    const value = _open ? 0 : container - draggable
    Animated.spring(position, {
      toValue: value,
      velocity,
      overshootClamping: true,
      useNativeDriver: true
    }).start(() => {
      // reset offset when animation finishes
      position.setOffset(value)
      position.setValue(0)
    })
  }, [])

  return panResponder
}
