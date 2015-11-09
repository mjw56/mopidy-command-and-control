'use strict';

var React = require('react-native');
var {
  AppRegistry,
  Navigator,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} = React;
var SearchResults = require('./components/SearchResults');
var styles = require('./styles');
var Mopidy = require('./Mopidy');
var NavigationBar = require('react-native-navbar');

const mopidy = new Mopidy();

var navigation = React.createClass ({

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

var MusicApp = React.createClass({

  getInitialState: function() {
      return {
        text: ''
      }
  },

  _search: function() {
    mopidy.searchArtist(this.state.text).then((results) => {
      if (results && results.length) {
        var titleConfig = {
          title: 'Search Results',
        };
        var leftButtonConfig = {
          title: 'Back',
          handler: () => this.props.navigator.pop()
        };
        this.props.navigator.push({
          title: 'Search Results',
          component: SearchResults,
          navigationBar:
            <NavigationBar
              title={titleConfig}
              leftButton={leftButtonConfig}
            />,
          props: {
            data: results[0]
          }
        });
        // mopidy.getAlbum(artist[0].albums[0].uri).then(function(album) {
        //   if (album && album.length) {
        //     console.log('yo', album)
        //     // mopidy.add({tracks:album[0].tracks}).then(function(id) {
        //     //   mopidy.play();
        //     // });
        //   }
        // });
      }
    });
    this.setState({
      text: ''
    });
  },

  render: function() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.textbox.normal}
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
        />
      <TouchableHighlight
        onPress={this._search}
        style={styles.button}
        underlayColor='#99d9f4'>
          <Text style={styles.buttonText}>Search</Text>
        </TouchableHighlight>
      </View>
    );
  }
});

AppRegistry.registerComponent('MusicApp', () => navigation);
