import React from 'react'
import { View, Text } from 'react-native'
import { ScreenFComponent } from '../../utils/types.util'

const SonarrHomeScreen: ScreenFComponent = () => {
  return (
    <View>
      <Text>Sonarr</Text>
    </View>
  )
}

SonarrHomeScreen.navigationOptions = {
  // tabBarOptions: {
  // }
}

export default SonarrHomeScreen
