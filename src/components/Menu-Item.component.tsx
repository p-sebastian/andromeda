import React, { useCallback } from 'react'
import styled from 'styled-components/native'
import { TServer, StyledThemeP } from '@utils/types.util'
import { extractStyleTheme, useADispatchC } from '@utils/recipes.util'
import _ from 'lodash'
import { Entypo } from '@expo/vector-icons'
import { BETWEEN_WIDTH, OFFSET } from '@utils/dimensions.util'
import { do_navigate } from '@actions/navigation.actions'
import { COLORS, FONT } from '@utils/constants.util'
import { useTheme } from '@hooks/useTheme'
import { withinScreen } from '@utils/helpers.util'
import { do_sidebar_toggle } from '@actions/general.actions'

type Props = {
  item: TServer
}
const AMenuItem: React.FC<Props> = ({ item }) => {
  const { title, key, themeKey } = item
  const navigator = useADispatchC(do_navigate(title))
  const close = useADispatchC(do_sidebar_toggle(false))
  const [theme, themeTitle] = useTheme()
  const isSelected = {
    selected: withinScreen(key, themeTitle),
    isEven: Number(key) % 2 === 0,
    color: COLORS[themeKey]
  }
  const closeAndNavigate = useCallback(() => {
    navigator()
    close()
  }, [])

  return (
    <SItem onPress={closeAndNavigate} theme={theme} {...isSelected}>
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
  font-family: ${FONT.regular};
  font-size: 20px;
  text-align: center;
`
const BtnIcon = styled(Entypo)`
  position: absolute;
  align-self: flex-end;
  right: 0;
`

export default AMenuItem
