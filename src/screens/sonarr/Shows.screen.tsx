import React, { useEffect } from 'react'
import { View, Text, TouchableHighlight } from 'react-native'
import { ScreenFComponent } from '../../utils/types.util'
import { useADispatch } from '@utils/recipes.util'
import { do_navigate } from '@actions/navigation.actions'

const SonarrHomeScreen: ScreenFComponent = () => {
  const dispatch = useADispatch()
  const toSettings = () => dispatch(do_navigate('settings'))
  // const toSettings = () => RootNavigation.navigate('settings', {})
  return (
    <View>
      <Text>Sonarr</Text>
      <TouchableHighlight onPress={toSettings}>
        <Text>test</Text>
      </TouchableHighlight>
    </View>
  )
}

SonarrHomeScreen.navigationOptions = {
  // tabBarOptions: {
  // }
}

export default SonarrHomeScreen
