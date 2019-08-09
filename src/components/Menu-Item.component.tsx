import React from 'react';
import styled from 'styled-components/native';
import { TMenuItem, StyledThemeP } from '@utils/types.util';
import { useShallowSelector, extractStyleTheme } from '@utils/recipes.util';
import { Dimensions } from 'react-native';
import _ from 'lodash';

const SCREEN_WIDTH = Dimensions.get ('window').width;
const OFFSET = SCREEN_WIDTH * 10 / 100;
const DRAWER_WIDTH = SCREEN_WIDTH * 75 / 100 + OFFSET;
/**
 * Width between the inner and outer bar
 * of the side menu
 */
const BETWEEN_WIDTH = DRAWER_WIDTH - OFFSET * 3;

type Props = {
  item: TMenuItem
};
const AMenuItem: React.FC<Props> = ({ item }) => {
  const THEME = useShallowSelector (state => state.theme);
  const { title, key, isOnline } = item;
  const isSelected = {
    selected: title === THEME.title,
    isEven: Number (key) % 2 === 0,
    isOnline
  };

  return (
    <SItem theme={THEME} {...isSelected}>
      <SText theme={THEME}>{title}</SText>
    </SItem>
  );
};
type TSpecial = StyledThemeP &
  { selected: boolean, isEven: boolean, isOnline: boolean };
const SItem = styled.TouchableOpacity<TSpecial>`
  height: 60px;
  justify-content: center;
  align-items: center;
  width: ${BETWEEN_WIDTH};
  ${({ selected, theme }) => selected && `
    border-left-width: 5px;
    border-style: solid;
    border-left-color: ${theme.primary};
  `};
  border-right-width: 3px;
  border-right-color: ${({ isOnline, theme: { danger, success } }) =>
    isOnline ? success : danger
  };

  background-color: ${({ isEven, theme }) =>
    isEven ? theme.dark : theme.lighterDark
  };
`;
const SText = styled.Text<StyledThemeP>`
  color: white;
  text-transform: capitalize;
  font-family: ${extractStyleTheme ('fontRegular')};
  font-size: 20px;
  text-align: center;
`;

export default AMenuItem;
