import React from 'react'
import styled from 'styled-components/native'
import { extractStyleTheme } from '@utils/recipes.util'
import { View } from 'react-native'
import SafeAreaView from 'react-native-safe-area-view'
import { useTheme } from '@hooks/useTheme'

const AHeader: React.FC = () => {
  const [theme] = useTheme()
  return <SSafeView theme={theme} accessibilityLabel="header"></SSafeView>
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
