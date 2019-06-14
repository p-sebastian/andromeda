import React from 'react';
import { View, Text } from 'react-native';
import { ScreenFComponent } from '../../utils/types.util';

const SonarrHomeScreen: ScreenFComponent = () => {
  return (
    <View>
      <Text style={{ fontFamily: 'fira-code-bold', fontWeight: '200' }}>Hello</Text>
    </View>
  );
};

SonarrHomeScreen.navigationOptions = {
};

export default SonarrHomeScreen;
