import { StyleSheet, Platform } from 'react-native'
import { Metrics, Fonts, Colors } from 'app/Themes'

export const gradient = [Colors.gradientViolet, Colors.gradientAquamarine]

export default StyleSheet.create({
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginBottom: Fonts.verticalScale(10),
  },

  inputWrapper: {
    height: Fonts.verticalScale(49),
    width: Fonts.scale(237),
    alignSelf: 'center',
    alignItems: 'center',
  },

  maskWrapper: {
    height: Fonts.verticalScale(49),
    width: Fonts.scale(237),
    alignSelf: 'center',
    borderRadius: Fonts.verticalScale(6),
    position: 'absolute',
    opacity: 0.1,
    top: 0
  },

  textInputStyle: {
    height: Fonts.verticalScale(30),
    ...Fonts.style.small,
    color: Colors.fontGrayDark,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 0,
  },

  center: {
    textAlign: 'center',
    alignSelf: 'center',
  },

  icon: {
    position: 'absolute',
    right: 10,
  }
})
