function M() {
  this.online = false;
  this.mopidy = {};
}

M.prototype.init = function() {
  return new Promise((resolve, reject) => {
    var Mopidy = require("mopidy");

    this.mopidy = new Mopidy({
      webSocketUrl: "ws://localhost:6680/mopidy/ws/",
      callingConvention: "by-position-or-by-name"
    });

    this.mopidy.on(console.log.bind(console));

    this.mopidy.on("state:online", () => {
      this.online = true;
      resolve(this.online);
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
  return this.mopidy.tracklist.add({uri: add});
}

M.prototype.play = function(item) {
  return this.mopidy.playback.play({tlid: item.tlid});
}

M.prototype._search = function(query) {
  return this.mopidy.library.search({artist: [query], uris:['spotify:artist']});
};

module.exports = M;
