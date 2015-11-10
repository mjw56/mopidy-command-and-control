'use strict';

var React = require('react-native');
var {
  ListView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
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

  componentWillMount: function(nextProps) {
    if (this.props.data) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(this.props.data)
      })
    }
  },

  renderRow: function(rowData, sectionID, rowID) {
    return (
      <TouchableHighlight onPress={() => this.props.select(rowData, rowID)}
          underlayColor='#dddddd'>
        <View>
          <View>
            <View style={styles.textContainer}>
              <Text style={styles.title}
                    numberOfLines={1}>
                {rowData.name} - {rowData.date}
              </Text>
            </View>
          </View>
          <View style={styles.separator}/>
        </View>
      </TouchableHighlight>
    );
  },

  render: function() {
    return (
      <ScrollView>
        <ListView
          initialListSize={25}
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
        />
      </ScrollView>
    );
  }
});

module.exports = SearchResults;
