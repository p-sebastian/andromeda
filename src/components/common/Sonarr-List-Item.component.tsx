import React from 'react'
import styled from 'styled-components/native'
import { SCREEN_WIDTH } from '@utils/dimensions.util'
import { LinearGradient } from 'expo-linear-gradient'
import { BORDER_RADIUS, BOX_SHADOW } from '@utils/position.util'
import { extractProp, useASelector } from '@utils/recipes.util'
import { selectServer, selectImage } from '@utils/selectors.util'
import { ServerEnum } from '@utils/enums.util'
import { uriForImage } from '@utils/api.util'
import { TGradient } from '@utils/types.util'
const WIDTH = SCREEN_WIDTH * 0.25

type Props = {
  gradient: TGradient
  gradientTextColor: string
  title: string
  seriesId: number
  children: React.ReactNode
  flexDirection?: 'row' | 'column'
  justifyContent?: string
}
const SonarrListItem: React.FC<Props> = ({
  children,
  seriesId,
  gradient,
  gradientTextColor,
  title,
  flexDirection = 'row',
  justifyContent = 'flex-end'
}) => {
  const server = useASelector(selectServer(ServerEnum.SONARR))
  const poster = useASelector(selectImage(`${seriesId}-poster`))
  const fanart = useASelector(selectImage(`${seriesId}-fanart`))
  const uri = uriForImage(server, poster)
  const uriFanart = uriForImage(server, fanart)

  return (
    <Container>
      <Poster>
        <Image source={{ uri }} />
      </Poster>
      <ContentContainer>
        <Gradient {...gradient}>
          <GradientText gradientTextColor={gradientTextColor}>
            {title}
          </GradientText>
        </Gradient>
        <InfoView>
          <Fanart source={{ uri: uriFanart }} />
          <Padding
            flexDirection={flexDirection}
            justifyContent={justifyContent}
          >
            {children}
          </Padding>
        </InfoView>
      </ContentContainer>
    </Container>
  )
}

const Container = styled.TouchableOpacity`
  height: ${WIDTH / 0.69};
  margin-bottom: 15;
  flex-direction: row;
  margin-left: 10;
  margin-right: 10;
`
const Gradient = styled(LinearGradient)`
  border-radius: ${BORDER_RADIUS};
  margin-bottom: 5;
  width: 100%;
  min-height: 40;
  justify-content: center;
  align-items: center;
  box-shadow: none;
`
const GradientText = styled.Text`
  color: ${extractProp<{ gradientTextColor: string }>('gradientTextColor')};
  text-align: center;
  font-family: oswald-semibold;
  font-size: 14;
`
const Poster = styled.View`
  width: ${WIDTH};
  height: ${WIDTH / 0.69};
  box-shadow: ${BOX_SHADOW};
`
const ContentContainer = styled.View`
  flex: 1;
  position: relative;
  padding-left: 5;
  box-shadow: ${BOX_SHADOW};
`
const Fanart = styled.Image`
  position: absolute;
  border-radius: ${BORDER_RADIUS};
  opacity: 0.2;
  width: 100%;
  height: 100%;
`
const Image = styled.Image`
  border-radius: ${BORDER_RADIUS};
  flex: 1;
`
const InfoView = styled.View`
  flex: 1;
  position: relative;
  background: hsla(225, 4%, 20%, 1);
  border-radius: ${BORDER_RADIUS};
`
type Padding = { justifyContent: string; flexDirection: string }
const Padding = styled.View`
  flex-direction: ${extractProp<Padding>('flexDirection')};
  justify-content: ${extractProp<Padding>('justifyContent')};
  align-items: flex-end;
  padding: 5px;
  flex: 1;
  border-radius: ${BORDER_RADIUS};
`

export default React.memo(SonarrListItem)
