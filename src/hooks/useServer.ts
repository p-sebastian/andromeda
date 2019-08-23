import { useMemo } from 'react'
import { useShallowSelector } from '@utils/recipes.util'
import { ServerState } from '@reducers/index'
import { ThemeEnumKeys } from '@utils/types.util'

const separate = (servers: ServerState) => {
  type Res = typeof servers[0]
  const enabled: Res[] = []
  const disabled: Res[] = []
  Object.keys(servers).forEach(key => {
    const k = key as ThemeEnumKeys
    if (servers[k].enabled) {
      enabled.push(servers[k])
    } else {
      disabled.push(servers[k])
    }
  })
  return [enabled, disabled]
}
export const useServer = () => {
  const servers = useShallowSelector(state => state.server)
  return useMemo(() => separate(servers), [servers])
}
