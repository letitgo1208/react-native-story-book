import {
  EmailVerificationScreen,
  ForgotPasswordScreen,
  ChangePasswordScreen,
  MyBuddiesTabScreen,
  ActivityTabScreen,
  UsersMarkersModal,
  HangoutTabScreen,
  DrawerMenuScreen,
  RegisterScreen,
  ProfileScreen,
  LaunchScreen,
  LoginScreen,
  FilterModal,
 } from 'app/Containers'
 import { Colors } from 'app/Themes'

const routeNames = {
  LaunchScreen: 'com.findyourbuddy.LaunchScreen',
  LoginScreen: 'com.findyourbuddy.LoginScreen',
  RegisterScreen: 'com.findyourbuddy.RegisterScreen',
  HangoutTabScreen: 'com.findyourbuddy.HangoutTabScreen',
  ActivityTabScreen: 'com.findyourbuddy.ActivityTabScreen',
  MyBuddiesTabScreen: 'com.findyourbuddy.MyBuddiesTabScreen',
  EmailVerificationScreen: 'com.findyourbuddy.EmailVerificationScreen',
  DrawerMenuScreen: 'com.findyourbuddy.DrawerMenuScreen',
  ForgotPasswordScreen: 'com.findyourbuddy.ForgotPasswordScreen',
  ChangePasswordScreen: 'com.findyourbuddy.ChangePasswordScreen',
  ProfileScreen: 'com.findyourbuddy.ProfileScreen',
  
  FilterModal: 'com.findyourbuddy.FilterModal',
  UsersMarkersModal: 'com.findyourbuddy.UsersMarkersModal',
}

const routeParams = {
  noNavbar: {
    navigatorStyle: {
      navBarHidden: true,
      screenBackgroundColor: Colors.background
    },
  },
  launchNavbar: {
    navigatorStyle: {
      navBarHidden: true,
      screenBackgroundColor: Colors.snow
    },
  },
  transparentNavbar: {
    navigatorStyle: {
      navBarNoBorder: true,
      navBarButtonColor: Colors.fontVioletDark,
      navBarBackgroundColor: Colors.background,
      topBarElevationShadowEnabled: false,
      screenBackgroundColor: Colors.background,
    },
  },
  tabParams: {
    navigatorStyle: {
      screenBackgroundColor: Colors.background,
      navBarButtonColor: Colors.fontGrayDark,
      navBarTransparent: true,
      navBarBackgroundColor: Colors.background,
      topBarElevationShadowEnabled: false,
      navBarTranslucent: true,
      drawUnderNavBar: true
    },
  },
  defaultNavbar: {
    navigatorStyle: {
      screenBackgroundColor: Colors.snow,
      navBarButtonColor: Colors.fontGrayDark,
      topBarElevationShadowEnabled: false,
      navBarTitleTextCentered: true,
    },
  },
  modal: {
    style: {
      tapBackgroundToDismiss: true
    }
  }
}

const routes = [
  { name: routeNames.LaunchScreen, component: () => LaunchScreen },
  { name: routeNames.LoginScreen, component: () => LoginScreen },
  { name: routeNames.HangoutTabScreen, component: () => HangoutTabScreen },
  { name: routeNames.ActivityTabScreen, component: () => ActivityTabScreen },
  { name: routeNames.MyBuddiesTabScreen, component: () => MyBuddiesTabScreen },
  { name: routeNames.RegisterScreen, component: () => RegisterScreen },
  { name: routeNames.EmailVerificationScreen, component: () => EmailVerificationScreen },
  { name: routeNames.DrawerMenuScreen, component: () => DrawerMenuScreen },
  { name: routeNames.ForgotPasswordScreen, component: () => ForgotPasswordScreen },
  { name: routeNames.ChangePasswordScreen, component: () => ChangePasswordScreen },
  { name: routeNames.ProfileScreen, component: () => ProfileScreen },
  { name: routeNames.FilterModal, component: () => FilterModal },
  { name: routeNames.UsersMarkersModal, component: () => UsersMarkersModal },
]

export {
  routeParams,
  routeNames,
  routes
}
