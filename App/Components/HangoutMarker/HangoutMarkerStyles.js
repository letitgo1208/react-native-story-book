import { StyleSheet } from 'react-native'
import { Fonts, Colors } from 'app/Themes'

const imgSize = Fonts.scale(55)
const badgeSize = Fonts.scale(20)

export default StyleSheet.create({
  avatar: {
    width: imgSize,
    height: imgSize,
    borderRadius: imgSize / 2,
    borderWidth: 2,
    borderColor: Colors.borderGrayLight,
  },

  badge: {
    top: 0,
    right: 0,
    width: badgeSize,
    height: badgeSize,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: badgeSize / 2,
    backgroundColor: Colors.error,
  },

  text: {
    ...Fonts.style.small,
    fontSize: Fonts.size.small_xs,
    color: Colors.snow,
  }
})
