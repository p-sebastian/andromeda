import { Selector } from '@utils/recipes.util'
import { RootState } from '@reducers/index'
import { TServerState } from '@reducers/server.reducer'
import { ServerEnum } from './enums.util'

export type ServersWithImages = ServerEnum.SONARR | ServerEnum.RADARR
type Select<TSelected, P> = (
  serverKey: ServersWithImages,
  key: P
) => Selector<TSelected, RootState>
export const selectImage: Select<string, string> = (serverKey, key) => state =>
  state[serverKey].entities.images[key].url

export const selectServer: Select<
  TServerState,
  ServersWithImages
> = serverKey => state => state.server[serverKey]
