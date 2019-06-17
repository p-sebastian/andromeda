import React, { ReactNode, useState } from 'react';
import { Animated, Dimensions, PanResponder } from 'react-native';
import styled from 'styled-components/native';
import { AText } from './Text.component';

const SCREEN_WIDTH = Dimensions.get ('window').width;
const SCREEN_HEIGHT = Dimensions.get ('window').height;
const DRAWER_WIDTH = SCREEN_WIDTH * 70 / 100;
// Sidebar size
const OFFSET = SCREEN_WIDTH * 10 / 100;

type Extra = { position: Animated.ValueXY };
type Props = { content: any };
/**
 * Moves the 2 screens as a whole, while applying
 * opacity to the main view
 */
const ADrawer: React.FC<Props> & Extra = ({ content, children }) => {
  const { position } = ADrawer;
  console.info ('rendered');

  return (
    <SViewContainer as={Animated.View} style={position.getLayout ()}>
      <SSafeAreaView>
        <DrawerContent content={content} position={position} />
        <MainContent main={children} />
      </SSafeAreaView>
    </SViewContainer>
  );
};
ADrawer.position = new Animated.ValueXY ({ x: OFFSET, y: 0 });

type ContentProps = { content: any, position: Animated.ValueXY };
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
const createPanResponder = (position: Animated.ValueXY) =>
  PanResponder.create ({
  onStartShouldSetPanResponder: () => true,
  /**
   * only moves when dx is far greater than dy
   */
  onMoveShouldSetPanResponderCapture: (e, gesture) =>
    Math.abs (gesture.dx) > Math.abs (gesture.dy * 1.1),
  onPanResponderMove: (event, { dx, x0 }) => {
    // position the element has moved when finger released
    const { _offset } = position.x as any;
    if ((DRAWER_WIDTH - OFFSET) - _offset > dx && dx > OFFSET - _offset) {
      position.setValue ({ x: dx, y: 0 });
    }
  },
  onPanResponderGrant: (e, gesture) => {
    position.extractOffset ();
  },
  onPanResponderRelease: () => position.flattenOffset ()
});

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
