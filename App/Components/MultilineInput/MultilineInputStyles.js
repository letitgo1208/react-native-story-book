import { StyleSheet } from 'react-native'
import { Metrics, Fonts, Colors } from 'app/Themes'

export default StyleSheet.create({
  inputWrapper: {
    borderWidth: 1,
    alignSelf: 'stretch',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    borderColor: Colors.lightGray,
    borderRadius: Fonts.verticalScale(6),
    marginBottom: Fonts.verticalScale(10),
    minHeight: Fonts.verticalScale(144),
    paddingVertical: Fonts.scale(6),
  },

  textInputStyle: {
    width: '100%',
    ...Fonts.style.small,
    color: Colors.fontGrayDark,
    textAlignVertical: 'top',
    paddingHorizontal: Fonts.scale(8),
    minHeight: Fonts.verticalScale(144),
  },

  error: {
    borderColor: Colors.error,
    borderWidth: 1,
  },

  counter: {
    bottom: 3,
    right: 3,
    ...Fonts.style.tiny,
    position: 'absolute',
    color: Colors.fontGrayLight,
  }
})
