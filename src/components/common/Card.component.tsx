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

type Props = { color?: string }
const ACard: React.FC<Props> = ({ children, color }) => {
  return <Container color={color || 'transparent'}>{children}</Container>
}

const Container = styled.View`
  margin: ${MARGIN}px;
  padding: ${TOP_PADDING}px ${LEFT_PADDING}px;
  background: ${extractProp<Props>('color')};
  /* min-height: 500px; */
  border-radius: ${BORDER_RADIUS}px;
  box-shadow: ${BOX_SHADOW};
`

export default ACard
