import styled from 'styled-components/native'
import { THEME } from '@utils/theme.util'
import { ThemeEnum } from '@utils/enums.util'

const ABackground = styled.View`
  flex: 1;
  background: ${THEME[ThemeEnum.MAIN].lighterDark};
`
export default ABackground
