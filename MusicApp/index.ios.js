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

  handleTrackSelect(data) {
    this.props.mopidy.add(data.uri).then((resp) => {
      console.log('track playing', resp);
      this.props.mopidy.play({tlid: resp[0].tlid});
    });
  },

  handleAlbumSelect(data) {
    this.props.mopidy.getAlbum(data.uri).then((album) => {
      console.log(album)
      if (album && album.length) {
        this._pushRoute(
          album[0].tracks[0].album.name,
          {
            data: album[0].tracks,
            select: this.handleTrackSelect
          },
          SearchResults
        )
      }
    });
  },

  _pushRoute(title, props, component) {
    var titleConfig = {
      title: title,
    };
    var leftButtonConfig = {
      title: 'Back',
      handler: () => this.props.navigator.pop()
    };
    this.props.navigator.push({
      title: title,
      component: component,
      navigationBar: (
        <NavigationBar
          title={titleConfig}
          leftButton={leftButtonConfig}
        />
      ),
      props: {
        ...props
      }
    });
  },

  _search: function() {
    mopidy.searchArtist(this.state.text).then((results) => {
      if (results && results.length) {
        this._pushRoute(
          'Search Results',
          {
            data: results[0].albums,
            select: this.handleAlbumSelect
          },
          SearchResults
        );
      }
    });
  },

  _handleKeyPress: function(e) {
    console.log('key pressed!', e)
  },

  render: function() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.textbox.normal}
          onChangeText={(text) => this.setState({text})}
          onKeyPress={this._handleKeyPress}
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
