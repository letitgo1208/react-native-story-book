import { StyleSheet } from 'react-native'
import { Metrics, Fonts, Colors } from 'app/Themes'

export const gradient = [Colors.gradientViolet, Colors.gradientAquamarine]

export default StyleSheet.create({
  textStyle: {
    ...Fonts.style.small,
    color: Colors.fontVioletDark,
    fontWeight: 'normal',
    borderColor: 'transparent',
    marginRight: 5,
  },

  containerStyle: {
    borderWidth: 0,
    justifyContent: 'flex-end',
    paddingRight: 0,
    marginRight: 0,
    marginLeft: 0,
  },

  wrapper: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  bold: {
    //fontWeight: 'bold',
    textDecorationLine: 'underline',
    paddingBottom: 1,
  }
})
