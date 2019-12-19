class NavigationActionsClass {

  setNavigator (navigator) {
    this.navigator = navigator
  }

  push = (screen, params) => () => this.navigator && this.navigator.push({ screen, ...params })
  pop = () => () => this.navigator && this.navigator.pop()
  resetTo = (screen, params) => () => this.navigator && this.navigator.resetTo({ screen, ...params })
  toggleDrawer = () => () => this.navigator && this.navigator.toggleDrawer({ side: 'left' })
  popToRoot = () => () => this.navigator && this.navigator.popToRoot()
  showLightBox = (screen, params, passProps) => () => this.navigator && this.navigator.showLightBox({ screen, ...params, passProps })
  dismissLightBox = () => () => this.navigator && this.navigator.dismissLightBox()
}

export default new NavigationActionsClass()
