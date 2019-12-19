import { StyleSheet, Platform } from 'react-native'
import { Fonts, Colors } from 'app/Themes'

export const gradient = [Colors.gradientViolet, Colors.gradientAquamarine]

const borderRadius = Fonts.scale(22)

export default StyleSheet.create({
  border: {
    position: 'absolute',
    alignSelf: 'center',
    top: 0,
  },

  img: {
    top: 2,
    position: 'absolute',
    alignSelf: 'center',
    borderRadius,
  },

  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 20,
  },

  corner: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius,
  },

  innerMask: {
    margin: 2,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius,
    backgroundColor: Colors.background,
  },

  img: {
    margin: 4,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    resizeMode: 'contain',
  },

  leftMask: {
    height: '58%',
    alignSelf: 'center',
    position: 'absolute',
    left: 0,
    width: 4,
  },

  rightMask: {
    height: '58%',
    alignSelf: 'center',
    position: 'absolute',
    right: -2,
    width: 6,
  },

  defaultImg: {
    opacity: 0.4,
  },

  fixCircleClipping: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    borderRadius,
    borderWidth: 3,
    borderColor: 'white'
  },
})
