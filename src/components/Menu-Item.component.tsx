import React from 'react'
import styled from 'styled-components/native'
import { TMenuItem, StyledThemeP } from '@utils/types.util'
import {
  useShallowSelector,
  extractStyleTheme,
  useADispatchC
} from '@utils/recipes.util'
import _ from 'lodash'
import { Entypo } from '@expo/vector-icons'
import { BETWEEN_WIDTH, OFFSET } from '@utils/dimensions.util'
import { navigate } from '@actions/navigation.actions'

type Props = {
  item: TMenuItem
}
const AMenuItem: React.FC<Props> = ({ item }) => {
  const { title, key, isOnline } = item
  const navigator = useADispatchC(navigate(title))
  const THEME = useShallowSelector(state => state.theme)
  const isSelected = {
    selected: title === THEME.title,
    isEven: Number(key) % 2 === 0,
    isOnline
  }

  return (
    <SItem theme={THEME} onPress={navigator} {...isSelected}>
      <SText theme={THEME}>{title}</SText>
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
}
const SItem = styled.TouchableOpacity<TSpecial>`
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${BETWEEN_WIDTH + OFFSET};
  ${({ selected, theme }) =>
    selected &&
    `
    border-right-width: 5px;
    border-style: solid;
    border-right-color: ${theme.primary};
  `};
  /* border-right-width: 3px;
  border-right-color: ${({ isOnline, theme: { danger, success } }) =>
    isOnline ? success : danger}; */

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
