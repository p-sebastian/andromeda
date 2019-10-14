import { do_api_sonarr_get_command } from '@actions/api.actions'
import ABackground from '@common/Background.component'
import TaskItem from '@components/Task-Item.component'
import { useApi } from '@hooks/useApi'
import { ICommand } from '@interfaces/command.interface'
import { IEntity } from '@interfaces/common.interface'
import { useShallowSelector } from '@utils/recipes.util'
import { ScreenFComponent } from '@utils/types.util'
import React from 'react'
import { FlatList, ListRenderItem } from 'react-native'

const SonarrTaskScreen: ScreenFComponent = () => {
  const commands = useShallowSelector(state => state.sonarr.entities.command)
  const [result, refreshing, doRefresh] = useApi(
    do_api_sonarr_get_command(),
    state => state.sonarr.result.command
  )

  return (
    <ABackground>
      <FlatList
        onRefresh={doRefresh}
        refreshing={refreshing}
        keyExtractor={keyExtractor}
        renderItem={renderItem(commands)}
        data={result}
      />
    </ABackground>
  )
}

const keyExtractor = (key: number) => key.toString()
const renderItem: (
  commands: IEntity<ICommand>
) => ListRenderItem<number> = commands => ({ item }) => (
  <TaskItem command={commands[item]} />
)

export default SonarrTaskScreen
