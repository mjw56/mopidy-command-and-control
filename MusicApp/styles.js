'use strict';

var React = require('react-native');
var {
  Image,
  PixelRatio,
  StyleSheet
} = React;


/* a bootstrap like style */

var LABEL_COLOR = '#000000';
var INPUT_COLOR = '#000000';
var ERROR_COLOR = '#a94442';
var HELP_COLOR = '#999999';
var BORDER_COLOR = '#cccccc';
var DISABLED_COLOR = '#777777';
var DISABLED_BACKGROUND_COLOR = '#eeeeee';
var FONT_SIZE = 17;
var FONT_WEIGHT = '500';

var stylesheet = Object.freeze({
  fieldset: {},
  // the style applied to the container of all inputs
  formGroup: {
    normal: {
      marginBottom: 10
    },
    error: {
      marginBottom: 10
    }
  },
  controlLabel: {
    normal: {
      color: LABEL_COLOR,
      fontSize: FONT_SIZE,
      marginBottom: 7,
      fontWeight: FONT_WEIGHT,
      backgroundColor: 'transparent'
    },
    // the style applied when a validation error occours
    error: {
      color: ERROR_COLOR,
      fontSize: FONT_SIZE,
      marginBottom: 7,
      fontWeight: FONT_WEIGHT
    }
  },
  helpBlock: {
    normal: {
      color: HELP_COLOR,
      fontSize: FONT_SIZE,
      marginBottom: 2
    },
    // the style applied when a validation error occours
    error: {
      color: HELP_COLOR,
      fontSize: FONT_SIZE,
      marginBottom: 2
    }
  },
  errorBlock: {
    fontSize: FONT_SIZE,
    marginBottom: 2,
    color: ERROR_COLOR
  },
  textbox: {
    normal: {
      color: INPUT_COLOR,
      fontSize: FONT_SIZE,
      height: 36,
      padding: 10,
      borderRadius: 4,
      borderColor: BORDER_COLOR,
      borderWidth: 1,
      marginBottom: 5,
    },
    // the style applied when a validation error occours
    error: {
      color: INPUT_COLOR,
      fontSize: FONT_SIZE,
      height: 36,
      padding: 10,
      borderRadius: 4,
      borderColor: ERROR_COLOR,
      borderWidth: 1,
      marginBottom: 5
    },
    // the style applied when the textbox is not editable
    notEditable: {
      fontSize: FONT_SIZE,
      height: 36,
      padding: 10,
      borderRadius: 4,
      borderColor: BORDER_COLOR,
      borderWidth: 1,
      marginBottom: 5,
      color: DISABLED_COLOR,
      backgroundColor: DISABLED_BACKGROUND_COLOR
    }
  },
  checkbox: {
    normal: {
      color: INPUT_COLOR,
      marginBottom: 4
    },
    // the style applied when a validation error occours
    error: {
      color: INPUT_COLOR,
      marginBottom: 4
    }
  },
  select: {
    normal: {
      marginBottom: 4
    },
    // the style applied when a validation error occours
    error: {
      marginBottom: 4
    }
  },
  datepicker: {
    normal: {
      marginBottom: 4
    },
    // the style applied when a validation error occours
    error: {
      marginBottom: 4
    }
  },
  navContainer: {
    flex: 1,
    height: 100,
    backgroundColor: '#FFFFFF',
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    marginTop: 20,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    height: 0,
  },
  container: {
    flex: 1,
    padding: 20,
    top: 40,
    alignItems: 'center'
  },
  centering: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3D3C3A',
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
  messageText: {
    fontSize: 17,
    fontWeight: '500',
    padding: 15,
    marginTop: 50,
    marginLeft: 15,
  },
  navBar: {
    backgroundColor: 'white',
  },
  navBarText: {
    fontSize: 16,
    marginVertical: 10,
  },
  navBarTitleText: {
    color: 'blue',
    fontWeight: '500',
    marginVertical: 9,
  },
  navBarLeftButton: {
    paddingLeft: 10,
  },
  navBarRightButton: {
    paddingRight: 10,
  },
  navBarButtonText: {
    color: 'blue'
  },
  scene: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#3D3C3A'
  },
  thumb: {
    width: 80,
    height: 80,
    marginRight: 10
  },
  textContainer: {
    flex: 1,
    flexDirection: 'row',
    height: 55,
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
  },
  separator: {
    height: 1,
    backgroundColor: '#02020d'
  },
  price: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#48BBEC'
  },
  title: {
    left: 20,
    fontSize: 15,
    color: '#02020d',
    justifyContent: 'space-around',
  },
  rowContainer: {
    flexDirection: 'row',
    padding: 10
  },
  loadingContainer: {
    marginTop: 250,
    marginLeft: 120
  },
  loadingText: {
    fontSize: 14,
    left: 155,
    top: 200
  },
  menu: {
    flex: 1,
    height: 400,
    backgroundColor: '#FFFFFF'
  },
  currentTrackContainer: {
    height: 100
  },
  showList: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  currentTrack: {
    flexDirection: 'row',
    height: 40,
    backgroundColor: '#3D3C3A',
    paddingTop: 7,
    paddingLeft: 4
  },
  currentTrackText: {
    top: 6,
    color: 'white',
    fontSize: '17'
  },
  lightbulb: {
    width: 70,
    height: 70,
    margin: 10
  },
  play: {
    width: 35,
    height: 35
  },
  pause: {
    width: 35,
    height: 35
  },
  backgroundImage: {
    flex: 1,
    top: -10,
    resizeMode: Image.resizeMode.contain, // or Image.resizeMode.stretch
  },
  webView: {
    height: 450,
  },
  trackImage: {
    height: 100,
    width: 100
  }

});

module.exports = stylesheet;
