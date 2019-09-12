import { Selector } from '@utils/recipes.util'
import { RootState } from '@reducers/index'
import { TServerState } from '@reducers/server.reducer'
import { ServerEnum } from './enums.util'

export type ServersWithImages = ServerEnum.SONARR | ServerEnum.RADARR
type Select = (
  serverKey: ServersWithImages,
  key: string
) => Selector<string, RootState>
export const selectImage: Select = (serverKey, key) => state =>
  state[serverKey].entities.images[key].url

type SelectServer<P = ServersWithImages> = (
  serverKey: P
) => Selector<TServerState, RootState>
export const selectServer: SelectServer = serverKey => state =>
  state.server[serverKey]
