import { useMemo } from 'react'
import { useShallowSelector } from '@utils/recipes.util'
import { ServerState } from '@reducers/index'
import { TServerState } from '@reducers/server.reducer'
import { logger } from '@src/utils/logger.util'

const separate = (servers: ServerState) => {
  const enabled: TServerState[] = []
  const disabled: TServerState[] = []
  Object.values(servers).forEach(v =>
    v.enabled ? enabled.push(v) : disabled.push(v)
  )
  return [enabled, disabled]
}
export const useServer = () => {
  logger.info('called')
  const servers = useShallowSelector(state => state.server)
  return useMemo(() => separate(servers), [servers])
}
