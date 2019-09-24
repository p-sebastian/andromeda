import React from 'react'
import styled from 'styled-components/native'
import { IEpisode, IEpisodeFile } from '@interfaces/episode.interface'
import { MARGIN } from '@utils/position.util'
import { COLORS, FONT } from '@utils/constants.util'
import { ColorEnum } from '@utils/enums.util'
import { byteToGB } from '@utils/helpers.util'
import AText from '@common/Text.component'
import { Ionicons } from '@expo/vector-icons'
import { SwipeRow } from 'react-native-swipe-list-view'
import { extractCondition, extractProp } from '@utils/recipes.util'
import { MaterialIcons } from '@expo/vector-icons'
import moment from 'moment'

type Props = {
  episode: IEpisode
  toggle: (key: number) => void
  isSelected: boolean
}
const EpisodeItem: React.FC<Props> = ({ episode, toggle, isSelected }) => {
  const {
    title,
    episodeNumber,
    episodeFile,
    id,
    airDateUtc,
    monitored
  } = episode
  const bookmark = monitored ? 'bookmark' : 'bookmark-border'
  const dText = downloaded(airDateUtc, episodeFile)
  let dColor = '#00b0ff'
  if (dText === 'Missing') {
    dColor = COLORS[ColorEnum.DANGER]
  }
  if (dText === 'Unaired') {
    dColor = COLORS[ColorEnum.RADARR]
  }

  return (
    <ItemRow disableRightSwipe rightOpenValue={-100} stopRightSwipe={-125}>
      <ItemBack>
        <ItemButton isFirst>
          <Ionicons color="white" name="ios-person" size={28} />
        </ItemButton>
        <ItemButton>
          <MaterialIcons color="white" name={bookmark} size={28} />
        </ItemButton>
      </ItemBack>
      <Content>
        <Container onPress={() => toggle(id)}>
          <Centered>{episodeNumber}</Centered>
          <Center>
            <Text numberOfLines={2}>{title}</Text>
            <ColoredText color={dColor}>{dText}</ColoredText>
          </Center>
          <Ionicons
            name={isSelected ? 'ios-checkmark' : 'ios-arrow-back'}
            size={28}
          />
        </Container>
      </Content>
    </ItemRow>
  )
}

const downloaded = (airDateUtc: Date, file?: IEpisodeFile) => {
  const hasAired = moment().diff(airDateUtc) >= 0
  if (!hasAired) {
    return 'Unaired'
  }
  if (!file) {
    return 'Missing'
  }
  return `${file.quality.quality.name}-${byteToGB(file.size)}GB`
}

const Container = styled.TouchableOpacity`
  flex: 1;
  flex-direction: row;
  padding-left: ${MARGIN};
  padding-right: ${MARGIN};
  padding-top: 5;
  padding-bottom: 5;
  align-items: center;
  background: #eeeef8;
`
const Content = styled.View`
  min-height: 60;
  width: 100%;
  background: #eeeef8;
`
const Center = styled.View`
  flex: 1;
  padding-left: 10;
  padding-right: 10;
`
const Centered = styled(AText)`
  width: 10%;
  text-align: center;
  font-family: ${FONT.bold};
`
const Text = styled(AText)``
const ColoredText = styled(Text)`
  color: ${extractProp<{ color: string }>('color')};
`

const ItemRow = styled(SwipeRow)`
  border-bottom-width: 1px;
  border-bottom-color: ${COLORS[ColorEnum.GRAY]};
`
const ItemBack = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  margin-left: 20;
  background: ${COLORS[ColorEnum.GRAY]};
`
const ItemButton = styled.TouchableOpacity`
  position: absolute;
  justify-content: center;
  align-items: center;
  right: ${extractCondition<{ isFirst?: boolean }, any>('isFirst', 50, 0)};
  width: 50;
  bottom: 0;
  top: 0;
`
export default React.memo(
  EpisodeItem,
  (prev, next) => JSON.stringify(prev) === JSON.stringify(next)
)
