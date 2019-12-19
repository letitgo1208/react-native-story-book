import { StyleSheet } from 'react-native'
import { Metrics, Fonts, Colors } from 'app/Themes'

export default StyleSheet.create({
  inputWrapper: {
    height: Fonts.verticalScale(49),
    justifyContent: 'center',
    alignSelf: 'stretch',
    alignItems: 'center',
    borderColor: Colors.lightGray,
    borderWidth: 1,
    borderRadius: Fonts.verticalScale(6),
    marginBottom: Fonts.verticalScale(10),
  },

  textInputStyle: {
    ...Fonts.style.small,
    color: Colors.fontGrayDark,
    paddingHorizontal: Fonts.scale(10),
    width: '100%',
  },

  center: {
    textAlign: 'center',
    alignSelf: 'center'
  },

  error: {
    borderColor: Colors.error,
    borderWidth: 1,
  },
})
