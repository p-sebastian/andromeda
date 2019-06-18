import React from 'react';
import {
  NavigationScreenProps, NavigationScreenConfig
} from 'react-navigation';
import { Epic } from 'redux-observable';
import { RootState } from '../redux/reducers';
import { ThemeActionsType } from '../redux/actions';
import { TTheme } from './theme.util';

/**
 * T: Navigation passed params interface
 */
type NavProps<T> = NavigationScreenProps<T>;

/**
 * P: Props
 * S: State
 * A: Passed params by navigation will be in
 * this.props.navigation.state.params[param]
 */
export abstract class ScreenComponent<P = {}, S = {}, A = {}>
  extends React.Component<P & NavProps<A>, S> { }

export type ScreenFComponent<P = {}, options = {}> =
  React.FC<P> & { navigationOptions: NavigationScreenConfig<options> };

/**
 * Generalize Epic type
 * A must extend all of the actionsTypes
 *
 * Epic<InputActions, OutputActions, RootState, InjectedDependencies>
 */
export type TActions = ThemeActionsType;
type TDependencies = {};
export type TEpic<A extends TActions> = Epic<A, A, RootState, TDependencies>;
// add theme prop for styled components
export type StyledThemeP = { theme: TTheme };
