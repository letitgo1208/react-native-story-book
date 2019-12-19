import { StyleSheet } from 'react-native'
import { Fonts, Colors } from 'app/Themes'

export default StyleSheet.create({
  wrapper: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: '100%',
  },

  label: {
    alignSelf: 'center',
    color: Colors.fontGrayDark,
    textAlign: 'center',
    ...Fonts.style.medium,
    marginBottom: Fonts.verticalScale(3),
  },

  link: {
    ...Fonts.style.link,
    textDecorationLine: 'underline',
  },

  smallLabel: {
    ...Fonts.style.smallLabel,
    width: '100%',
    textAlign: 'center',
  },

  bigLink: {
    ...Fonts.style.bigLink,
    textDecorationLine: 'underline',
  },

  medium: {
    fontSize: Fonts.size.medium,
  },

  profileTitle: {
    ...Fonts.style.regular,
    alignSelf: 'flex-start',
  },

  profileSubitle: {
    ...Fonts.style.link,
    alignSelf: 'flex-start',
  }
})
