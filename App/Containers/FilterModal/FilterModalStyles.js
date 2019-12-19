import { StyleSheet } from 'react-native'
import { Metrics, Fonts, Colors, ApplicationStyles } from '../../Themes/'

export const topMaskGradient = [Colors.snow, 'rgba(255, 255, 255, 0)']
export const bottomMaskGradient = ['rgba(255, 255, 255, 0)', Colors.snow]

export default StyleSheet.create({
  ...ApplicationStyles.screen,

  modalContainer: {
    marginHorizontal: Fonts.scale(Metrics.isAndroid ? 5 : 7),
    alignSelf: 'stretch',
    height: Fonts.verticalScale(420),
    backgroundColor: Colors.snow,
    borderRadius: Fonts.scale(22),

    shadowColor: "rgba(145, 145, 145, 0.23)",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 10,
    shadowOpacity: 1,
  },

  scrollView: {
    marginVertical: Fonts.verticalScale(25),
    paddingVertical: Fonts.verticalScale(5),
    width: Fonts.scale(304),
    height: Fonts.verticalScale(430),
  },

  label: {
    ...Fonts.style.small,
    color: Colors.fontGrayDark,
    alignSelf: 'flex-start',
    marginBottom: Fonts.verticalScale(15),
    marginTop: Fonts.verticalScale(7),
    marginLeft: Fonts.scale(9),
    opacity: 0.9,
  },

  noMargin: {
    marginBottom: 0,
  },

  topMask: {
    height: Fonts.verticalScale(20),
    position: 'absolute',
    top: 25,
    width: '100%',
  },

  bottomMask: {
    height: Fonts.verticalScale(20),
    position: 'absolute',
    bottom: 25,
    width: '100%',
  },

  space: {
    marginBottom: Fonts.verticalScale(15),
  },

  buttomMargin: {
    marginTop: Fonts.verticalScale(30),
    marginBottom: Fonts.verticalScale(20),
  }
})
