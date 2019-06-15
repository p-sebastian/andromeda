import { action } from 'typesafe-actions';
import { THEME_CHANGE } from './types';

type ThemeName = 'SONARR' | 'RADARR';

export const changeTheme = (which: ThemeName) => action (THEME_CHANGE, which);
