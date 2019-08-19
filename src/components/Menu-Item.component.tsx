import React from 'react'
import styled from 'styled-components/native'
import { TMenuItem, StyledThemeP } from '@utils/types.util'
import { extractStyleTheme, useADispatchC } from '@utils/recipes.util'
import _ from 'lodash'
import { Entypo } from '@expo/vector-icons'
import { BETWEEN_WIDTH, OFFSET } from '@utils/dimensions.util'
import { do_navigate } from '@actions/navigation.actions'
import { COLORS } from '@utils/constants.util'
import { useTheme } from '@hooks/useTheme'

type Props = {
  item: TMenuItem
}
const AMenuItem: React.FC<Props> = ({ item }) => {
  const { title, key, isOnline } = item
  const navigator = useADispatchC(do_navigate(title))
  const [theme, themeTitle] = useTheme()
  const isSelected = {
    selected: title === themeTitle,
    isEven: Number(key) % 2 === 0,
    color: COLORS[key],
    isOnline
  }

  return (
    <SItem onPress={navigator} theme={theme} {...isSelected}>
      <SText theme={theme}>{title}</SText>
      {isSelected.selected ? (
        <BtnIcon name="dot-single" size={32} color="white" />
      ) : null}
    </SItem>
  )
}
type TSpecial = StyledThemeP & {
  selected: boolean
  isEven: boolean
  isOnline: boolean
  color: string
}
const SItem = styled.TouchableOpacity<TSpecial>`
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${BETWEEN_WIDTH + OFFSET};
  border-right-width: 3px;
  border-style: solid;
  border-right-color: ${p => p.color};
  background-color: ${({ isEven, theme }) =>
    isEven ? theme.dark : theme.lighterDark};
`
const SText = styled.Text<StyledThemeP>`
  position: absolute;
  left: 0;
  width: ${BETWEEN_WIDTH};
  flex: 1;
  color: white;
  text-transform: capitalize;
  font-family: ${extractStyleTheme('fontRegular')};
  font-size: 20px;
  text-align: center;
`
const BtnIcon = styled(Entypo)`
  position: absolute;
  align-self: flex-end;
  right: 0;
`

export default AMenuItem
