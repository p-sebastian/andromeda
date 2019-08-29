import { useState, useEffect, useCallback } from 'react'
import { ApiActionsType } from '@actions/index'
import {
  useADispatchC,
  Selector,
  useShallowSelector,
  useASelector
} from '@utils/recipes.util'
import { RootState } from '@reducers/index'

const _useFetch = (action: ApiActionsType) => {
  const fetch = useADispatchC(action)
  const doRefresh = useCallback(fetch, [])
  useEffect(() => {
    fetch()
  }, [])

  return doRefresh
}

export const useApi = <TSelected>(
  action: ApiActionsType,
  selector: Selector<TSelected, RootState>
) => {
  const watch = useShallowSelector<TSelected>(selector)
  const refreshing = useASelector(state => state.spinner.loading)
  const doRefresh = _useFetch(action)
  return [watch, refreshing, doRefresh] as [
    TSelected,
    boolean,
    typeof doRefresh
  ]
}
