import { useShallowSelector } from '@utils/recipes.util'
import { THEME } from '@utils/theme.util'
import { ScreenNames } from 'app.routes'
import { TTheme } from '@utils/types.util'

export const useTheme = () => {
  const { selected, title } = useShallowSelector(state => state.theme)
  return [THEME[selected], title] as [TTheme, ScreenNames]
}
