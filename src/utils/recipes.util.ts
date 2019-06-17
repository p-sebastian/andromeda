import { useSelector, shallowEqual } from 'react-redux';
import { RootState } from '@reducers/index';

/**
 * Uses a shallow equal so that it doesnt trigger a
 * re render everytime when an object is returned.
 * ONLY GOES DOWN ONE LEVEL
 */
type Selector = (state: RootState) => any;
export const useShallowSelector = (selector: Selector) =>
  useSelector<RootState, any> (selector, shallowEqual);

/**
 * to use when returning a primitive value from
 * the selector
 */
export const useASelector = (selector: Selector) => useSelector (selector);
