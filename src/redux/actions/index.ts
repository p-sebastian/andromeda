import { ActionType } from 'typesafe-actions';

import * as themeActions from './theme.actions';
export type ThemeActionsType = ActionType<typeof themeActions>;

export { themeActions };
