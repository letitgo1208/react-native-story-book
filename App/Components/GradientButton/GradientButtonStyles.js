import { StyleSheet } from 'react-native'
import { Metrics, Fonts, Colors } from 'app/Themes'

export const gradient = [Colors.gradientViolet, Colors.gradientAquamarine]

export default StyleSheet.create({
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    width: '100%',
  },

  buttonWrapper: {
    height: Fonts.verticalScale(50),
    width: Fonts.scale(268),
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: Fonts.verticalScale(50) / 2,
    borderBottomWidth: 0,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: Fonts.verticalScale(7) },
    shadowOpacity: 0.34,
    shadowRadius: 8,
    elevation: 1,
  },

  label: {
    ...Fonts.style.medium,
    color: Colors.snow,
  }
})
