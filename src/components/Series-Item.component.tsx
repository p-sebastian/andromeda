import React from 'react'
import styled from 'styled-components/native'
import AText from '@common/Text.component'
import { ISeriesValue } from '@interfaces/common.interface'
import { SCREEN_WIDTH } from '@utils/dimensions.util'
import { logger } from '@utils/logger.util'
import { useASelector } from '@utils/recipes.util'
import { ServerEnum } from '@utils/enums.util'
import { uriForImage } from '@utils/api.util'

const WIDTH = SCREEN_WIDTH * 0.25

type Props = { series: ISeriesValue }
const SeriesItem: React.FC<Props> = ({ series }) => {
  const { id, title } = series
  const server = useASelector(state => state.server[ServerEnum.SONARR])
  const poster = useASelector(
    state => state.sonarr.entities.images[`${id}-poster`].url
  )
  const uri = uriForImage(server, poster)
  logger.info(uri)
  return (
    <Container>
      <Poster>
        <Image source={{ uri }} />
      </Poster>
      <Text>{title}</Text>
    </Container>
  )
}

const Container = styled.View`
  height: 150;
`

const Text = styled(AText)`
  color: white;
`
const Poster = styled.View`
  /* background: red; */
  width: ${WIDTH};
  height: ${WIDTH / 0.69};
`
const Image = styled.Image`
  flex: 1;
`

export default React.memo(SeriesItem)
