import React from 'react'
import styled from 'styled-components/native'
import { extractProp } from '@utils/recipes.util'
import { THEME } from '@utils/theme.util'
import { ThemeEnum } from '@utils/enums.util'

type Props = { color?: string }
const ACard: React.FC<Props> = ({ children, color }) => {
  return <Container color={color || 'transparent'}>{children}</Container>
}

const Container = styled.View`
  margin: 20px 20px;
  padding: 20px 16px;
  background: ${extractProp<Props>('color')};
  min-height: 500px;
  border-radius: 5px;
  box-shadow: 3px 3px 5px ${THEME[ThemeEnum.MAIN].primaryDark};
`

export default ACard
