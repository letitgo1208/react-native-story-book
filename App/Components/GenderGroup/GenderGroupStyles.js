import { StyleSheet } from 'react-native'
import { Metrics, Fonts, Colors } from 'app/Themes'



export default StyleSheet.create({
  switchWrapper: {
    height: Fonts.verticalScale(44) - 1,
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    alignItems: 'center',
    flexDirection: 'row',
    marginRight: Fonts.scale(60),
  },

  line: {
    width: '100%',
    height: 0.5,
    backgroundColor: Colors.borderGrayLight,
  },

  itemWrapper: {
    alignSelf: 'stretch',
    paddingLeft: Fonts.scale(18),
    height: Fonts.verticalScale(44)
  },

  containerStyleOff: {
    borderWidth: 1,
    borderColor: Colors.borderGrayLight
  },

  containerStyleOn: {
    borderWidth: 0,
  },
})
