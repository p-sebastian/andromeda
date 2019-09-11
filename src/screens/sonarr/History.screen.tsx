import React from 'react'
import { FlatList } from 'react-native'
import { ScreenFComponent } from '@utils/types.util'
import ABackground from '@common/Background.component'
import { useShallowSelector } from '@utils/recipes.util'
import { do_api_sonarr_get_history } from '@actions/api.actions'
import { useApi } from '@hooks/useApi'
import { IHistory } from '@interfaces/history.interface'
import HistoryItem from '@components/History-Item.component'
import { IEntity } from '@interfaces/common.interface'

const HistoryScreen: ScreenFComponent = () => {
  const history = useShallowSelector(state => state.sonarr.entities.history)
  const [result, refreshing, doRefresh] = useApi(
    do_api_sonarr_get_history(),
    state => state.sonarr.result.history
  )

  return (
    <ABackground>
      <FlatList
        onRefresh={doRefresh}
        refreshing={refreshing}
        keyExtractor={keyExtractor}
        data={result}
        renderItem={renderItem(history)}
      />
    </ABackground>
  )
}

const keyExtractor = (key: number) => key.toString()
const renderItem = (history: IEntity<IHistory>) => ({ item }: any) => (
  <HistoryItem history={history[item]} />
)

export default HistoryScreen
