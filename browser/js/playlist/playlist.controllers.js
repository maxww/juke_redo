'use strict';

// Create-playlist view

juke.controller('PlaylistFormCtrl', function ($scope, $state, PlaylistFactory) {

    $scope.createPlaylist = function () {
        $scope.hasSubmitted = true;
        PlaylistFactory
            .create($scope.newPlaylist)
            .then(function (playlist) {
                $state.go('playlist', {
                    playlistId: playlist.id
                });
            })
            .catch(function (err) {
                $scope.hasSubmitted = false;
                $scope.serverError = err.message || 'Something went wrong!';
            });
    };

});

// All-playlists sidebar

juke.controller('PlaylistsCtrl', function ($scope, PlaylistFactory) {

    PlaylistFactory.fetchAll()
        .then(function (playlists) {
            $scope.playlists = playlists;
        });

});

// Single-playlist view

juke.controller('PlaylistCtrl', function ($scope, thePlaylist, PlaylistFactory, PlayerFactory) {

    var tempList = []
    angular.copy(thePlaylist, tempList);
    var songs = tempList.songs;

    if (thePlaylist.songlist) {
        var newList = [];
        for (var i = 0; i < thePlaylist.songlist.length; i++) {
            for (var j = 0; j < songs.length; j++) {
                if (songs[j].id === thePlaylist.songlist[i]) {
                    newList.push(songs[j])
                }
            }
        }
        tempList.songs = newList;
    }

    $scope.playlist = tempList;
    var canUpdateSongList = $scope.playlist.songlist || [];

    var sortingLog = []

    $scope.canAdd = true;

    $scope.addSong = function (song) {

        if (canUpdateSongList.indexOf(song.id) > -1) {
            $scope.canAdd = false;
            return;
        } else {
            $scope.canAdd = true;
            canUpdateSongList.push(song.id);
            return PlaylistFactory.addSong($scope.playlist.id, song, canUpdateSongList)
                .then(function (addedSong) {
                    $scope.playlist.songs.push(addedSong);
                    return addedSong;
                });
        }

    };

    $scope.sortableOptions = {
        stop: function (e, ui) {
            var logEntry = $scope.playlist.songs.map(function (i) {
                return i.id;
            });
            sortingLog.push(logEntry);
            var lastEditedIndex = sortingLog.length - 1;
            PlaylistFactory.updateList($scope.playlist.id, sortingLog[lastEditedIndex]);
        }
    }
});
