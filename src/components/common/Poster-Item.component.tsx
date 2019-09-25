import { uriForImage } from '@utils/api.util'
import { FONT } from '@utils/constants.util'
import { SCREEN_WIDTH } from '@utils/dimensions.util'
import { BORDER_RADIUS, BOX_SHADOW } from '@utils/position.util'
import { extractProp, useASelector } from '@utils/recipes.util'
import {
  ServersWithImages,
  selectImage,
  selectServer
} from '@utils/selectors.util'
import { TGradient } from '@utils/types.util'
import { LinearGradient } from 'expo-linear-gradient'
import React, { useCallback, useContext, useRef } from 'react'
import { View } from 'react-native'
import FastImage from 'react-native-fast-image'
import styled from 'styled-components/native'

import { ExpansionContext } from '../../context/Expansion.context'

const WIDTH = SCREEN_WIDTH * 0.25

type Props = {
  gradient: TGradient
  gradientTextColor: string
  title: string
  id: number
  tdbid: number
  serverKey: ServersWithImages
  children: React.ReactNode
  flexDirection?: 'row' | 'column'
  justifyContent?: string
}
const PosterItem: React.FC<Props> = ({
  children,
  id,
  tdbid,
  serverKey,
  gradient,
  gradientTextColor,
  title,
  flexDirection = 'row',
  justifyContent = 'flex-end'
}) => {
  const { setDimensions } = useContext(ExpansionContext)
  const container = useRef<View>(null)
  const server = useASelector(selectServer(serverKey))
  const poster = useASelector(selectImage(serverKey, `${tdbid}-poster`))
  const fanart = useASelector(selectImage(serverKey, `${tdbid}-fanart`))
  const posterReq = uriForImage(server, poster)
  const fanartReq = uriForImage(server, fanart)
  /**
   * Open expansion card, whats withing withExpansion.hoc, in AppContainer
   */
  const _onPress = useCallback(() => {
    container.current!.measure((x, y, elmWidth, elmHeight, offsetX, offsetY) =>
      setDimensions({
        elmHeight,
        elmWidth,
        offsetX,
        offsetY,
        selected: true,
        id,
        tdbid,
        posterReq,
        fanartReq,
        serverKey
      })
    )
  }, [container])

  return (
    <Container ref={container}>
      <Touchable onPress={_onPress as any}>
        <PosterContainer>
          <Poster source={posterReq} />
        </PosterContainer>
        <ContentContainer>
          <Gradient {...gradient}>
            <GradientText gradientTextColor={gradientTextColor}>
              {title}
            </GradientText>
          </Gradient>
          <InfoView>
            <Fanart source={fanartReq} />
            <Padding
              flexDirection={flexDirection}
              justifyContent={justifyContent}
            >
              {children}
            </Padding>
          </InfoView>
        </ContentContainer>
      </Touchable>
    </Container>
  )
}

const Container = styled.View`
  height: ${WIDTH / 0.69};
  margin-bottom: 15;
  margin-left: 10;
  margin-right: 10;
`
const Touchable = styled.TouchableOpacity`
  flex-direction: row;
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
  font-family: ${FONT.bold};
  font-size: 14;
`
const PosterContainer = styled.View`
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
const Fanart = styled(FastImage)`
  position: absolute;
  border-radius: ${BORDER_RADIUS};
  opacity: 0.2;
  width: 100%;
  height: 100%;
`
const Poster = styled(FastImage)`
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

export default React.memo(PosterItem)
