import React from 'react'
import styled from 'styled-components/native'
import AText from './Text.component'
import { COLORS } from '@utils/constants.util'
import { ThemeEnum } from '@utils/enums.util'
import { extractProp } from '@utils/recipes.util'
import { Ionicons } from '@expo/vector-icons'

type Props = { iconColor?: string; textColor?: string }
const AInfo: React.FC<Props & { children: string }> = props => {
  const {
    children,
    iconColor = COLORS[ThemeEnum.RADARR],
    textColor = '#FFF'
  } = props
  return (
    <Wrap>
      <Icon name="md-information-circle-outline" color={iconColor} size={32} />
      <Text textColor={textColor}>{children as any}</Text>
    </Wrap>
  )
}

const Wrap = styled.View`
  flex-direction: row;
  position: relative;
  align-items: center;
`
const Text = styled(AText)`
  color: ${extractProp<Props>('textColor')};
  text-align: center;
  padding-left: 10;
  flex: 1;
`
const Icon = styled(Ionicons)``

export default React.memo(AInfo)
