import React, { ComponentType, useState } from 'react'
import styled from 'styled-components/native'
import { ExpansionContext } from '../../context/Expansion.context'
import { Overwrite } from '@utils/types.util'
import CardExpansion from '@common/Card-Expansion.component'
import { ServerEnum } from '@src/utils/enums.util'

type Props = {}
export const withExpansion = <P extends {}>(Component: ComponentType<P>) => {
  const Temp: React.FC<Overwrite<P, Props>> = props => {
    const [dimensions, setDimensions] = useState({
      offsetX: 0,
      offsetY: 0,
      elmHeight: 0,
      elmWidth: 0,
      selected: false,
      id: 0,
      posterReq: { uri: '', headers: {} },
      fanartReq: { uri: '', headers: {} },
      serverKey: ServerEnum.SONARR
    })
    const { selected, ..._props } = dimensions
    return (
      <Container>
        <ExpansionContext.Provider value={{ dimensions, setDimensions }}>
          <Component {...props} />
          {selected ? <CardExpansion {..._props} /> : null}
        </ExpansionContext.Provider>
      </Container>
    )
  }

  Temp.displayName = `withSubmit(${Component.displayName})`
  return Temp as React.FC<Overwrite<P, Props>>
}

const Container = styled.View`
  flex: 1;
`
