import { StyleSheet } from 'react-native'
import { Metrics, Fonts, Colors } from 'app/Themes'

export default StyleSheet.create({
  slideButtonWrapper: {
    position: 'absolute',
    top: Fonts.verticalScale(27),
    width: Fonts.scale(118),
    height: Fonts.verticalScale(21),
    borderRadius: Fonts.scale(22),
    borderWidth: 1,
    alignSelf: 'center',
    borderColor: Colors.fontGrayDark,
    flexDirection: 'row',
  },

  separator: {
    width: 1,
    height: Fonts.verticalScale(21),
    backgroundColor: Colors.fontGrayDark,
  },
  
  slideItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  
  slideText: {
    ...Fonts.style.smallXs,
  },

  bold: {
    fontWeight: 'bold',
  }
})
