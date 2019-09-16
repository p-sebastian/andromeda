import React from 'react'
import styled from 'styled-components/native'
import { extractProp } from '@utils/recipes.util'
import {
  MARGIN,
  TOP_PADDING,
  LEFT_PADDING,
  BORDER_RADIUS,
  BOX_SHADOW
} from '@utils/position.util'

type Props = { color?: string; margin?: number }
const ACard: React.FC<Props> = ({ children, color, margin = MARGIN }) => {
  return (
    <Container color={color || 'transparent'} margin={margin}>
      {children}
    </Container>
  )
}

const Container = styled.View`
  margin: ${extractProp<Props>('margin')}px;
  padding: ${TOP_PADDING}px ${LEFT_PADDING}px;
  background: ${extractProp<Props>('color')};
  border-radius: ${BORDER_RADIUS}px;
  box-shadow: ${BOX_SHADOW};
`

export default ACard
