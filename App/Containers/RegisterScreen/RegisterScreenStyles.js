import { StyleSheet } from 'react-native'
import { Metrics, Fonts, Colors, ApplicationStyles } from '../../Themes'

export default StyleSheet.create({
  ...ApplicationStyles.screen,

  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.background,
    marginTop: Fonts.verticalScale(45),
  },

  fieldsWrapper: {
    alignItems: 'center',
    justifyContent: 'space-between',
    height: Fonts.verticalScale(183),
  },

  margin: {
    marginBottom: Fonts.verticalScale(49),
  },

  fieldMargin: {
    marginBottom: Fonts.verticalScale(47),
  },

  smallMargin: {
    marginBottom: Fonts.verticalScale(15),
  },

  bottomMargin: {
    marginBottom: Fonts.verticalScale(29),
  },

  termsWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Fonts.verticalScale(35),
    marginBottom: Fonts.verticalScale(28),
  },

  smallLabel: {
    ...Fonts.style.smallLabel,
    width: '100%',
    textAlign: 'center',
  },

  decorate: {
    textDecorationLine: 'underline',
    paddingTop: 3,
  }
})
