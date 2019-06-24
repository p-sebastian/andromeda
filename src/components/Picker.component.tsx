import React from 'react';
import { TextStyle, Dimensions, GestureResponderEvent } from 'react-native';
import styled from 'styled-components/native';
import { useShallowSelector } from '@utils/recipes.util';

const SCREEN_HEIGHT = Dimensions.get ('window').height;

const APicker: React.FC = () => {
  const THEME = useShallowSelector (state => state.theme);

  return (
    <SContainer>

    </SContainer>
  );
};

  // makes sure you are moving horizontally significantly
  // Math.abs (e.dy) > Math.abs (dx * 2);

const SContainer = styled.View`
  height: ${SCREEN_HEIGHT};
  width: auto;
  opacity: 0.5;
  /* align-content: center; */
  /* justify-content: center; */
  background-color: white;
`;

export default APicker;
