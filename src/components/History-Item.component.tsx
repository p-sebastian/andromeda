import React from 'react'
import styled from 'styled-components/native'
import { IHistory, HistoryEventTypeEnum } from '@interfaces/history.interface'
import AText from '@common/Text.component'
import { COLORS } from '@utils/constants.util'
import { ColorEnum } from '@utils/enums.util'
import { BORDER_RADIUS } from '@utils/position.util'
import { extractProp } from '@utils/recipes.util'
import moment from 'moment'

type Props = { history: IHistory }
const HistoryItem: React.FC<Props> = ({ history }) => {
  const {
    eventType,
    date,
    episode: { episodeNumber, seasonNumber },
    quality: { quality },
    series: { title },
    data
  } = history
  const { text, color } = bottomText(eventType)
  const client = data.downloadClient ? data.downloadClient : 'Unknown'

  return (
    <Padding>
      <Container>
        <Left>
          <Rotated color={color}>{text}</Rotated>
        </Left>
        <Center>
          <Title color="white" numberOfLines={1}>
            {title}
          </Title>
          <Bottom>
            <Empty />
            <Text color={clientColor(client)}>{client}</Text>
          </Bottom>
          <Bottom>
            <Text color="white">
              {seasonNumber}x{episodeNumber} - {quality.name}
            </Text>
            <Empty />
            <Text color="white">{moment(date).calendar()}</Text>
          </Bottom>
        </Center>
      </Container>
    </Padding>
  )
}

const clientColor = (client: string | undefined) => {
  if (!client) {
    return COLORS[ColorEnum.INFO]
  }
  switch (client.toLocaleLowerCase()) {
    case 'transmission':
      return COLORS[ColorEnum.DANGER]
    case 'sabnzbd':
      return COLORS[ColorEnum.SABNZBD]
    default:
      return COLORS[ColorEnum.INFO]
  }
}

const bottomText = (eventType: HistoryEventTypeEnum) => {
  switch (eventType) {
    case HistoryEventTypeEnum.Grabbed:
      return { color: COLORS[ColorEnum.SUCCESS], text: 'Grabbed' }
    case HistoryEventTypeEnum.DownloadFailed:
      return {
        color: COLORS[ColorEnum.RADARR],
        text: 'Failed'
      }
    case HistoryEventTypeEnum.EpisodeFileDeleted:
      return { color: COLORS[ColorEnum.DANGER], text: 'Deleted' }
    case HistoryEventTypeEnum.DownloadFolderImported:
      return { color: COLORS[ColorEnum.INFO], text: 'Imported' }
    default:
      return { color: COLORS[ColorEnum.GRAY], text: 'Misc' }
  }
}

const Container = styled.View`
  position: relative;
  flex: 1;
  flex-direction: row;
  background: ${COLORS[ColorEnum.GRAY]};
  border-radius: ${BORDER_RADIUS};
  padding: 5px;
`
const Padding = styled.View`
  padding-left: 10;
  padding-right: 10;
  padding-bottom: 10;
  min-height: 65;
  width: 100%;
`
const Left = styled.View`
  justify-content: center;
  align-items: center;
  width: 15%;
  margin-left: -5;
`
const Center = styled.View`
  flex: 1;
  justify-content: center;
`
const Text = styled(AText)`
  color: ${extractProp<{ color: string }>('color')};
  font-size: 10;
  font-family: roboto;
`
const Title = styled(Text)`
  font-size: 12;
`
const Bottom = styled.View`
  flex-direction: row;
`
const Empty = styled.View`
  flex: 1;
`
const Rotated = styled(Text)`
  font-family: oswald-semibold;
  font-size: 10;
  transform: rotate(-45deg);
`

export default React.memo(HistoryItem)
