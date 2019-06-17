import React from 'react';
import { View } from 'react-native';
import { ScreenFComponent } from '../../utils/types.util';
import { AText } from '../../components/common';

const SonarrHomeScreen: ScreenFComponent = () => {
  return (
    <View>
      <AText>Hello</AText>
      <AText>Hello</AText>
      <AText>Hello</AText>
      <AText>Hello</AText>
    </View>
  );
};

SonarrHomeScreen.navigationOptions = {
};

export default SonarrHomeScreen;
