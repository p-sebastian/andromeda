import React from 'react'
import { GestureResponderEvent } from 'react-native'
import styled from 'styled-components/native'
import { MARGIN, BOX_SHADOW } from '@utils/position.util'

type Positions = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
type Props = {
  onPress?: (event: GestureResponderEvent) => void
  position?: Positions
  children: React.ReactNode
}
const AFAB: React.FC<Props> = ({
  children,
  onPress,
  position = 'bottom-right'
}) => {
  return (
    <Container position={position}>
      <Button onPress={onPress}>{children}</Button>
    </Container>
  )
}

const where = ({ position }: { position: Positions }) => {
  switch (position) {
    case 'top-left':
      return `top: ${MARGIN}; left: ${MARGIN};`
    case 'top-right':
      return `top: ${MARGIN}; right: ${MARGIN};`
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
const Container = styled.View<{ position: Positions }>`
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
  background: hsla(228, 11%, 28%, 1);
  border-radius: 40;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
`

export default React.memo(AFAB)
