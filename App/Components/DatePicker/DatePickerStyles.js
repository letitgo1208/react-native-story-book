import { StyleSheet } from 'react-native'
import { Fonts, Colors } from 'app/Themes'

export const pickerHeight = Fonts.verticalScale(180)

export default StyleSheet.create({
  error: {
    ...Fonts.style.error,
    alignSelf: 'center',
  },

  pickerWrapper: {
    width: '100%',
    borderTopWidth: 0.5,
    borderColor: Colors.fontGrayVeryLight,
    height: pickerHeight,
    backgroundColor: Colors.snow,
    position: 'absolute',
    bottom: 0,
  },

  pickerStyle: {
    backgroundColor: Colors.snow,
    marginTop: Fonts.verticalScale(15),
    height: Fonts.verticalScale(150),
  },
})
