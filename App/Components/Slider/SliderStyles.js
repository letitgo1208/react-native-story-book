import { StyleSheet } from 'react-native'
import { Metrics, Fonts, Colors } from 'app/Themes'

export default StyleSheet.create({
  sliderWrapper: {
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'center',
    marginBottom: 20
  },

  image: {
    width: Fonts.scale(19),
    height: Fonts.scale(19),
    resizeMode: 'contain'
  },

  markerContainer: {
    marginBottom: Fonts.verticalScale(23),
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: Fonts.verticalScale(40),
  },

  label: {
    ...Fonts.style.small,
    color: Colors.fontGrayDark,
    opacity: 0.8,
  }
})
