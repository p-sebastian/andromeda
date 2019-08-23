import Reactotron from 'reactotron-react-native'

export const logger = {
  log(msg: any) {
    Reactotron.log!(msg)
  },
  info(msg: any) {
    Reactotron.logImportant!(msg)
  },
  warn(msg: any) {
    Reactotron.warn!(msg)
  },
  error(msg: any) {
    Reactotron.error!(msg, '')
  }
}
