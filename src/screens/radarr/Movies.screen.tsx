import { do_api_radarr_get_movies } from '@actions/api.actions'
import ABackground from '@common/Background.component'
import SearchBar from '@common/Search-Bar.component'
import MovieItem from '@components/Movie-Item.component'
import { useApi } from '@hooks/useApi'
import { IEntity } from '@interfaces/common.interface'
import { IMovie } from '@interfaces/movie.interface'
import { fuzzySearch } from '@utils/helpers.util'
import { useShallowSelector } from '@utils/recipes.util'
import { ScreenFComponent } from '@utils/types.util'
import React, { useMemo, useState } from 'react'
import { FlatList } from 'react-native'

const MoviesScreen: ScreenFComponent = () => {
  const movies = useShallowSelector(state => state.radarr.entities.movies)
  const [value, setValue] = useState('')
  const [result, refreshing, doRefresh] = useApi(
    do_api_radarr_get_movies(),
    state => state.radarr.result.movies
  )

  const fuse = useMemo(() => fuzzySearch(movies, 'tmdbId'), [
    JSON.stringify(result)
  ])
  const data = value === '' ? result : (fuse.search(value) as number[])

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
const renderItem = (movies: IEntity<IMovie>) => ({ item }: any) => (
  <MovieItem movie={movies[item]} />
)
const renderHeader = (setValue: any) => {
  return <SearchBar accessibilityLabel="searchBar" onChange={setValue} />
}

export default MoviesScreen
