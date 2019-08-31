import { Selector } from '@utils/recipes.util'
import { RootState } from '@reducers/index'
import { TServerState } from '@reducers/server.reducer'
import { ServerEnum } from './enums.util'

type Select<TSelected, P> = (key: P) => Selector<TSelected, RootState>
export const selectImage: Select<string, string> = key => state =>
  state.sonarr.entities.images[key].url

export const selectServer: Select<
  TServerState,
  ServerEnum
> = serverKey => state => state.server[serverKey]
