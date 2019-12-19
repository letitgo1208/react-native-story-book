import { StyleSheet } from 'react-native'
import { Metrics, Fonts, Colors } from '../../Themes'

export default StyleSheet.create({  
  mainContainer: {
    backgroundColor: Colors.snow,
    justifyContent: 'flex-start',
  },

  itemContainer: {
    alignSelf: 'stretch',
    paddingTop: Fonts.verticalScale(12),
    paddingHorizontal: Fonts.scale(18),
  },

  row: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'stretch',
  },

  birthItem: {
    flex: 1
  },

  margin: {
    height: Fonts.scale(10),
  },

  birthSpace: {
    width: Fonts.scale(9),
  },

  smallSpace: {
    marginBottom: Fonts.verticalScale(5),
  },

  bigSpace: {
    marginBottom: Fonts.verticalScale(12),
  },

  noPadding: {
    paddingTop: 10,
  },

  titleContainer: {
    width: '100%',
    marginTop: Fonts.verticalScale(10),
    paddingTop: Fonts.verticalScale(5),
    height: Fonts.verticalScale(32),
    paddingHorizontal: Fonts.scale(18),
    justifyContent: 'center',
    backgroundColor: Colors.background,
  },

  background: {
    backgroundColor: Colors.background,
  },

  aboutMeWrapper: {
    width: '100%',
    minHeight: Fonts.verticalScale(144),
  },

  buttonWrapper: {
    paddingTop: Fonts.verticalScale(21),
    height: Fonts.verticalScale(105),
    backgroundColor: Colors.background,
  },

  noMargin: {
    marginBottom: -4,
  },

  marginBottom: {
    marginBottom: 6,
  }
})
