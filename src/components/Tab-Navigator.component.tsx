import React from 'react'
import { MaterialTopTabBar, MaterialTopTabBarProps } from 'react-navigation'
import styled from 'styled-components/native'
import { extractStyleTheme } from '@utils/recipes.util'
import { useTheme } from '@hooks/useTheme'
import { FONT } from '@src/utils/constants.util'

const AMaterialTopTabBar: React.FC<MaterialTopTabBarProps> = props => {
  const [theme] = useTheme()
  const modProps: MaterialTopTabBarProps = { ...props }
  // bottom bar
  modProps.indicatorStyle = {
    backgroundColor: theme.fontColor
  }
  // text in tab
  modProps.labelStyle = {
    fontFamily: FONT.bold,
    letterSpacing: 1,
    color: theme.fontColor
  }

  return <SMTTB theme={theme} {...modProps} />
}

const SMTTB = styled(MaterialTopTabBar)`
  background-color: ${extractStyleTheme('primary')};
`

export default AMaterialTopTabBar
