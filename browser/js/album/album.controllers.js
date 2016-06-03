'use strict';

/* ALBUMS (SINGULAR) CONTROLLER */

juke.controller('AlbumCtrl', function ($scope, PlayerFactory, theAlbum) {
    $scope.album = theAlbum;
    $scope.playlist = theAlbum;
    $scope.sortableOptions = {
        cancel: "not(.active)"
    }
});

/* ALBUMS (PLURAL) CONTROLLER */

juke.controller('AlbumsCtrl', function ($scope, allAlbums) {

    $scope.albums = allAlbums;

});
