import React, { ReactNode, useState } from 'react';
import { Animated, Dimensions, PanResponder, View } from 'react-native';
import styled from 'styled-components/native';
import { useShallowSelector, extractStyleTheme } from '@utils/recipes.util';
import { StyledThemeP } from '@utils/types.util';

const SCREEN_WIDTH = Dimensions.get ('window').width;
const SCREEN_HEIGHT = Dimensions.get ('window').height;
// Sidebar size
const OFFSET = SCREEN_WIDTH * 10 / 100;
const DRAWER_WIDTH = SCREEN_WIDTH * 75 / 100 + OFFSET;
const HIDDEN_WIDTH = DRAWER_WIDTH - OFFSET;
console.info (DRAWER_WIDTH);

type Extra = { position: Animated.Value };
type Props = { content: any };
/**
 * Moves the 2 screens as a whole, while applying
 * opacity to the main view
 */
const ADrawer: React.FC<Props> & Extra = ({ content, children }) => {
  const { position } = ADrawer;
  const animated = { transform: [{ translateX: position }] };

  return (
    <View>
      <SViewContainer as={Animated.View} style={animated as any}>
        <SSafeAreaView>
          <DrawerContent content={content} position={position} />
          <MainContent main={children} position={position} />
        </SSafeAreaView>
      </SViewContainer>
    </View>
  );
};
ADrawer.position = new Animated.Value (OFFSET);

type ContentProps = { content: any, position: Animated.Value };
const DrawerContent: React.FC<ContentProps> = ({ content, position }) => {
  const [panResponder] = useState (createPanResponder (position));
  /**
   * makes title bar stick to the left, while animation is happening
   * 26, is the pixel number of the bars width;
   */
  const animate = { transform: [{ translateX: position.interpolate ({
    inputRange: [OFFSET, HIDDEN_WIDTH + 26],
    outputRange: [-OFFSET + 26, -HIDDEN_WIDTH]
  }) }] };
  const THEME = useShallowSelector (state => state.theme);

  return (
    <SDrawerView as={Animated.View}
      {...panResponder.panHandlers}
      theme={THEME}
    >
      <STitleContainer as={Animated.View} style={animate as any}>
        <STitle theme={THEME}>{THEME.title}</STitle>
      </STitleContainer>
      {content}
    </SDrawerView>
  );
};
const createPanResponder = (position: Animated.Value) => {
  const panResponder = PanResponder.create ({
    /**
     * only moves when dx is far greater than dy
     */
    onMoveShouldSetPanResponderCapture: (e, { dx, dy }) =>
      // makes sure you are moving horizontally significantly
      Math.abs (dx) > Math.abs (dy * 2),
    onPanResponderMove: (event, { dx }) => {
      const { _offset } = position as any;
      // position the element has moved when finger released
      if ((DRAWER_WIDTH - OFFSET) - _offset > dx && dx > OFFSET - _offset) {
        position.setValue (dx);
      }
    },
    onPanResponderGrant: (e, { dx }) => {
      position.extractOffset ();
    },
    onPanResponderRelease: (e, { dx }) => {
      const { _value } = position as any;
      // prevents resetting when position isnt moving
      if (_value > 0 || _value < 0) {
        position.flattenOffset ();
        lock (dx > 0);
      }
    }
  });

  type Lock = (open: boolean) => void;
  const lock: Lock = open => {
    const value = open ? HIDDEN_WIDTH : OFFSET;
    Animated.timing (position, {
      toValue: value,
      duration: 400,
      useNativeDriver: true
    }).start (() => {
      // reset offset when animation finishes
      position.setOffset (value);
      position.setValue (0);
    });
  };
  return panResponder;
};

type MainProps = { main: ReactNode, position: Animated.Value };
const MainContent: React.FC<MainProps> = ({ main, position }) => {
  const THEME = useShallowSelector (state => state.theme);
  // hide main content
  const animated = { opacity: position.interpolate ({
    inputRange: [OFFSET, HIDDEN_WIDTH],
    outputRange: [1, 0]
  }) };

  return (
    <SMainView as={Animated.View} theme={THEME}>
      <STransparentOverlay
        as={Animated.View}
        style={animated as any}
      >
        {main}
      </STransparentOverlay>
    </SMainView>
  );
};

/**
 * transparent overlay, that fades in color from parent
 */
const STransparentOverlay = styled.View`
  flex: 1;
`;
// Container view
const SViewContainer = styled.View`
  position: absolute;
  left: 0;
`;
const SSafeAreaView = styled.SafeAreaView`
  flex: 1;
  background-color: red;
`;
const SDrawerView = styled.View<StyledThemeP>`
  position: absolute;
  flex: 1;
  width: ${DRAWER_WIDTH};
  height: ${SCREEN_HEIGHT};
  left: ${-DRAWER_WIDTH + OFFSET};
  background-color: ${extractStyleTheme ('dark')};
`;
const SMainView = styled.View<StyledThemeP>`
  position: absolute;
  width: ${SCREEN_WIDTH - OFFSET};
  height: ${SCREEN_HEIGHT}; 
  background-color: ${extractStyleTheme ('primary')};
`;
const STitleContainer = styled.View`
  position: absolute;
  z-index: 20;
  height: ${SCREEN_HEIGHT};
  width: 26px;
  left: ${DRAWER_WIDTH - OFFSET - 26};
  top: 0;
  justify-content: center;
  align-items: center;
`;
const STitle = styled.Text<StyledThemeP>`
  color: white;
  transform: rotate(270deg);
  text-transform: capitalize;
  /* this width sets the length available for the text
   * the one limiting it is the container which must have a fixed
   * width 
   */
  width: 200;
  text-align: center;
  font-family: ${extractStyleTheme ('fontItalic')};
  font-size: 24px;
`;

export default ADrawer;
