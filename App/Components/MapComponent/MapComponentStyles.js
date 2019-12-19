import { StyleSheet } from 'react-native'
import { Metrics, Fonts, Colors } from 'app/Themes'

export default StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
    height: Metrics.screenHeight,
    width: Metrics.screenWidth,
    flex: 1,
  },
})
