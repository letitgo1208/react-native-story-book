import { StyleSheet } from 'react-native'
import { Metrics, Fonts, ApplicationStyles } from '../../Themes'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  margin: {
    marginBottom: Fonts.verticalScale(49),
  },

  marginSmall: {
    marginBottom: Fonts.verticalScale(20),
  },

  wrapper: {
    marginBottom: 0,
  },

  wrapperMargin: {
    marginBottom: Fonts.verticalScale(66),
  },

  labelMargin: {
    marginBottom: Fonts.verticalScale(21),
  },

  bottomMargin: {
    marginBottom: Fonts.verticalScale(81),
  }
})
