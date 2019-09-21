import React, { useMemo, useEffect } from 'react'
import styled from 'styled-components/native'
import {
  useShallowSelector,
  useADispatchC,
  extractCondition
} from '@src/utils/recipes.util'
import { SCREEN_HEIGHT } from '@src/utils/dimensions.util'
import { isIphoneX } from '@src/utils/helpers.util'
import { MARGIN, BORDER_RADIUS, BOX_SHADOW } from '@src/utils/position.util'
import { Animated } from 'react-native'
import { do_toast_hide } from '@src/redux/actions/general.actions'
import { COLORS } from '@src/utils/constants.util'
import { ColorEnum } from '@src/utils/enums.util'
import { Ionicons } from '@expo/vector-icons'
import { ToastState } from '@src/redux/reducers'
import AText from '@common/Text.component'

const TOAST_HEIGHT = 60

const Toast: React.FC = () => {
  const toast = useShallowSelector(state => state.toast)
  const animated = useAnimate(toast)
  const { backgroundColor, icon } = _styles(toast.type)

  return (
    <Padding
      as={Animated.View}
      padding={animated.height > TOAST_HEIGHT}
      style={{ ...animated, backgroundColor } as any}
    >
      <Container>
        <Ionicons name={icon} color="white" size={32} />
        <Text>{toast.msg}</Text>
      </Container>
    </Padding>
  )
}

const useAnimate = ({ position, visible, duration }: ToastState) => {
  const hide = useADispatchC(do_toast_hide())
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
    }).start(() => (visible ? setTimeout(hide, duration) : null))
  }

  useEffect(() => {
    animate()
  }, [visible])

  return position === 'center'
    ? { height, opacity: animated, top: SCREEN_HEIGHT / 2 }
    : { height, bottom: animated }
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