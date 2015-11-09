/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  ListView,
  StyleSheet,
  Text,
  View,
} = React;
var styles = require('../styles');
var Mopidy = require('../Mopidy');

var SearchResults = React.createClass({

  getInitialState: function() {
      const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      return {
        dataSource: ds.cloneWithRows([]),
      }
  },

  componentDidMount: function() {
    console.log(this.props)
  },

  render: function() {
    return (
      <View style={styles.container}>
        <Text>Search Results</Text>
      </View>
    );
  }
});

module.exports = SearchResults;
