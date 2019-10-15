import { do_api_sonarr_put_series } from '@actions/api.actions'
import { useADispatch, useShallowSelector } from '@utils/recipes.util'
import { cloneDeep, isUndefined } from 'lodash'

export const useUpdate = (tvdbId: number) => {
  const dispatch = useADispatch()
  const series = useShallowSelector(
    state => state.sonarr.entities.series[tvdbId]
  )
  const _update = (seasonNumber?: number) => {
    const clone = cloneDeep(series)
    if (isUndefined(seasonNumber)) {
      clone.monitored = !clone.monitored
    } else {
      const i = clone.seasons.findIndex(s => s.seasonNumber === seasonNumber)
      clone.seasons[i].monitored = !clone.seasons[i].monitored
    }
    dispatch(do_api_sonarr_put_series(clone))
  }
  return _update
}
