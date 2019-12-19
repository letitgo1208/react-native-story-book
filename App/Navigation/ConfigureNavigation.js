import { Navigation } from 'react-native-navigation'
import { routes, routeNames, routeParams } from './RouteConst'
import { Colors, Fonts, Images } from 'app/Themes'

const leftTabButtons = [
  {
    id: 'menu',
    buttonColor: 'black',
    icon: require('../Images/menu.png'),
  }
]

export default (store, Provider) => {
  const registerScreen = ({ name, component }) =>

    Navigation.registerComponent(
      name,
      component,
      store,
      Provider
    )

  routes.forEach(props => registerScreen(props))
}

export const startApp = () =>
  Navigation.startSingleScreenApp({
    screen: {
      screen: routeNames.LaunchScreen,
      ...routeParams.launchNavbar,
    },
    animationType: 'fade',
    appStyle: {
      hideBackButtonTitle: true,
    },
  })

export const startMainView = () =>
  Navigation.startTabBasedApp({
    tabs: [
      {
        label: 'Hang out',
        screen: routeNames.HangoutTabScreen,
        icon: require('../Images/tab1.png'),
        ...routeParams.noNavbar,
        navigatorButtons: {
          leftButtons: leftTabButtons
        },
      },
      {
        label: 'Activity',
        screen: routeNames.ActivityTabScreen,
        title: 'Activity',
        icon: require('../Images/tab2.png'),
        ...routeParams.tabParams,
        navigatorButtons: {
          leftButtons: leftTabButtons
        }
      },
      {
        label: 'My buddies',
        screen: routeNames.MyBuddiesTabScreen,
        title: 'My buddies',
        icon: require('../Images/tab3.png'),
        ...routeParams.tabParams,
        navigatorButtons: {
          leftButtons: leftTabButtons
        }
      }
    ],
    tabsStyle: {
      tabBarButtonColor: Colors.fontGrayDark,
      tabBarSelectedButtonColor: Colors.fontVioletLight,
      tabBarBackgroundColor: Colors.snow,
      initialTabIndex: 0,
      tabBarTextFontSize: 13,
      tabBarTextFontWeight: 'bold',
    },
    appStyle: {
      orientation: 'portrait',
      navBarNoBorder: true,
      systemItem: 'sideMenu',
      tabBarTextFontSize: 13,
      tabBarTextFontWeight: 'bold',
      hideBackButtonTitle: true,
      
      tabBarButtonColor: Colors.fontGrayDark,
      tabBarSelectedButtonColor: Colors.fontVioletLight,
      tabBarBackgroundColor: Colors.snow,
      initialTabIndex: 0,
      tabBarTextFontSize: 13,
      tabBarTextFontWeight: 'bold',
    },    
    animationType: 'fade',
    drawer: {
      left: {
        screen: routeNames.DrawerMenuScreen,
        fixedWidth: Fonts.scale(650),
      },
      style: { 
        drawerShadow: false,
        ...routeParams.noNavbar,
        contentOverlayColor: 'rgba(0, 0, 0, 0.25)',
      },
      disableOpenGesture: true
    },
  })
