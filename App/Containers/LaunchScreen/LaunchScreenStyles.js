import { StyleSheet } from 'react-native'
import { Metrics, Fonts, Colors, ApplicationStyles } from '../../Themes'

export default StyleSheet.create({
  ...ApplicationStyles.screen,

  topImage: {
    width: Fonts.scale(207),
    marginBottom: Fonts.verticalScale(10),
    height: Fonts.verticalScale(91),
    resizeMode: 'contain',
  },

  background: {
    justifyContent: 'center',
    marginTop: Fonts.verticalScale(21),
    backgroundColor: Colors.snow,
  },

  text: {
    ...Fonts.style.medium,
    textAlign: 'center',
    color: Colors.fontVioletDark,
  },

  buttonMargin: {
    marginBottom: Fonts.verticalScale(14),
  },

  centerImage: {
    width: Fonts.scale(272),
    height: Fonts.verticalScale(160),
    marginBottom: Fonts.verticalScale(30),
    marginTop: Fonts.verticalScale(10),
    resizeMode: 'contain',
  }
})
