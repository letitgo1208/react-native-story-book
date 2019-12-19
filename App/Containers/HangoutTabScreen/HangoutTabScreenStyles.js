import { StyleSheet } from 'react-native'
import { Metrics, Fonts, Colors, ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,

  container: {
    height: Metrics.screenHeight,
    width: 2 * Metrics.screenWidth,
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    flexDirection: 'row',
  },

  navContainer: {
    position: 'absolute',
    top: 0,
    width: '100%',
  },
})
