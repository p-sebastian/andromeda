import React from 'react'
import styled from 'styled-components/native'
import AText from '@common/Text.component'
import { CalendarValue } from '@interfaces/calendar.interface'
import { logger } from '@utils/logger.util'

type Props = { upcoming: CalendarValue }
const CalendarItem: React.FC<Props> = ({ upcoming }) => {
  logger.info(upcoming)

  return (
    <Container>
      <Text>aasda</Text>
    </Container>
  )
}

const Container = styled.View``
const Text = styled(AText)``

export default React.memo(CalendarItem)
