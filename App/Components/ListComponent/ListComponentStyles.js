import { StyleSheet } from 'react-native'
import { Metrics, Fonts, Colors } from 'app/Themes'

export default StyleSheet.create({
  contentWrapper: {
    top: 0,
    right: 0,
    bottom: 0,
    position: 'absolute',
    width: Metrics.screenWidth,
    height: Metrics.screenHeight,
    backgroundColor: Colors.background,
  },

  listStyle: {
    flex: 1,
    marginHorizontal: Fonts.scale(8),
    paddingTop: Fonts.verticalScale(67),
  },

  itemWrapper: {
    alignSelf: 'stretch',
    height: Fonts.verticalScale(120),
    borderRadius: Fonts.scale(22),
    backgroundColor: Colors.snow,
    padding: Fonts.scale(15),
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowColor: Colors.shadow,
    shadowOffset: { height: 0, width: 0 },
    elevation: 2,
    marginTop: Fonts.verticalScale(3),
    flexDirection: 'row',
  },

  avatar: {
    backgroundColor: Colors.background,
    borderRadius: Fonts.scale(22),
    height: Fonts.verticalScale(90),
    width: Fonts.verticalScale(90),
    marginRight: Fonts.scale(17),
    resizeMode: 'cover',
  },

  infoWrapper: {
    alignSelf: 'stretch',
    marginTop: -3,
  },

  name: {
    fontSize: Fonts.size.regular,
    fontFamily: Fonts.type.medium,
    color: Colors.strongViolet
  },

  locationWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginLeft: -Fonts.scale(5),
  },

  description: {
    ...Fonts.style.regular,
    color: Colors.fontGrayDark,
    maxWidth: Fonts.scale(169),
    lineHeight: Fonts.scale(21),
    paddingTop: 2,
  },

  padding: {
    paddingTop: 2,
  },
})
