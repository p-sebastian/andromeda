import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-elements';
import { ScreenFComponent } from '../../utils/types.util';
import { AText } from '../../components/common';
import { useADispatchC } from '@utils/recipes.util';
import { changeTheme } from '@actions/theme.actions';
import { ThemeEnum } from '@utils/enums.util';

const SonarrHomeScreen: ScreenFComponent = () => {
  const toSonarr = useADispatchC (changeTheme (ThemeEnum.SONARR));
  const toRadarr = useADispatchC (changeTheme (ThemeEnum.RADARR));

  return (
    <View>
      <Button
        title="Toggle radarr"
        onPress={toRadarr}
      />
      <Button
        title="Toggle Sonnar"
        onPress={toSonarr}
      />
      <AText>Hello</AText>
      <AText>Hello</AText>
      <AText>Hello</AText>
      <AText>Hello</AText>
    </View>
  );
};

SonarrHomeScreen.navigationOptions = {
  // tabBarOptions: {
  // }
};

export default SonarrHomeScreen;
