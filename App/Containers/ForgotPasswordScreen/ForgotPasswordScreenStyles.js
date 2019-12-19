import { StyleSheet } from 'react-native'
import { Metrics, Fonts, Colors, ApplicationStyles } from '../../Themes'

export default StyleSheet.create({
  ...ApplicationStyles.screen,

  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.background,
    marginTop: Fonts.verticalScale(49),
  },

  margin: {
    marginBottom: Fonts.verticalScale(49),
  },

  marginSmall: {
    marginBottom: Fonts.verticalScale(10),
  },

  contentWrapper: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    marginBottom: Fonts.verticalScale(55),
  },

  bottomMargin: {
    marginBottom: Fonts.verticalScale(75),
  }
})
