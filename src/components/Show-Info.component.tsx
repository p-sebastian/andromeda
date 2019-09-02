import React from 'react'
import styled from 'styled-components/native'
import ABackground from '@common/Background.component'
import AText from '@common/Text.component'
import { ISeriesValue } from '@interfaces/common.interface'
import { logger } from '@utils/logger.util'

type Props = { seriesId: number; posterUri: string; fanartUri: string }
const ShowInfo: React.FC<Props> = () => {
  return (
    <ABackground>
      <Text>asdasda</Text>
    </ABackground>
  )
}

const Text = styled(AText)``

export default ShowInfo
