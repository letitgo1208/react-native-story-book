import { StyleSheet } from 'react-native'
import { Metrics, Fonts, Colors, ApplicationStyles } from '../../Themes'

export const gradient = [Colors.gradientViolet, Colors.gradientAquamarine]

export default StyleSheet.create({
  ...ApplicationStyles.screen,

  position: {
    justifyContent: 'flex-start',
    marginTop: 0,
    marginBottom: 0,
  },

  margin: {
    marginBottom: Fonts.verticalScale(8),
  },

  infoContainer: {
    height: Fonts.verticalScale(160),
    backgroundColor: Colors.background,
    justifyContent: 'flex-start',
    alignSelf: 'stretch',
  },

  infoWrapper: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    marginTop: Fonts.verticalScale(30),
    marginHorizontal: Fonts.scale(16),
    alignItems: 'center',
  },

  avatarContainer: {
    marginRight: Fonts.scale(12),
    marginBottom: Fonts.scale(22),
  },

  username: {
    ...Fonts.style.regular,
    color: Colors.fontGrayDark,
  },

  linkContainer: {
    flex: 1,
    alignSelf: 'stretch',
    paddingTop: Fonts.verticalScale(8),
    justifyContent: 'space-between'
  },

  item: {
    ...Fonts.style.link,
    color: Colors.snow,
    paddingLeft: Fonts.scale(16),
    marginVertical: Fonts.verticalScale(15),
    alignSelf: 'stretch',
    alignItems: 'center',
    textAlign: 'left',
  },

  bottomItems: {
    marginBottom: Fonts.verticalScale(16),
  }
})
