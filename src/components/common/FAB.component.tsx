import { isIphoneX } from '@utils/helpers.util'
import { BOX_SHADOW, MARGIN } from '@utils/position.util'
import { extractProp } from '@utils/recipes.util'
import React from 'react'
import { GestureResponderEvent } from 'react-native'
import styled from 'styled-components/native'

type Positions = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
type Props = {
  onPress?: (event: GestureResponderEvent) => void
  position?: Positions
  children: React.ReactNode
  background?: string
  fullscreen?: boolean
}
const AFAB: React.FC<Props> = ({
  children,
  onPress,
  position = 'bottom-right',
  background = 'hsla(228, 11%, 28%, 1)',
  fullscreen = false
}) => {
  return (
    <Container position={position} fullscreen={fullscreen}>
      <Button onPress={onPress} background={background}>
        {children}
      </Button>
    </Container>
  )
}

const where = ({
  position,
  fullscreen
}: {
  position: Positions
  fullscreen: boolean
}) => {
  // when no safeAreaView is set in the container displaying it
  const add = fullscreen && isIphoneX() ? 20 : 0
  switch (position) {
    case 'top-left':
      return `top: ${MARGIN + add}; left: ${MARGIN};`
    case 'top-right':
      return `top: ${MARGIN + add}; right: ${MARGIN};`
    case 'bottom-left':
      return `bottom: ${MARGIN}; left: ${MARGIN};`
    default:
      return `bottom: ${MARGIN}; right: ${MARGIN};`
  }
}
/**
 * This circle in circle fixes, jagged edges of a
 * border in a circle
 */
const Container = styled.View<{ position: Positions; fullscreen: boolean }>`
  position: absolute;
  ${where}
  height: 60;
  width: 60;
  border-radius: 50;
  background: white;
  padding: 2px;
  box-shadow: ${BOX_SHADOW};
`
const Button = styled.TouchableOpacity`
  background: ${extractProp<{ background: string }>('background')};
  border-radius: 40;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
`

export default React.memo(AFAB)
