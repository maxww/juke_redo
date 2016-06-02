juke.directive("songList", function(PlayerFactory) {
        return {
            restrict: "E",
            templateUrl: "/js/song/templates/song.html",
            scope: {
                songs: '='
            },
            link: function(s, e, a) {
                s.toggle = function(song) {
                    if (song !== PlayerFactory.getCurrentSong()) {
                        PlayerFactory.start(song, s.songs);
                    } else if (PlayerFactory.isPlaying()) {
                        PlayerFactory.pause();
                    } else {
                        PlayerFactory.resume();
                    }
                };
                s.getCurrentSong = function() {
                    return PlayerFactory.getCurrentSong();
                };

                s.isPlaying = function(song) {
                    return PlayerFactory.isPlaying() && PlayerFactory.getCurrentSong() === song;
                };
            }
        }
    })
    .directive("doubleClick", function() {
        return {
            restrict: "A",
            scope: {
                doubleClick: "&"
            },
            link: function(s, e, a) {
                e.on("dblclick", function() {
                    s.doubleClick();
                })
            }
        }
    })
