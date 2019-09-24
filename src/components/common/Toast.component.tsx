import React, { useMemo, useEffect, useCallback, useRef } from 'react'
import styled from 'styled-components/native'
import {
  useShallowSelector,
  useADispatchC,
  extractCondition
} from '@utils/recipes.util'
import { SCREEN_HEIGHT } from '@utils/dimensions.util'
import { isIphoneX } from '@utils/helpers.util'
import { MARGIN, BORDER_RADIUS, BOX_SHADOW } from '@utils/position.util'
import { Animated } from 'react-native'
import { do_toast_hide } from '@actions/general.actions'
import { COLORS } from '@utils/constants.util'
import { ColorEnum } from '@utils/enums.util'
import { Ionicons } from '@expo/vector-icons'
import { ToastState } from '@reducers/index'
import AText from '@common/Text.component'

const TOAST_HEIGHT = 60

const Toast: React.FC = () => {
  const toast = useShallowSelector(state => state.toast)
  const [animated, dismiss] = useAnimate(toast)
  const { backgroundColor, icon } = _styles(toast.type)

  return (
    <Padding
      as={Animated.View}
      padding={animated.height > TOAST_HEIGHT}
      style={{ ...animated, backgroundColor } as any}
    >
      <Touchable onPress={dismiss}>
        <Container>
          <Ionicons name={icon} color="white" size={32} />
          <Text>{toast.msg}</Text>
        </Container>
      </Touchable>
    </Padding>
  )
}

const useAnimate = ({ position, visible, duration }: ToastState) => {
  const hide = useADispatchC(do_toast_hide())
  const timer = useRef<number>(0)
  let initial = 0
  let height = TOAST_HEIGHT
  if (position === 'top') {
    initial = SCREEN_HEIGHT
    height = TOAST_HEIGHT + (isIphoneX() ? 40 : 0)
  }
  if (position === 'bottom') {
    initial = -TOAST_HEIGHT
  }
  const animated = useMemo(() => new Animated.Value(initial), [position])
  const animate = () => {
    const toValue = visible ? _toValue(position) : initial
    Animated.spring(animated, {
      toValue
    }).start(() =>
      visible ? (timer.current = setTimeout(hide, duration)) : null
    )
  }
  const dismiss = useCallback(() => {
    clearTimeout(timer.current)
    hide()
  }, [timer.current])

  useEffect(() => {
    animate()
  }, [visible])

  const _style =
    position === 'center'
      ? { height, opacity: animated, top: SCREEN_HEIGHT / 2 }
      : { height, bottom: animated }

  return [_style, dismiss] as [typeof _style, typeof dismiss]
}
const _styles = (type: 'error' | 'warning' | 'info' | 'success') => {
  switch (type) {
    case 'error':
      return { backgroundColor: COLORS[ColorEnum.TORRENT], icon: 'md-alert' }
    case 'warning':
      return { backgroundColor: COLORS[ColorEnum.RADARR], icon: 'md-warning' }
    case 'success':
      return {
        backgroundColor: COLORS[ColorEnum.SUCCESS],
        icon: 'ios-checkmark-circle-outline'
      }
    default:
      return {
        backgroundColor: COLORS[ColorEnum.INFO],
        icon: 'md-information-circle-outline'
      }
  }
}

type TPosition = 'top' | 'bottom' | 'center'
const _toValue = (position: TPosition) => {
  if (position === 'top') {
    return SCREEN_HEIGHT - (isIphoneX() ? 40 : 0) - TOAST_HEIGHT
  }
  if (position === 'bottom') {
    return TOAST_HEIGHT
  }
  return 1
}

const Padding = styled.View`
  position: absolute;
  z-index: 1;
  width: 100%;
  border-radius: ${BORDER_RADIUS};
  padding-top: ${extractCondition<{ padding: boolean }, any>('padding', 40, 0)};
  padding-left: ${MARGIN};
  padding-right: ${MARGIN};
  box-shadow: ${BOX_SHADOW};
`
const Touchable = styled.TouchableWithoutFeedback`
  flex: 1;
`
const Container = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
`
const Text = styled(AText)`
  margin-left: ${MARGIN};
  flex: 1;
  color: white;
`

export default Toast
