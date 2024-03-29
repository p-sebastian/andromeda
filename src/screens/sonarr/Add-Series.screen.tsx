import React, { useState, useCallback, useEffect } from 'react'
import { FlatList } from 'react-native'
import { ScreenFComponent } from '@utils/types.util'
import ABackground from '@common/Background.component'
import SearchBar from '@common/Search-Bar.component'
import SearchItem from '@common/Search-Item.component'
import { useADispatch, useASelector } from '@utils/recipes.util'
import { do_api_sonarr_get_search } from '@actions/api.actions'
import { IRawSeries } from '@interfaces/common.interface'
import { do_clear_search_series, do_toast_show } from '@actions/general.actions'
import AInfo from '@common/Info-Text.component'
import ACard from '@common/Card.component'
import { ColorEnum } from '@utils/enums.util'
import { COLORS } from '@utils/constants.util'

type ISearchSeries = IRawSeries<{ coverType: string; url: string }>
const AddSeriesScreen: ScreenFComponent = () => {
  const dispatch = useADispatch()
  const found = useASelector(state => state.temp.search)
  const [search, setSearch] = useState('')

  const onPress = useCallback(() => {
    dispatch(
      search
        ? do_api_sonarr_get_search(search)
        : do_toast_show('Please type something first')
    )
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
      {found.length ? null : (
        <ACard color={COLORS[ColorEnum.GRAY]} margin={10}>
          <AInfo>Find by series title</AInfo>
        </ACard>
      )}
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
