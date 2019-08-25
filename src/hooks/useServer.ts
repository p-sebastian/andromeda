import { useMemo } from 'react'
import { useShallowSelector } from '@utils/recipes.util'
import { ServerState } from '@reducers/index'
import { TServerState } from '@reducers/server.reducer'

const separate = (servers: ServerState) => {
  const enabled: TServerState[] = []
  const disabled: TServerState[] = []
  Object.values(servers).forEach(v =>
    v.enabled ? enabled.push(v) : disabled.push(v)
  )
  return [enabled, disabled]
}
export const useServer = () => {
  const servers = useShallowSelector(state => state.server)
  return useMemo(() => separate(servers), [servers])
}
