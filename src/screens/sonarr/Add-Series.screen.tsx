import React, { useState, useCallback, useEffect } from 'react'
import { FlatList } from 'react-native'
import { ScreenFComponent } from '@utils/types.util'
import ABackground from '@common/Background.component'
import SearchBar from '@common/Search-Bar.component'
import SearchItem from '@common/Search-Item.component'
import { useADispatch, useASelector } from '@src/utils/recipes.util'
import { do_api_sonarr_get_search } from '@src/redux/actions/api.actions'
import { IRawSeries } from '@src/interfaces/common.interface'
import { do_clear_search_series } from '@src/redux/actions/general.actions'

type ISearchSeries = IRawSeries<{ coverType: string; url: string }>
const AddSeriesScreen: ScreenFComponent = () => {
  const dispatch = useADispatch()
  const found = useASelector(state => state.temp.search)
  const [search, setSearch] = useState('')

  const onPress = useCallback(() => {
    dispatch(do_api_sonarr_get_search(search))
  }, [search])

  useEffect(() => () => dispatch(do_clear_search_series()), [])

  return (
    <ABackground>
      <SearchBar
        accessibilityLabel="search"
        onChange={setSearch}
        onPress={onPress}
        placeholder="Show name"
        touchable
      />
      <FlatList
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        data={found}
      />
    </ABackground>
  )
}
const keyExtractor = (item: ISearchSeries) => item.imdbId
const renderItem = ({ item }: { item: ISearchSeries }) => (
  <SearchItem item={item} />
)

export default AddSeriesScreen
