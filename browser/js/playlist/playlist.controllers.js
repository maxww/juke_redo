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
    $scope.playlist = tempList


    $scope.sortingLog = [];

    $scope.sortableOptions = {
        stop: function (e, ui) {
            // this callback has the changed model
            var logEntry = $scope.playlist.songs.map(function (i) {
                return i.id;
            });
            $scope.sortingLog.push(logEntry);
            var lastEditedIndex = $scope.sortingLog.length - 1;
            // console.log($scope.sortingLog[lastEditedIndex])
            PlaylistFactory.updateList($scope.playlist.id, $scope.sortingLog[lastEditedIndex]);
        }
    }

    $scope.addSong = function (song) {
        return PlaylistFactory.addSong($scope.playlist.id, song)
            .then(function (addedSong) {
                $scope.playlist.songs.push(addedSong);
                return addedSong;
            });
    };

});
