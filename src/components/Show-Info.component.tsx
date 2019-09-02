import React from 'react'
import styled from 'styled-components/native'
import ABackground from '@common/Background.component'
import AText from '@common/Text.component'
import { ISeriesValue } from '@interfaces/common.interface'
import { logger } from '@utils/logger.util'
import { SCREEN_HEIGHT } from '@utils/dimensions.util'
import { Image } from 'react-native-expo-image-cache'
import { COLORS } from '@utils/constants.util'
import { ColorEnum } from '@utils/enums.util'

type Props = { seriesId: number; posterUri: string; fanartUri: string }
const ShowInfo: React.FC<Props> = ({ seriesId, posterUri, fanartUri }) => {
  return (
    <ABackground>
      <FanartView>
        <Fanart uri={fanartUri} />
      </FanartView>
      <Bottom></Bottom>
    </ABackground>
  )
}

const FanartView = styled.View`
  height: ${SCREEN_HEIGHT / 2};
`
const Fanart = styled(Image)`
  flex: 1;
`
const Bottom = styled.View`
  flex: 1;

  /* margin-top: -25%; */
  border-top-right-radius: 50;
  border-top-left-radius: 50;
  background: ${COLORS[ColorEnum.GRAY]};
`

export default ShowInfo
