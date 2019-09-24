import { useASelector } from '@utils/recipes.util'
import { THEME } from '@utils/theme.util'

export const useTheme = () => {
  const selected = useASelector(state => state.theme.selected)
  return THEME[selected]
}
