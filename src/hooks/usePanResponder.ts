import {
  PanResponder, Animated, Dimensions, PanResponderInstance
} from 'react-native';
import { useState } from 'react';

const SCREEN_WIDTH = Dimensions.get ('window').width;
// Sidebar size
const OFFSET = SCREEN_WIDTH * 10 / 100;
const DRAWER_WIDTH = SCREEN_WIDTH * 75 / 100 + OFFSET;
const HIDDEN_WIDTH = DRAWER_WIDTH - OFFSET;
// 281, 37
// console.info (OFFSET, HIDDEN_WIDTH);

type usePanResponderFn = (position: Animated.Value, themeTitle: string) =>
  [PanResponderInstance, string];
export const usePanResponder: usePanResponderFn =
  (position, themeTitle) => {
  const [title, setTitle] = useState (themeTitle);
  // only gets initialized once
  const [panResponder] = useState (
    PanResponder.create ({
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
          // console.info (dx);
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
    })
  );

  type Lock = (open: boolean) => void;
  const lock: Lock = open => {
    const value = open ? HIDDEN_WIDTH : OFFSET;
    Animated.timing (position, {
      toValue: value,
      duration: 400,
      useNativeDriver: true
    }).start (() => {
      setTitle (open ? 'Andromeda' : themeTitle);
      // reset offset when animation finishes
      position.setOffset (value);
      position.setValue (0);
    });
  };
  return [panResponder, title];
};
