/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} = React;
var Mopidy = require("mopidy");

console.log('mopidy', Mopidy);

var mopidy = new Mopidy({
  webSocketUrl: "ws://127.0.0.1:6680/mopidy/ws/"
});

mopidy.on(console.log.bind(console));

var trackDesc = function (track) {
    return track.name + " by " + track.artists[0].name +
        " from " + track.album.name;
};

var queueAndPlay = function (playlistNum, trackNum) {
    playlistNum = playlistNum || 0;
    trackNum = trackNum || 0;

    console.log(mopidy)

    mopidy.getUriSchemes().then(function(schemes) {
      console.log('schemes:', schemes);
    });

    mopidy.playlists.getPlaylists().then(function (playlists) {
        var playlist = playlists[2];
        console.log("Loading playlist:", playlists, playlist.name, playlist.tracks);
        return mopidy.tracklist.add(playlist.tracks).then(function (tlTracks) {
            return mopidy.playback.play(tlTracks[trackNum]).then(function () {
                return mopidy.playback.getCurrentTrack().then(function (track) {
                    console.log("Now playing:", trackDesc(track));
                });
            });
            console.log('hi!', tlTracks)
        });
    })
    .catch(console.error.bind(console)) // Handle errors here
    .done();                            // ...or they'll be thrown here
};


mopidy.on("state:online", queueAndPlay);

var MusicApp = React.createClass({
  render: function() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.ios.js
        </Text>
        <Text style={styles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+D or shake for dev menu
        </Text>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('MusicApp', () => MusicApp);
