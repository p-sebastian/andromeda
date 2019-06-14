import { action } from 'typesafe-actions';
import { THEME_CHANGE } from './types';

type TTheme = 'sonarr' | 'radarr';

export const changeTheme = (which: TTheme) => action (THEME_CHANGE, which);
