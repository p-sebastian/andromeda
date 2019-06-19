import React from 'react';
import { ScreenFComponent } from '@utils/types.util';
import styled from 'styled-components/native';
import { AText } from '@common/Text.component';

const UpcomingScreen: ScreenFComponent = () => {

  return (
    <SMain>
      <AText>Upcoming</AText>
      <AText>Upcoming</AText>
      <AText>Upcoming</AText>
      <AText>Upcoming</AText>
      <AText>Upcoming</AText>
    </SMain>
  );
};

const SMain = styled.View`
  flex: 1;
`;

export default UpcomingScreen;
