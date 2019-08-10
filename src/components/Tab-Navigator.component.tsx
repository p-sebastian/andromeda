import React from 'react'
import { MaterialTopTabBar, MaterialTopTabBarProps } from 'react-navigation'
import styled from 'styled-components/native'
import { useShallowSelector, extractStyleTheme } from '@utils/recipes.util'

const AMaterialTopTabBar: React.FC<MaterialTopTabBarProps> = props => {
  const THEME = useShallowSelector(state => state.theme)
  const modProps: MaterialTopTabBarProps = { ...props }
  // bottom bar
  modProps.indicatorStyle = {
    backgroundColor: THEME.fontColor
  }
  // text in tab
  modProps.labelStyle = {
    fontFamily: THEME.fontBold,
    letterSpacing: 3,
    color: THEME.fontColor
  }

  return <SMTTB theme={THEME} {...modProps} />
}

const SMTTB = styled(MaterialTopTabBar)`
  background-color: ${extractStyleTheme('primary')};
`

export default AMaterialTopTabBar
