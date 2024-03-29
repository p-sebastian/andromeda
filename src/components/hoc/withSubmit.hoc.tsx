import React, { useContext, ComponentType } from 'react'
import { FormContext } from '../../context/Form.context'
import { TInputs } from '@common/Form.component'
import { Overwrite } from '@utils/types.util'

type WithSubmitProps = {
  onPress: (inputs: TInputs) => void
}
export const withSubmit = <P extends {}>(Component: React.ComponentType<P>) => {
  const Temp: React.FC<Overwrite<P, WithSubmitProps>> = props => {
    const { inputs } = useContext(FormContext)
    const onPress = () => {
      props.onPress(inputs)
    }
    const _props = {
      ...props,
      onPress
    }
    return <Component {...(_props as any)} />
  }
  Temp.displayName = `withSubmit(${Component.displayName})`
  return Temp as React.FC<Overwrite<P, WithSubmitProps>>
}
