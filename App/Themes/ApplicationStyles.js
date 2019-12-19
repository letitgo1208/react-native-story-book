import Fonts from './Fonts'
import Metrics from './Metrics'
import Colors from './Colors'

// This file is for a reusable grouping of Theme items.
// Similar to an XML fragment layout in Android

const ApplicationStyles = {
  screen: {
    mainContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: Colors.background,
      marginTop: Fonts.verticalScale(45),
      marginBottom: Fonts.verticalScale(28),
    },
    contentWrapper: {
      alignItems: 'center',
      justifyContent: 'flex-start',
      width: '100%',
    },
    titleText: {
      ...Fonts.style.title,
      alignSelf: 'center',
      color: Colors.fontVioletDark,
      marginVertical: Metrics.baseMargin,
      textAlign: 'center'
    },
    subtitleText: {
      ...Fonts.style.regular,
      alignSelf: 'center',
      color: Colors.fontVioletDark,
      marginVertical: Metrics.baseMargin,
      textAlign: 'center'
    },
    subtitle: {
      color: Colors.snow,
      padding: Metrics.smallMargin,
      marginBottom: Metrics.smallMargin,
      marginHorizontal: Metrics.smallMargin
    },
    leftMenuWrapper: {
      position: 'absolute',
      top: Fonts.verticalScale(27.5),
      left: Fonts.scale(13.5),
    },
    rightMenuWrapper: {
      position: 'absolute',
      top: Fonts.verticalScale(23),
      right: Fonts.scale(13.5),
    }
  }
}

export default ApplicationStyles
