import { StyleSheet } from 'react-native'
import { Metrics, Fonts, Colors } from 'app/Themes'

export const gradient = [Colors.gradientViolet, Colors.gradientAquamarine]

const inputheight = Fonts.verticalScale(49)

export default StyleSheet.create({
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },

  inputWrapper: {
    height: inputheight,
    width: Fonts.scale(237),
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
  },

  maskWrapper: {
    height: inputheight,
    width: Fonts.scale(237),
    alignSelf: 'center',
    borderRadius: Fonts.scale(6),
    position: 'absolute',
    opacity: 0.1,
    top: 0
  },

  textInputStyle: {
    ...Fonts.style.small,
    height: inputheight,
    color: Colors.fontGrayDark,
    paddingHorizontal: Fonts.scale(10),
    marginTop: Metrics.isAndroid ? Fonts.verticalScale(1) : 0,
    width: '100%',
  },

  center: {
    textAlign: 'center',
    alignSelf: 'center'
  },

  error: {
    borderRadius: Fonts.verticalScale(6),
    borderColor: Colors.error,
    borderWidth: 1,
  },

  icon: {
    position: 'absolute',
    right: 0,
    height: inputheight,
    alignItems: 'center',
    justifyContent: 'center',
  },

  marginRight: {
    paddingRight: 10,
  }
})
