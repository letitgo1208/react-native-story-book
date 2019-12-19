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

  margin: {
    marginBottom: Fonts.verticalScale(49),
  },

  fieldMargin: {
    marginBottom: Fonts.verticalScale(10),
  },

  bottomMargin: {
    marginBottom: Fonts.verticalScale(81),
  }
})
