'use strict';

juke.controller('SongChooseCtrl', function ($scope, SongFactory) {

    $scope.songs = [];

    SongFactory.fetchAll()
        .then(function (songs) {
            $scope.songs = songs;
        });

    $scope.reset = function () {
        $scope.toAdd = null;
    };

    $scope.addIt = function () {
        $scope.addSong($scope.toAdd)
            .then(function (val) {
                if (val === undefined) console.log("already in the list")
                $scope.reset();
            })
    };

});
