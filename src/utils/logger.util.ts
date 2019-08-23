import Reactotron from 'reactotron-react-native'

export const logger = {
  log(...args: any[]) {
    Reactotron.log!(args)
  },
  info(...args: any[]) {
    Reactotron.logImportant!(args)
  },
  warn(...args: any[]) {
    Reactotron.warn!(args)
  },
  error(...args: any[]) {
    Reactotron.error!(args, '')
  }
}
