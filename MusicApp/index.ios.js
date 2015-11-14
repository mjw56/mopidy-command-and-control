'use strict';

const React = require('react-native');
const {
  AppRegistry,
  Navigator,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} = React;
const MusicApp = require('./components/MusicApp');
const SearchResults = require('./components/SearchResults');
const styles = require('./styles');
const Mopidy = require('./Mopidy');
const NavigationBar = require('react-native-navbar');

const mopidy = new Mopidy();

const navigation = React.createClass ({

  renderScene(route, navigator) {
    var Component = route.component;
    var navBar = route.navigationBar;

    if (navBar) {
      navBar = Object.assign(navBar, {
        navigator: navigator,
        route: route
      });
    }

    return (
      <View style={styles.navContainer}>
        {navBar}
        <Component
          navigator={navigator}
          mopidy={mopidy}
          {...route.props} />
      </View>
    );
  },

  render: function() {
    var titleConfig = {
      title: 'Music App',
    };
    return (
      <Navigator
        ref={(navigator) => {
          this._navigator = navigator;
        }}
        renderScene={this.renderScene}
        configureScene={(route) => ({
          ...route.sceneConfig || Navigator.SceneConfigs.FloatFromRight
        })}
        style={styles.navContainer}
        initialRoute={
          {
            component: MusicApp,
            navigationBar: <NavigationBar title={titleConfig} />
          }
        }
      />
    );
  },
});

AppRegistry.registerComponent('MusicApp', () => navigation);
