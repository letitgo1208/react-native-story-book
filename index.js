import App from './App/Containers/App'

import 'react-native'
import { Navigation, NativeEventsReceiver } from 'react-native-navigation'

App()

/*
Promise.resolve(Navigation.isAppLaunched())
.then((appLaunched) => {
  if (appLaunched) {
    App()
  }
  new NativeEventsReceiver().appLaunched(() => {
    App()
  });
});*/