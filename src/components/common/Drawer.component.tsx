import React, { ReactNode, useState } from 'react';
import { Animated, Dimensions, PanResponder } from 'react-native';
import styled from 'styled-components/native';
import { AText } from './Text.component';

const SCREEN_WIDTH = Dimensions.get ('window').width;
const SCREEN_HEIGHT = Dimensions.get ('window').height;
// Sidebar size
const OFFSET = SCREEN_WIDTH * 10 / 100;
const DRAWER_WIDTH = SCREEN_WIDTH * 75 / 100 + OFFSET;

type Extra = { position: Animated.Value };
type Props = { content: any };
/**
 * Moves the 2 screens as a whole, while applying
 * opacity to the main view
 */
const ADrawer: React.FC<Props> & Extra = ({ content, children }) => {
  const { position } = ADrawer;
  const animated = { transform: [{ translateX: position }] };
  console.info ('rendered');

  return (
    <SViewContainer as={Animated.View} style={animated as any}>
      <SSafeAreaView>
        <DrawerContent content={content} position={position} />
        <MainContent main={children} />
      </SSafeAreaView>
    </SViewContainer>
  );
};
ADrawer.position = new Animated.Value (OFFSET);

type ContentProps = { content: any, position: Animated.Value };
const DrawerContent: React.FC<ContentProps> = ({ content, position }) => {
  const [panResponder] = useState (createPanResponder (position));
  console.info (`OFFSET: ${OFFSET}, DRAWER: ${DRAWER_WIDTH}`);
  return (
    <SDrawerView as={Animated.View}
      {...panResponder.panHandlers}
    >
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
      const { _value, _offset } = position as any;
      // position the element has moved when finger released
      if ((DRAWER_WIDTH - OFFSET) - _offset > dx && dx > OFFSET - _offset) {
        console.info ('value', _value);
        position.setValue (dx);
      }
    },
    onPanResponderGrant: (e, { dx }) => {
      position.extractOffset ();
    },
    onPanResponderRelease: (e, { dx, vx }) => {
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
    const value = open ? DRAWER_WIDTH - OFFSET : OFFSET;
    Animated.timing (position, {
      toValue: value,
      duration: 400,
      useNativeDriver: true
    }).start (() => {
      // reset offset when animation finishes
      position.setOffset (value);
      position.setValue (0);
      // position.flattenOffset ();
    });
  };
  return panResponder;
};

type MainProps = { main: ReactNode };
const MainContent: React.FC<MainProps> = ({ main }) => {
  return (
    <SMainView as={Animated.View}>
      {main}
    </SMainView>
  );
};

// Container view
const SViewContainer = styled.View`
  position: absolute;
  left: 0;
`;
const SSafeAreaView = styled.SafeAreaView`
  flex: 1;
  background-color: red;
`;
const SDrawerView = styled.View`
  position: absolute;
  flex: 1;
  width: ${DRAWER_WIDTH};
  height: ${SCREEN_HEIGHT};
  left: ${-DRAWER_WIDTH + OFFSET};
  background-color: green;
`;
const SMainView = styled.View`
  position: absolute;
  width: ${SCREEN_WIDTH - OFFSET};
  height: ${SCREEN_HEIGHT};
`;

export default ADrawer;
