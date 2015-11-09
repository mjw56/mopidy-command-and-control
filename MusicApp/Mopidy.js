function M() {
  this.online = false;
  this.mopidy = {};
}

M.prototype.init = function() {
  var _this = this;
  return new Promise(function(resolve, reject) {
    var Mopidy = require("mopidy");

    _this.mopidy = new Mopidy({
      webSocketUrl: "ws://localhost:6680/mopidy/ws/",
      callingConvention: "by-position-or-by-name"
    });

    _this.mopidy.on(console.log.bind(console));

    _this.mopidy.on("state:online", function() {
      _this.online = true;
      resolve(_this.online);
    });
  });
}

M.prototype.start = function() {
  this.mopidy.connect();
}

M.prototype.searchArtist = function(query) {
  if (!this.online) {
    return this.init().then(() => {
      return this._search(query);
    });
  } else {
    return this._search(query);
  }
}

M.prototype.getAlbum = function(uri) {
  return this.mopidy.library.findExact({uri: uri});
}

M.prototype.add = function(add) {
  return this.mopidy.tracklist.add(add);
}

M.prototype.play = function() {
  return this.mopidy.playback.play({});
}

M.prototype._search = function(query) {
  return this.mopidy.library.search({artist: [query], uris:['spotify:artist']});
};

module.exports = M;
