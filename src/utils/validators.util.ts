import _ from 'lodash'

type TError = {
  error: string
  type: string
}
const required = (value: string): TError | null => {
  if (_.isUndefined(value) || _.isNull(value) || value === '') {
    return { error: 'Field Required', type: 'required' }
  }
  return null
}

const length = (value: string, limiter: string): TError | null => {
  const remainder = Number(limiter) - value.length
  return remainder <= 0
    ? null
    : {
        error: `Must be ${limiter} char long. (${value.length}/${limiter})`,
        type: 'length'
      }
}

const VALIDATORS: { [key: string]: Function } = {
  required,
  length
}

/**
 * takes the string name of the validator to run on the value sent
 * like ['required']
 * if the validator requires extra params, the are sent separated by a :
 * like ['length:10']
 * @param value the input value
 * @param validators string array of the key/name of the validator
 */
export const validator = (
  value: string,
  validators: string[] = []
): TError[] => {
  const errors: TError[] = []

  validators.forEach(v => {
    const arg = v.split(':')
    const e = (<Function>VALIDATORS[<string>arg.shift()]).apply(null, [
      value,
      ...arg
    ])
    if (!_.isNull(e)) {
      errors.push(e)
    }
  })
  return errors
}
