import { useTheme } from '@hooks/useTheme'
import { extractStyleTheme } from '@utils/recipes.util'
import React from 'react'
import { View } from 'react-native'
import SafeAreaView from 'react-native-safe-area-view'
import styled from 'styled-components/native'

const AHeader: React.FC = () => {
  const theme = useTheme()
  return (
    <SSafeView
      theme={theme}
      forceInset={{ top: 'always' }}
      accessibilityLabel="header"
    />
  )
}

const SSafeView = styled(SafeAreaView)`
  background-color: ${extractStyleTheme('primary')};
  flex: 1;
  justify-content: center;
  align-items: center;
`

/**
 * For some reason passing it to the navigator header
 * will not see the AHeader as a functional component
 * so hooks will break. By wrapping it, it fixes this issue
 */
const Container = () => (
  <View>
    <AHeader />
  </View>
)
export default Container
