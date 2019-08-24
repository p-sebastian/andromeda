import { createContext } from 'react'
import { TError } from '@utils/validators.util'

export type TInputValue = { value: string; errors: TError[]; isValid: boolean }
export const FormContext = createContext({
  inputs: {},
  setValidity: (inputName: string, value: TInputValue) => {}
})
