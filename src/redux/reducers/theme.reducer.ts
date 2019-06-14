import { THEME_CHANGE } from '../actions/types';
import { ThemeActionsType } from '../actions';

const DEFAULT_STATE = {

};

export const themeReducer =
  (state = DEFAULT_STATE, action: ThemeActionsType) => {

  switch (action.type) {
    case THEME_CHANGE: return state;
    default: return state;
  }
};
