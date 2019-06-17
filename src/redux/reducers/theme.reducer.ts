import { THEME_CHANGE } from '../actions/types';
import { ThemeActionsType } from '../actions';
import { THEME } from '@utils/theme.util';

const DEFAULT_STATE = {
  ...THEME['SONARR']
};

export const themeReducer =
  (state = DEFAULT_STATE, action: ThemeActionsType) => {

  switch (action.type) {
    case THEME_CHANGE:
      return { ...THEME[action.payload] };
    default: return state;
  }
};
