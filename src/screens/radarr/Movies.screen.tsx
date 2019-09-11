import React, { useState } from 'react'
import { FlatList } from 'react-native'
import styled from 'styled-components/native'
import { ScreenFComponent } from '@utils/types.util'
import ABackground from '@common/Background.component'
import { do_api_radarr_get_movies } from '@actions/api.actions'
import { useApi } from '@hooks/useApi'
import { ISeriesValue, IEntity } from '@interfaces/common.interface'
import MovieItem from '@components/Movie-Item.component'
import { useShallowSelector } from '@utils/recipes.util'
import SearchBar from '@common/Search-Bar.component'

const MoviesScreen: ScreenFComponent = () => {
  const movies = useShallowSelector(state => state.radarr.entities.movies)
  const [value, setValue] = useState('')
  const [result, refreshing, doRefresh] = useApi(
    do_api_radarr_get_movies(),
    state => state.radarr.result.movies
  )

  const data = result.filter(key => movies[key].title.indexOf(value) > -1)

  return (
    <ABackground>
      <FlatList
        initialNumToRender={8}
        onRefresh={doRefresh}
        refreshing={refreshing}
        keyExtractor={keyExtractor}
        data={data}
        renderItem={renderItem(movies)}
        ListHeaderComponent={renderHeader(setValue)}
      />
    </ABackground>
  )
}

const keyExtractor = (key: number) => key.toString()
const renderItem = (movies: IEntity<{}>) => ({ item }: any) => (
  <MovieItem movie={movies[item]} />
)
const renderHeader = (setValue: any) => {
  return <SearchBar accessibilityLabel="searchBar" onChange={setValue} />
}

export default MoviesScreen
